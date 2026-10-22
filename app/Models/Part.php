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
        'category',
        'description',
        'selling_price',
        'image_url',
    ];

    protected function casts(): array
    {
        return [
            'stock_quantity' => 'decimal:2',
            'selling_price' => 'decimal:2',
        ];
    }

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