<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ImportRequest;
use App\Models\Inventory;
use App\Models\ManufacturingOrder;
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
        ]);
    }
}