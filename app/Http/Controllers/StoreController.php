<?php

namespace App\Http\Controllers;

use App\Models\InventoryAlert;
use App\Models\InventoryTransaction;
use App\Models\Part;
use App\Models\StoreOrder;
use App\Models\Vehicle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class StoreController extends Controller
{
    public function parts(): Response
    {
        return Inertia::render('public/parts', [
            'parts' => Part::query()
                ->where('stock_quantity', '>', 0)
                ->whereNotNull('selling_price')
                ->orderBy('category')
                ->orderBy('name')
                ->get(['id', 'name', 'sku', 'category', 'description', 'selling_price', 'image_url', 'stock_quantity'])
                ->map(fn (Part $part) => [
                    'id' => $part->id,
                    'name' => $part->name,
                    'sku' => $part->sku,
                    'category' => $part->category,
                    'description' => $part->description,
                    'selling_price' => (float) $part->selling_price,
                    'image_url' => $part->image_url,
                    'stock_quantity' => (float) $part->stock_quantity,
                ]),
        ]);
    }

    public function orders(Request $request): Response
    {
        return Inertia::render('public/orders', [
            'orders' => StoreOrder::query()
                ->where('user_id', $request->user()->id)
                ->latest()
                ->get(),
        ]);
    }

    public function storeOrder(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_type' => ['required', 'in:vehicle,part'],
            'product_id' => ['required', 'integer', 'min:1'],
            'order_type' => ['required', 'in:purchase,booking,rental_booking'],
            'quantity' => ['sometimes', 'integer', 'min:1', 'max:10'],
            'rental_days' => ['required_if:order_type,rental_booking', 'nullable', 'integer', 'min:1', 'max:30'],
        ]);

        $order = DB::transaction(function () use ($request, $validated) {
            $quantity = (int) ($validated['quantity'] ?? 1);
            $productType = $validated['product_type'];
            $orderType = $validated['order_type'];

            if ($productType === 'part') {
                if ($orderType !== 'purchase') {
                    throw ValidationException::withMessages([
                        'order_type' => 'Parts can only be purchased.',
                    ]);
                }

                $part = Part::query()->lockForUpdate()->findOrFail($validated['product_id']);
                if ($part->selling_price === null || $part->stock_quantity < $quantity) {
                    throw ValidationException::withMessages([
                        'product_id' => 'This item is no longer available in the requested quantity.',
                    ]);
                }

                $total = (float) $part->selling_price * $quantity;
                $part->decrement('stock_quantity', $quantity);

                foreach ($part->inventories()->orderBy('id')->lockForUpdate()->get() as $inventory) {
                    $deduction = min((float) $inventory->quantity, $quantity);
                    if ($deduction <= 0) {
                        continue;
                    }
                    $inventory->decrement('quantity', $deduction);
                    InventoryTransaction::create([
                        'warehouse_id' => $inventory->warehouse_id,
                        'part_id' => $part->id,
                        'type' => 'sale',
                        'quantity' => $deduction,
                        'reference' => 'STORE-' . Str::upper(Str::random(8)),
                        'notes' => 'Customer storefront order',
                    ]);
                    $quantity -= (int) $deduction;
                    if ($quantity === 0) {
                        break;
                    }
                }

                if ((float) $part->fresh()->stock_quantity <= 0) {
                    InventoryAlert::create([
                        'part_id' => $part->id,
                        'category' => $part->category,
                        'message' => $part->name . ' sold out in ' . str_replace('_', ' ', $part->category) . '.',
                    ]);
                }

                return StoreOrder::create([
                    'user_id' => $request->user()->id,
                    'reference' => 'ORD-' . Str::upper(Str::random(10)),
                    'product_type' => 'part',
                    'product_id' => $part->id,
                    'product_name' => $part->name,
                    'category' => $part->category,
                    'order_type' => 'purchase',
                    'quantity' => (int) ($validated['quantity'] ?? 1),
                    'unit_price' => $part->selling_price,
                    'total_amount' => $total,
                    'advance_amount' => 0,
                    'status' => 'payment_pending',
                ]);
            }

            $vehicle = Vehicle::query()->lockForUpdate()->findOrFail($validated['product_id']);
            $isRental = $orderType === 'rental_booking';
            $isBooking = $orderType === 'booking' || $isRental;
            $expectedListingType = $isRental ? 'rental' : 'sale';

            if ($vehicle->status !== 'ready_for_sale' || $vehicle->listing_type !== $expectedListingType) {
                throw ValidationException::withMessages([
                    'product_id' => 'This vehicle is no longer available.',
                ]);
            }

            $days = $isRental ? (int) $validated['rental_days'] : null;
            $unitPrice = $isRental ? (float) $vehicle->rental_price_per_day : (float) $vehicle->selling_price;
            if ($unitPrice <= 0) {
                throw ValidationException::withMessages([
                    'product_id' => 'This vehicle is not currently available for this order type.',
                ]);
            }

            $total = $unitPrice * ($days ?? 1);
            $advance = $isBooking ? min(50000, $total) : 0;

            if (! $isRental) {
                $vehicle->update(['status' => 'reserved']);
                if (! Vehicle::query()
                    ->where('status', 'ready_for_sale')
                    ->where('listing_type', 'sale')
                    ->whereNotNull('selling_price')
                    ->exists()) {
                    InventoryAlert::create([
                        'category' => 'cars',
                        'message' => 'All cars for sale have been reserved or sold.',
                    ]);
                }
            }

            return StoreOrder::create([
                'user_id' => $request->user()->id,
                'reference' => 'ORD-' . Str::upper(Str::random(10)),
                'product_type' => 'vehicle',
                'product_id' => $vehicle->id,
                'product_name' => trim($vehicle->brand . ' ' . $vehicle->model . ' ' . ($vehicle->variant ?? '')),
                'category' => 'cars',
                'order_type' => $isRental ? 'rental_booking' : ($isBooking ? 'booking' : 'purchase'),
                'quantity' => 1,
                'rental_days' => $days,
                'unit_price' => $unitPrice,
                'total_amount' => $total,
                'advance_amount' => $advance,
                'status' => $isBooking ? 'advance_pending' : 'payment_pending',
            ]);
        });

        return to_route('store.orders')->with(
            'success',
            'Order ' . $order->reference . ' is placed. ' .
                ($order->advance_amount > 0
                    ? 'Advance due: ₹' . number_format((float) $order->advance_amount, 0) . '.'
                    : 'Payment is pending confirmation.')
        );
    }
}
