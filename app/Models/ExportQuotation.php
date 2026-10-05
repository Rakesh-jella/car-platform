<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExportQuotation extends Model
{
    protected $fillable = [
        'customer_id',
        'vehicle_id',
        'reference',
        'quoted_price',
        'currency',
        'status',
        'valid_until',
    ];

    protected function casts(): array
    {
        return [
            'quoted_price' => 'decimal:2',
            'valid_until' => 'date',
        ];
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function exportOrder()
    {
        return $this->hasOne(ExportOrder::class);
    }
}