<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ManufacturingOrder extends Model
{
    protected $fillable = [
        'reference',
        'vehicle_model_id',
        'planned_quantity',
        'status',
        'scheduled_date',
        'started_at',
        'completed_at',
    ];

    public function vehicleModel()
    {
        return $this->belongsTo(VehicleModel::class);
    }
}