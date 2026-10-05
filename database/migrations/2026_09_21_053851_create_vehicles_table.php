<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();

            $table->string('reference')->unique();
            $table->string('vin')->nullable()->unique();

            $table->foreignId('vehicle_model_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->string('brand');
            $table->string('model');
            $table->string('variant')->nullable();
            $table->unsignedSmallInteger('year')->nullable();

            $table->string('source');
            $table->string('status');

            $table->string('fuel_type')->nullable();
            $table->string('transmission')->nullable();
            $table->string('color')->nullable();
            $table->unsignedInteger('mileage')->nullable();

            $table->foreignId('warehouse_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->decimal('purchase_cost', 15, 2)->nullable();
            $table->decimal('import_cost', 15, 2)->default(0);
            $table->decimal('production_cost', 15, 2)->default(0);
            $table->decimal('selling_price', 15, 2)->nullable();

            $table->date('purchased_at')->nullable();
            $table->date('arrived_at')->nullable();
            $table->date('ready_for_sale_at')->nullable();

            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};