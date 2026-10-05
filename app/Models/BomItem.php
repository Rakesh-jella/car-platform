<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BomItem extends Model
{
    protected $fillable = [
        'bill_of_material_id',
        'part_id',
        'quantity',
    ];

    public function billOfMaterial()
    {
        return $this->belongsTo(BillOfMaterial::class);
    }

    public function part()
    {
        return $this->belongsTo(Part::class);
    }
}