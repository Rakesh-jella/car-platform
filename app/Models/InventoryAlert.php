<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InventoryAlert extends Model
{
    protected $fillable = [
        'part_id',
        'category',
        'message',
        'acknowledged_at',
    ];

    protected function casts(): array
    {
        return [
            'acknowledged_at' => 'datetime',
        ];
    }

    public function part(): BelongsTo
    {
        return $this->belongsTo(Part::class);
    }
}
