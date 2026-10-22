<?php

namespace Tests\Feature;

use App\Models\Part;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class StorefrontTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_cannot_access_the_warehouse_erp(): void
    {
        $this->get('/admin/warehouse')->assertRedirect(route('admin.login'));

        $customer = User::factory()->create();
        $this->actingAs($customer)->get('/admin')->assertForbidden();
    }

    public function test_storefront_customer_can_order_part_and_last_unit_alerts_admin_by_category(): void
    {
        $customer = User::factory()->create();
        $part = Part::create([
            'name' => 'Track brake kit',
            'sku' => 'RACE-001',
            'stock_quantity' => 1,
            'category' => 'sports_racing',
            'selling_price' => 12000,
        ]);

        $response = $this->actingAs($customer)->post('/store/orders', [
            'product_type' => 'part',
            'product_id' => $part->id,
            'order_type' => 'purchase',
            'quantity' => 1,
        ]);

        $response->assertRedirect(route('store.orders'));
        $this->assertDatabaseHas('store_orders', [
            'user_id' => $customer->id,
            'product_id' => $part->id,
            'category' => 'sports_racing',
            'status' => 'payment_pending',
        ]);
        $this->assertDatabaseHas('parts', ['id' => $part->id, 'stock_quantity' => 0]);
        $this->assertDatabaseHas('inventory_alerts', [
            'part_id' => $part->id,
            'category' => 'sports_racing',
        ]);
    }

    public function test_customer_cannot_order_more_parts_than_are_in_stock(): void
    {
        $customer = User::factory()->create();
        $part = Part::create([
            'name' => 'Styling lamp',
            'sku' => 'STYLE-001',
            'stock_quantity' => 1,
            'category' => 'styling',
            'selling_price' => 2500,
        ]);

        $this->actingAs($customer)->from('/parts')->post('/store/orders', [
            'product_type' => 'part',
            'product_id' => $part->id,
            'order_type' => 'purchase',
            'quantity' => 2,
        ])->assertSessionHasErrors('product_id');

        $this->assertDatabaseHas('parts', ['id' => $part->id, 'stock_quantity' => 1]);
        $this->assertDatabaseCount('store_orders', 0);
    }

    public function test_admin_login_is_separate_and_requires_admin_access(): void
    {
        $customer = User::factory()->create();
        $this->post('/admin/login', [
            'email' => $customer->email,
            'password' => 'password',
        ])->assertSessionHasErrors('email');
        $this->assertGuest();

        $admin = User::factory()->create();
        $admin->forceFill(['is_admin' => true])->save();

        $this->post('/admin/login', [
            'email' => $admin->email,
            'password' => 'password',
        ])->assertRedirect(route('dashboard'));
        $this->assertAuthenticatedAs($admin);
    }

    public function test_admin_setup_command_creates_admin_with_a_hashed_password(): void
    {
        $this->artisan('app:create-admin-user')
            ->expectsQuestion('Administrator name', 'Warehouse Admin')
            ->expectsQuestion('Administrator email', 'admin@example.com')
            ->expectsQuestion('Password (minimum 12 characters)', 'safe-admin-password')
            ->expectsQuestion('Confirm password', 'safe-admin-password')
            ->expectsOutputToContain('Administrator account created')
            ->assertExitCode(0);

        $admin = User::query()->where('email', 'admin@example.com')->firstOrFail();

        $this->assertTrue($admin->is_admin);
        $this->assertTrue(Hash::check('safe-admin-password', $admin->password));
    }

    public function test_admin_setup_command_does_not_promote_an_existing_customer(): void
    {
        $customer = User::factory()->create(['email' => 'customer@example.com']);

        $this->artisan('app:create-admin-user')
            ->expectsQuestion('Administrator name', 'Warehouse Admin')
            ->expectsQuestion('Administrator email', $customer->email)
            ->expectsOutputToContain('An account with this email already exists')
            ->assertExitCode(1);

        $this->assertFalse($customer->fresh()->is_admin);
    }
}
