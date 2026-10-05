<?php

namespace App\Http\Controllers;

use App\Models\VehicleModel;
use Inertia\Inertia;

class ManufacturingController extends Controller
{
    public function index()
    {
        $vehicleModels = VehicleModel::query()
            ->with('billOfMaterial.items.part')
            ->get()
            ->map(function (VehicleModel $vehicleModel) {
                $items = $vehicleModel->billOfMaterial?->items ?? collect();

                $parts = $items->map(function ($item) {
                    $available = (float) $item->part->stock_quantity;
                    $required = (float) $item->quantity;

                    return [
                        'name' => $item->part->name,
                        'sku' => $item->part->sku,
                        'available' => $available,
                        'required' => $required,
                        'enough' => $available >= $required,
                    ];
                });

                $canBuild = $parts->isEmpty()
                    ? 0
                    : (int) $parts
                        ->map(fn ($part) => floor($part['available'] / $part['required']))
                        ->min();

                return [
                    'name' => $vehicleModel->name,
                    'code' => $vehicleModel->code,
                    'description' => $vehicleModel->description,
                    'parts' => $parts,
                    'can_build' => $canBuild,
                ];
            });

        return Inertia::render('public/manufacturing', [
            'vehicleModels' => $vehicleModels,
        ]);
    }
}