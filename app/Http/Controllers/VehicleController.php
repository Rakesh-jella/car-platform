<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index()
    {
        $vehicles = Vehicle::query()
            ->with('warehouse:id,name')
            ->latest()
            ->get()
            ->map(fn (Vehicle $vehicle) => [
                'reference' => $vehicle->reference,
                'brand' => $vehicle->brand,
                'model' => $vehicle->model,
                'variant' => $vehicle->variant,
                'year' => $vehicle->year,
                'source' => $vehicle->source,
                'status' => $vehicle->status,
                'fuel_type' => $vehicle->fuel_type,
                'transmission' => $vehicle->transmission,
                'color' => $vehicle->color,
                'selling_price' => (float) $vehicle->selling_price,
                'warehouse' => $vehicle->warehouse?->name,
            ]);

        return Inertia::render('public/cars', [
            'vehicles' => $vehicles,
        ]);
    }

    public function show(Vehicle $vehicle)
    {
        $vehicle->load([
            'warehouse:id,name,code,city,country',
            'vehicleModel:id,name,code',
        ]);

        return Inertia::render('public/vehicle-details', [
            'vehicle' => [
                'reference' => $vehicle->reference,
                'vin' => $vehicle->vin,
                'brand' => $vehicle->brand,
                'model' => $vehicle->model,
                'variant' => $vehicle->variant,
                'year' => $vehicle->year,
                'source' => $vehicle->source,
                'status' => $vehicle->status,
                'fuel_type' => $vehicle->fuel_type,
                'transmission' => $vehicle->transmission,
                'color' => $vehicle->color,
                'mileage' => $vehicle->mileage,
                'purchase_cost' => (float) $vehicle->purchase_cost,
                'import_cost' => (float) $vehicle->import_cost,
                'production_cost' => (float) $vehicle->production_cost,
                'total_cost' => $vehicle->total_cost,
                'selling_price' => (float) $vehicle->selling_price,
                'purchased_at' => $vehicle->purchased_at?->format('d M Y'),
                'arrived_at' => $vehicle->arrived_at?->format('d M Y'),
                'ready_for_sale_at' => $vehicle->ready_for_sale_at?->format('d M Y'),
                'notes' => $vehicle->notes,
                'warehouse' => $vehicle->warehouse ? [
                    'name' => $vehicle->warehouse->name,
                    'code' => $vehicle->warehouse->code,
                    'city' => $vehicle->warehouse->city,
                    'country' => $vehicle->warehouse->country,
                ] : null,
                'vehicle_model' => $vehicle->vehicleModel ? [
                    'name' => $vehicle->vehicleModel->name,
                    'code' => $vehicle->vehicleModel->code,
                ] : null,
            ],
        ]);
    }
}