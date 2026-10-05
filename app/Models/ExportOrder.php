<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExportOrder extends Model
{
    protected $fillable = [
        'customer_id',
        'vehicle_id',
        'export_quotation_id',
        'reference',
        'agreed_price',
        'currency',
        'status',
        'order_date',
    ];

    protected function casts(): array
    {
        return [
            'agreed_price' => 'decimal:2',
            'order_date' => 'date',
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

    public function quotation()
    {
        return $this->belongsTo(ExportQuotation::class, 'export_quotation_id');
    }

    public function shipment()
    {
        return $this->hasOne(ExportShipment::class);
    }
}