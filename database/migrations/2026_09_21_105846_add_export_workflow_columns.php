<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->string('name')->after('id');
            $table->string('email')->nullable()->after('name');
            $table->string('phone')->nullable()->after('email');
            $table->string('country')->nullable()->after('phone');
            $table->text('address')->nullable()->after('country');
        });

        Schema::table('export_quotations', function (Blueprint $table) {
            $table->foreignId('customer_id')->constrained()->after('id');
            $table->foreignId('vehicle_id')->constrained()->after('customer_id');
            $table->string('reference')->unique()->after('vehicle_id');
            $table->decimal('quoted_price', 15, 2)->after('reference');
            $table->string('currency', 3)->default('USD')->after('quoted_price');
            $table->string('status')->default('quotation_draft')->after('currency');
            $table->date('valid_until')->nullable()->after('status');
        });

        Schema::table('export_orders', function (Blueprint $table) {
            $table->foreignId('customer_id')->constrained()->after('id');
            $table->foreignId('vehicle_id')->constrained()->after('customer_id');
            $table->foreignId('export_quotation_id')->nullable()->constrained()->nullOnDelete()->after('vehicle_id');
            $table->string('reference')->unique()->after('export_quotation_id');
            $table->decimal('agreed_price', 15, 2)->after('reference');
            $table->string('currency', 3)->default('USD')->after('agreed_price');
            $table->string('status')->default('order_created')->after('currency');
            $table->date('order_date')->after('status');
        });

        Schema::table('export_shipments', function (Blueprint $table) {
            $table->foreignId('export_order_id')->unique()->constrained()->cascadeOnDelete()->after('id');
            $table->string('shipping_company')->nullable()->after('export_order_id');
            $table->string('tracking_number')->nullable()->after('shipping_company');
            $table->string('departure_port')->nullable()->after('tracking_number');
            $table->string('destination_port')->nullable()->after('departure_port');
            $table->date('shipped_at')->nullable()->after('destination_port');
            $table->date('arrived_at')->nullable()->after('shipped_at');
            $table->string('status')->default('documents_pending')->after('arrived_at');
        });
    }

    public function down(): void
    {
        Schema::table('export_shipments', fn (Blueprint $table) => $table->dropConstrainedForeignId('export_order_id'));

        Schema::table('export_orders', function (Blueprint $table) {
            $table->dropConstrainedForeignId('customer_id');
            $table->dropConstrainedForeignId('vehicle_id');
            $table->dropConstrainedForeignId('export_quotation_id');
            $table->dropColumn(['reference', 'agreed_price', 'currency', 'status', 'order_date']);
        });

        Schema::table('export_quotations', function (Blueprint $table) {
            $table->dropConstrainedForeignId('customer_id');
            $table->dropConstrainedForeignId('vehicle_id');
            $table->dropColumn(['reference', 'quoted_price', 'currency', 'status', 'valid_until']);
        });

        Schema::table('customers', fn (Blueprint $table) =>
            $table->dropColumn(['name', 'email', 'phone', 'country', 'address'])
        );
    }
};