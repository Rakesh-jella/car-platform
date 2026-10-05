<?php

namespace Database\Seeders;

use App\Models\BillOfMaterial;
use App\Models\Part;
use App\Models\VehicleModel;
use Illuminate\Database\Seeder;

class ManufacturingDemoSeeder extends Seeder
{
    public function run(): void
    {
        $engine = Part::updateOrCreate(
            ['sku' => 'ENG-001'],
            ['name' => 'Engine', 'stock_quantity' => 10, 'unit' => 'piece']
        );

        $transmission = Part::updateOrCreate(
            ['sku' => 'TRN-001'],
            ['name' => 'Transmission', 'stock_quantity' => 8, 'unit' => 'piece']
        );

        $wheel = Part::updateOrCreate(
            ['sku' => 'WHL-001'],
            ['name' => 'Wheel', 'stock_quantity' => 40, 'unit' => 'piece']
        );

        $seat = Part::updateOrCreate(
            ['sku' => 'SET-001'],
            ['name' => 'Seat', 'stock_quantity' => 35, 'unit' => 'piece']
        );

        $battery = Part::updateOrCreate(
            ['sku' => 'BAT-001'],
            ['name' => 'Battery', 'stock_quantity' => 5, 'unit' => 'piece']
        );

        $vehicleModel = VehicleModel::updateOrCreate(
            ['code' => 'SUV-A1'],
            [
                'name' => 'SUV A1',
                'description' => 'A locally assembled premium SUV.',
            ]
        );

        $bom = BillOfMaterial::updateOrCreate(
            ['vehicle_model_id' => $vehicleModel->id],
            ['name' => 'SUV A1 Standard BOM']
        );

        $bom->items()->updateOrCreate(
            ['part_id' => $engine->id],
            ['quantity' => 1]
        );

        $bom->items()->updateOrCreate(
            ['part_id' => $transmission->id],
            ['quantity' => 1]
        );

        $bom->items()->updateOrCreate(
            ['part_id' => $wheel->id],
            ['quantity' => 4]
        );

        $bom->items()->updateOrCreate(
            ['part_id' => $seat->id],
            ['quantity' => 5]
        );

        $bom->items()->updateOrCreate(
            ['part_id' => $battery->id],
            ['quantity' => 1]
        );
    }
}