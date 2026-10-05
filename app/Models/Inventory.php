<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    protected $fillable = [
        'warehouse_id',
        'part_id',
        'quantity',
        'reserved_quantity',
        'minimum_quantity',
    ];

    protected $appends = ['available_quantity', 'is_low_stock'];

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function part()
    {
        return $this->belongsTo(Part::class);
    }

    public function getAvailableQuantityAttribute(): float
    {
        return (float) $this->quantity - (float) $this->reserved_quantity;
    }

    public function getIsLowStockAttribute(): bool
    {
        return $this->available_quantity <= (float) $this->minimum_quantity;
    }
}