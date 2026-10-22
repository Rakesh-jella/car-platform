<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreOrder extends Model
{
    protected $fillable = [
        'user_id',
        'reference',
        'product_type',
        'product_id',
        'product_name',
        'category',
        'order_type',
        'quantity',
        'rental_days',
        'unit_price',
        'total_amount',
        'advance_amount',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'unit_price' => 'decimal:2',
            'total_amount' => 'decimal:2',
            'advance_amount' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
