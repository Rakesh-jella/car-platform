<?php

namespace Database\Seeders;

use App\Models\Inventory;
use App\Models\InventoryTransaction;
use App\Models\Part;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class WarehouseDemoSeeder extends Seeder
{
    public function run(): void
    {
        $warehouse = Warehouse::updateOrCreate(
            ['code' => 'MAIN-HYD'],
            [
                'name' => 'Main Warehouse',
                'city' => 'Hyderabad',
                'country' => 'India',
                'address' => 'Industrial Area, Hyderabad',
            ]
        );

        $inventoryData = [
            ['sku' => 'ENG-001', 'quantity' => 10, 'reserved' => 1, 'minimum' => 3],
            ['sku' => 'TRN-001', 'quantity' => 8, 'reserved' => 0, 'minimum' => 3],
            ['sku' => 'WHL-001', 'quantity' => 40, 'reserved' => 8, 'minimum' => 12],
            ['sku' => 'SET-001', 'quantity' => 35, 'reserved' => 5, 'minimum' => 10],
            ['sku' => 'BAT-001', 'quantity' => 5, 'reserved' => 1, 'minimum' => 5],
        ];

        foreach ($inventoryData as $item) {
            $part = Part::where('sku', $item['sku'])->firstOrFail();

            $inventory = Inventory::updateOrCreate(
                [
                    'warehouse_id' => $warehouse->id,
                    'part_id' => $part->id,
                ],
                [
                    'quantity' => $item['quantity'],
                    'reserved_quantity' => $item['reserved'],
                    'minimum_quantity' => $item['minimum'],
                ]
            );

            InventoryTransaction::updateOrCreate(
                [
                    'warehouse_id' => $warehouse->id,
                    'part_id' => $part->id,
                    'reference' => 'OPENING-' . $part->sku,
                ],
                [
                    'type' => 'stock_in',
                    'quantity' => $inventory->quantity,
                    'notes' => 'Opening stock for warehouse setup.',
                ]
            );
        }
    }
}