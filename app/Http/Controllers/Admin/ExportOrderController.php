<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\ExportOrder;
use App\Models\Vehicle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ExportOrderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/export-orders', [
            'orders' => ExportOrder::with(['customer', 'vehicle', 'shipment'])
                ->latest()
                ->get(),

            'customers' => Customer::query()
                ->orderBy('name')
                ->get(['id', 'name', 'email', 'country']),

            'availableVehicles' => Vehicle::query()
                ->where('status', 'ready_for_sale')
                ->orderBy('brand')
                ->orderBy('model')
                ->get(['id', 'reference', 'brand', 'model', 'year', 'selling_price']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'customer_id' => ['required', 'exists:customers,id'],
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'reference' => ['required', 'string', 'max:255', 'unique:export_orders,reference'],
            'agreed_price' => ['required', 'numeric', 'min:0'],
            'currency' => ['required', 'string', 'size:3'],
            'order_date' => ['required', 'date'],
        ]);

        $vehicle = Vehicle::whereKey($validated['vehicle_id'])
            ->where('status', 'ready_for_sale')
            ->firstOrFail();

        DB::transaction(function () use ($validated, $vehicle) {
            ExportOrder::create([
                ...$validated,
                'currency' => strtoupper($validated['currency']),
                'status' => 'order_created',
            ]);

            $vehicle->update(['status' => 'reserved']);
        });

        return to_route('admin.export-orders.index')
            ->with('success', 'Export order created and vehicle reserved.');
    }
}