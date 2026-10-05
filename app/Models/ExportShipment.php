<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExportShipment extends Model
{
    protected $fillable = [
        'export_order_id',
        'shipping_company',
        'tracking_number',
        'departure_port',
        'destination_port',
        'shipped_at',
        'arrived_at',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'shipped_at' => 'date',
            'arrived_at' => 'date',
        ];
    }

    public function exportOrder()
    {
        return $this->belongsTo(ExportOrder::class);
    }
}