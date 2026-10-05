<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [
        'reference',
        'vin',
        'vehicle_model_id',
        'brand',
        'model',
        'variant',
        'year',
        'source',
        'status',
        'fuel_type',
        'transmission',
        'color',
        'mileage',
        'warehouse_id',
        'purchase_cost',
        'import_cost',
        'production_cost',
        'selling_price',
        'purchased_at',
        'arrived_at',
        'ready_for_sale_at',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'purchase_cost' => 'decimal:2',
            'import_cost' => 'decimal:2',
            'production_cost' => 'decimal:2',
            'selling_price' => 'decimal:2',
            'purchased_at' => 'date',
            'arrived_at' => 'date',
            'ready_for_sale_at' => 'date',
        ];
    }

    public function vehicleModel()
    {
        return $this->belongsTo(VehicleModel::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function getTotalCostAttribute(): float
    {
        return (float) $this->purchase_cost
            + (float) $this->import_cost
            + (float) $this->production_cost;
    }

    public function exportQuotations()
{
    return $this->hasMany(ExportQuotation::class);
}

public function exportOrders()
{
    return $this->hasMany(ExportOrder::class);
}


}