<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\InventoryTransaction;
use App\Models\Warehouse;
use Inertia\Inertia;

class WarehouseController extends Controller
{
    public function index()
    {
        $warehouses = Warehouse::query()
            ->withCount('inventories')
            ->orderBy('name')
            ->get()
            ->map(fn (Warehouse $warehouse) => [
                'id' => $warehouse->id,
                'name' => $warehouse->name,
                'code' => $warehouse->code,
                'city' => $warehouse->city,
                'country' => $warehouse->country,
                'inventory_count' => $warehouse->inventories_count,
            ]);

        $inventory = Inventory::query()
            ->with(['warehouse:id,name,code', 'part:id,name,sku,unit'])
            ->orderBy('warehouse_id')
            ->get()
            ->map(fn (Inventory $item) => [
                'id' => $item->id,
                'warehouse' => $item->warehouse->name,
                'part_name' => $item->part->name,
                'sku' => $item->part->sku,
                'unit' => $item->part->unit,
                'quantity' => (float) $item->quantity,
                'reserved_quantity' => (float) $item->reserved_quantity,
                'available_quantity' => $item->available_quantity,
                'minimum_quantity' => (float) $item->minimum_quantity,
                'is_low_stock' => $item->is_low_stock,
            ]);

        $recentTransactions = InventoryTransaction::query()
            ->with(['warehouse:id,name', 'part:id,name,sku'])
            ->latest()
            ->take(8)
            ->get()
            ->map(fn (InventoryTransaction $transaction) => [
                'id' => $transaction->id,
                'warehouse' => $transaction->warehouse->name,
                'part_name' => $transaction->part->name,
                'sku' => $transaction->part->sku,
                'type' => $transaction->type,
                'quantity' => (float) $transaction->quantity,
                'reference' => $transaction->reference,
                'created_at' => $transaction->created_at->format('d M Y, h:i A'),
            ]);

        return Inertia::render('public/warehouse', [
            'warehouses' => $warehouses,
            'inventory' => $inventory,
            'recentTransactions' => $recentTransactions,
        ]);
    }
}