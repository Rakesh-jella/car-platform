<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use App\Models\VehicleModel;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class VehicleDemoSeeder extends Seeder
{
    public function run(): void
    {
        $warehouse = Warehouse::where('code', 'MAIN-HYD')->firstOrFail();
        $suvA1 = VehicleModel::where('code', 'SUV-A1')->firstOrFail();

        Vehicle::updateOrCreate(
            ['reference' => 'VEH-000001'],
            [
                'vin' => 'JTEBR3FJ50K000001',
                'brand' => 'Toyota',
                'model' => 'Land Cruiser',
                'variant' => 'ZX',
                'year' => 2024,
                'source' => 'imported',
                'status' => 'ready_for_sale',
                'fuel_type' => 'Diesel',
                'transmission' => 'Automatic',
                'color' => 'Pearl White',
                'mileage' => 0,
                'warehouse_id' => $warehouse->id,
                'purchase_cost' => 65000,
                'import_cost' => 12000,
                'production_cost' => 0,
                'selling_price' => 92000,
                'purchased_at' => '2026-07-10',
                'arrived_at' => '2026-08-19',
                'ready_for_sale_at' => '2026-08-25',
                'notes' => 'Imported from Japan. Customs cleared and inspection passed.',
            ]
        );

        Vehicle::updateOrCreate(
            ['reference' => 'VEH-000002'],
            [
                'vin' => 'JTDBR32E720000002',
                'brand' => 'Toyota',
                'model' => 'Camry',
                'variant' => 'Hybrid',
                'year' => 2025,
                'source' => 'imported',
                'status' => 'customs_clearance',
                'fuel_type' => 'Hybrid',
                'transmission' => 'Automatic',
                'color' => 'Silver',
                'mileage' => 0,
                'purchase_cost' => 30000,
                'import_cost' => 7000,
                'production_cost' => 0,
                'selling_price' => 46000,
                'purchased_at' => '2026-09-01',
                'notes' => 'Vehicle is currently undergoing customs clearance.',
            ]
        );

        Vehicle::updateOrCreate(
            ['reference' => 'VEH-000003'],
            [
                'vin' => 'CARPLATFORMA1000003',
                'vehicle_model_id' => $suvA1->id,
                'brand' => 'Car Platform',
                'model' => 'SUV A1',
                'variant' => 'Premium',
                'year' => 2026,
                'source' => 'manufactured',
                'status' => 'ready_for_sale',
                'fuel_type' => 'Petrol',
                'transmission' => 'Automatic',
                'color' => 'Midnight Black',
                'mileage' => 0,
                'warehouse_id' => $warehouse->id,
                'purchase_cost' => 0,
                'import_cost' => 0,
                'production_cost' => 35000,
                'selling_price' => 52000,
                'arrived_at' => '2026-09-12',
                'ready_for_sale_at' => '2026-09-14',
                'notes' => 'Locally assembled. Quality inspection passed.',
            ]
        );
    }
}