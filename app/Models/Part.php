<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    protected $fillable = [
        'name',
        'sku',
        'stock_quantity',
        'unit',
    ];

    public function bomItems()
    {
        return $this->hasMany(BomItem::class);
    }

    public function inventories()
{
    return $this->hasMany(Inventory::class);
}

public function inventoryTransactions()
{
    return $this->hasMany(InventoryTransaction::class);
}


}