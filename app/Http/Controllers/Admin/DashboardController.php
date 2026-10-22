<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ImportRequest;
use App\Models\InventoryAlert;
use App\Models\Inventory;
use App\Models\ManufacturingOrder;
use App\Models\StoreOrder;
use App\Models\Vehicle;
use App\Models\Warehouse;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $lowStockItems = Inventory::query()
            ->with('part:id,name,sku')
            ->get()
            ->filter(fn (Inventory $inventory) => $inventory->is_low_stock)
            ->values()
            ->map(fn (Inventory $inventory) => [
                'part_name' => $inventory->part->name,
                'sku' => $inventory->part->sku,
                'available' => $inventory->available_quantity,
                'minimum' => (float) $inventory->minimum_quantity,
            ]);

        return Inertia::render('admin/dashboard', [
            'statistics' => [
                'vehicles' => Vehicle::count(),
                'ready_for_sale' => Vehicle::where('status', 'ready_for_sale')->count(),
                'rental_vehicles' => Vehicle::where('listing_type', 'rental')->where('status', 'ready_for_sale')->count(),
                'in_transit' => Vehicle::whereIn('status', [
                    'shipped',
                    'arrived_at_port',
                    'customs_clearance',
                ])->count(),
                'imported_vehicles' => Vehicle::where('source', 'imported')->count(),
                'manufactured_vehicles' => Vehicle::where('source', 'manufactured')->count(),

                'import_requests' => ImportRequest::count(),
                'pending_import_requests' => ImportRequest::where('status', 'requested')->count(),

                'warehouses' => Warehouse::count(),
                'inventory_items' => Inventory::count(),
                'low_stock_items' => $lowStockItems->count(),

                'manufacturing_orders' => ManufacturingOrder::count(),
                'vehicle_sales_value' => (float) Vehicle::sum('selling_price'),

                'parts_count' => \App\Models\Part::where('category', 'parts')->count(),
                'styling_count' => \App\Models\Part::where('category', 'styling')->count(),
                'sports_racing_count' => \App\Models\Part::where('category', 'sports_racing')->count(),
                'store_orders_count' => StoreOrder::count(),
                'store_orders_total_value' => (float) StoreOrder::sum('total_amount'),
                'store_orders_advance_value' => (float) StoreOrder::sum('advance_amount'),
            ],

            'lowStockItems' => $lowStockItems,

            'recentImportRequests' => ImportRequest::query()
                ->latest()
                ->take(5)
                ->get()
                ->map(fn (ImportRequest $request) => [
                    'reference' => $request->reference,
                    'customer' => $request->full_name,
                    'vehicle' => $request->vehicle_brand . ' ' . $request->vehicle_model,
                    'country' => $request->country,
                    'status' => $request->status,
                    'created_at' => $request->created_at->format('d M Y, h:i A'),
                ]),

            'recentVehicles' => Vehicle::query()
                ->latest()
                ->take(5)
                ->get()
                ->map(fn (Vehicle $vehicle) => [
                    'reference' => $vehicle->reference,
                    'name' => $vehicle->brand . ' ' . $vehicle->model,
                    'source' => $vehicle->source,
                    'status' => $vehicle->status,
                    'price' => (float) $vehicle->selling_price,
                ]),

            'inventoryAlerts' => InventoryAlert::query()
                ->whereNull('acknowledged_at')
                ->with('part:id,name,sku')
                ->latest()
                ->take(10)
                ->get()
                ->map(fn (InventoryAlert $alert) => [
                    'id' => $alert->id,
                    'message' => $alert->message,
                    'category' => $alert->category,
                    'part_name' => $alert->part?->name ?? 'Removed item',
                    'created_at' => $alert->created_at->format('d M Y, h:i A'),
                ]),

            'recentStoreOrders' => StoreOrder::query()
                ->with('user:id,name,email')
                ->latest()
                ->take(8)
                ->get()
                ->map(fn (StoreOrder $order) => [
                    'reference' => $order->reference,
                    'customer' => $order->user->name,
                    'product' => $order->product_name,
                    'category' => $order->category,
                    'order_type' => $order->order_type,
                    'status' => $order->status,
                    'total' => (float) $order->total_amount,
                    'advance' => (float) $order->advance_amount,
                    'created_at' => $order->created_at->format('d M Y, h:i A'),
                ]),
        ]);
    }
}