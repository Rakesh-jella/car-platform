<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImportRequest extends Model
{
    protected $fillable = [
        'reference',
        'full_name',
        'email',
        'phone',
        'country',
        'vehicle_brand',
        'vehicle_model',
        'year',
        'fuel_type',
        'transmission',
        'budget',
        'notes',
        'status',
    ];
}