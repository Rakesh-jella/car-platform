<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;



class Customer extends Model
{

protected $fillable = [
    'name',
    'email',
    'phone',
    'country',
    'address',
];


    public function exportQuotations()
{
    return $this->hasMany(ExportQuotation::class);
}

public function exportOrders()
{
    return $this->hasMany(ExportOrder::class);
}

}
