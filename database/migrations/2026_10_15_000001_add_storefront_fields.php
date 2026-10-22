<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false);
        });

        Schema::table('vehicles', function (Blueprint $table) {
            $table->string('listing_type')->default('sale');
            $table->decimal('rental_price_per_day', 15, 2)->nullable();
        });

        Schema::table('parts', function (Blueprint $table) {
            $table->string('category')->default('parts');
            $table->text('description')->nullable();
            $table->decimal('selling_price', 15, 2)->nullable();
            $table->string('image_url')->nullable();
        });

        Schema::create('store_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('reference')->unique();
            $table->string('product_type');
            $table->unsignedBigInteger('product_id');
            $table->string('product_name');
            $table->string('category');
            $table->string('order_type');
            $table->unsignedInteger('quantity')->default(1);
            $table->unsignedInteger('rental_days')->nullable();
            $table->decimal('unit_price', 15, 2);
            $table->decimal('total_amount', 15, 2);
            $table->decimal('advance_amount', 15, 2)->default(0);
            $table->string('status')->default('payment_pending');
            $table->timestamps();

            $table->index(['product_type', 'product_id']);
        });

        Schema::create('inventory_alerts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('part_id')->nullable()->constrained()->nullOnDelete();
            $table->string('category');
            $table->string('message');
            $table->timestamp('acknowledged_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inventory_alerts');
        Schema::dropIfExists('store_orders');

        Schema::table('parts', function (Blueprint $table) {
            $table->dropColumn(['category', 'description', 'selling_price', 'image_url']);
        });

        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropColumn(['listing_type', 'rental_price_per_day']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_admin');
        });
    }
};
