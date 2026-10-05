<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('import_requests', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->nullable()->unique();

            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->string('country');

            $table->string('vehicle_brand');
            $table->string('vehicle_model');
            $table->unsignedSmallInteger('year')->nullable();
            $table->string('fuel_type')->nullable();
            $table->string('transmission')->nullable();
            $table->decimal('budget', 15, 2)->nullable();
            $table->text('notes')->nullable();

            $table->string('status')->default('requested');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('import_requests');
    }
};