<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    protected $fillable = [
        'name',
        'code',
        'city',
        'country',
        'address',
    ];

    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }

    public function transactions()
    {
        return $this->hasMany(InventoryTransaction::class);
    }
    public function vehicles()
    {
        return $this->hasMany(Vehicle::class);
    }

}