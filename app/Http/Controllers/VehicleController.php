<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        $listingType = $request->query('type', 'sale');
        if (! in_array($listingType, ['sale', 'rental'], true)) {
            $listingType = 'sale';
        }

        $vehicles = Vehicle::query()
            ->where('status', 'ready_for_sale')
            ->where('listing_type', $listingType)
            ->whereNotNull($listingType === 'rental' ? 'rental_price_per_day' : 'selling_price')
            ->with('warehouse:id,name')
            ->latest()
            ->get()
            ->map(fn (Vehicle $vehicle) => [
                'id' => $vehicle->id,
                'reference' => $vehicle->reference,
                'brand' => $vehicle->brand,
                'model' => $vehicle->model,
                'variant' => $vehicle->variant,
                'year' => $vehicle->year,
                'listing_type' => $vehicle->listing_type,
                'fuel_type' => $vehicle->fuel_type,
                'transmission' => $vehicle->transmission,
                'color' => $vehicle->color,
                'image_url' => $vehicle->image_url,
                'price' => (float) ($vehicle->listing_type === 'rental'
                    ? $vehicle->rental_price_per_day
                    : $vehicle->selling_price),
                'warehouse' => $vehicle->warehouse?->name,
            ]);

        return Inertia::render('public/cars', [
            'vehicles' => $vehicles,
            'listingType' => $listingType,
        ]);
    }

    public function show(Vehicle $vehicle)
    {
        abort_unless(
            $vehicle->status === 'ready_for_sale'
                && (($vehicle->listing_type === 'sale' && $vehicle->selling_price !== null)
                    || ($vehicle->listing_type === 'rental' && $vehicle->rental_price_per_day !== null)),
            404
        );

        $vehicle->load([
            'warehouse:id,name,city,country',
            'vehicleModel:id,name',
        ]);

        return Inertia::render('public/vehicle-details', [
            'vehicle' => [
                'id' => $vehicle->id,
                'reference' => $vehicle->reference,
                'brand' => $vehicle->brand,
                'model' => $vehicle->model,
                'variant' => $vehicle->variant,
                'year' => $vehicle->year,
                'listing_type' => $vehicle->listing_type,
                'fuel_type' => $vehicle->fuel_type,
                'transmission' => $vehicle->transmission,
                'color' => $vehicle->color,
                'image_url' => $vehicle->image_url,
                'mileage' => $vehicle->mileage,
                'selling_price' => (float) $vehicle->selling_price,
                'rental_price_per_day' => (float) $vehicle->rental_price_per_day,
                'warehouse' => $vehicle->warehouse ? [
                    'name' => $vehicle->warehouse->name,
                    'city' => $vehicle->warehouse->city,
                    'country' => $vehicle->warehouse->country,
                ] : null,
                'vehicle_model' => $vehicle->vehicleModel ? [
                    'name' => $vehicle->vehicleModel->name,
                ] : null,
            ],
        ]);
    }
}