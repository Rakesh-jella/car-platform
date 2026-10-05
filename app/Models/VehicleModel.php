<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleModel extends Model
{
    protected $fillable = [
        'name',
        'code',
        'description',
    ];

    public function billOfMaterial()
    {
        return $this->hasOne(BillOfMaterial::class);
    }

    public function manufacturingOrders()
    {
        return $this->hasMany(ManufacturingOrder::class);
    }

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class);
    }
}