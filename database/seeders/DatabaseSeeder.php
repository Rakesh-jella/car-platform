<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin User for Warehouse / ERP
        User::firstOrCreate(
            ['email' => 'admin@carplatform.com'],
            [
                'name' => 'Admin Manager',
                'password' => Hash::make('password'),
                'is_admin' => true,
            ]
        );

        // Storefront Customer User
        User::firstOrCreate(
            ['email' => 'customer@example.com'],
            [
                'name' => 'Rakesh Jella',
                'password' => Hash::make('password'),
                'is_admin' => false,
            ]
        );

        $this->call([
            WarehouseDemoSeeder::class,
            ManufacturingDemoSeeder::class,
            VehicleDemoSeeder::class,
            StorefrontDemoSeeder::class,
        ]);
    }
}
