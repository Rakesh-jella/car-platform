<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\InventoryAlert;
use App\Models\InventoryTransaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InventoryController extends Controller
{
    public function receive(Request $request, Inventory $inventory): RedirectResponse
    {
        $validated = $request->validate([
            'quantity' => ['required', 'numeric', 'gt:0', 'max:1000000'],
            'reference' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        DB::transaction(function () use ($inventory, $validated): void {
            $lockedInventory = Inventory::query()->lockForUpdate()->findOrFail($inventory->id);
            $lockedInventory->increment('quantity', $validated['quantity']);
            $lockedInventory->part()->increment('stock_quantity', $validated['quantity']);

            InventoryTransaction::create([
                'warehouse_id' => $lockedInventory->warehouse_id,
                'part_id' => $lockedInventory->part_id,
                'type' => 'purchase',
                'quantity' => $validated['quantity'],
                'reference' => $validated['reference'] ?? null,
                'notes' => $validated['notes'] ?? 'Warehouse stock received',
            ]);

            InventoryAlert::query()
                ->where('part_id', $lockedInventory->part_id)
                ->whereNull('acknowledged_at')
                ->update(['acknowledged_at' => now()]);
        });

        return back()->with('success', 'Warehouse stock receipt recorded.');
    }

    public function acknowledge(InventoryAlert $alert): RedirectResponse
    {
        $alert->update(['acknowledged_at' => now()]);

        return back()->with('success', 'Inventory alert marked as reviewed.');
    }
}
