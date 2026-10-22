<?php

use App\Http\Controllers\PublicImportRequestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ManufacturingController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ExportOrderController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\Admin\InventoryController;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/cars', [VehicleController::class, 'index'])->name('cars');

Route::get('/cars/{vehicle:reference}', [VehicleController::class, 'show'])
    ->name('cars.show');

Route::get('/parts', [StoreController::class, 'parts'])->name('store.parts');
Route::middleware('auth')->group(function () {
    Route::get('/my-orders', [StoreController::class, 'orders'])->name('store.orders');
    Route::post('/store/orders', [StoreController::class, 'storeOrder'])->name('store.orders.store');
});

Route::middleware('admin')->prefix('admin')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/customers', [CustomerController::class, 'index'])
        ->name('admin.customers.index');

    Route::post('/customers', [CustomerController::class, 'store'])
        ->name('admin.customers.store');

    Route::get('/export-orders', [ExportOrderController::class, 'index'])
        ->name('admin.export-orders.index');
    Route::post('/export-orders', [ExportOrderController::class, 'store'])
        ->name('admin.export-orders.store');
    Route::patch('/export-orders/{exportOrder}/status', [ExportOrderController::class, 'updateStatus'])
        ->name('admin.export-orders.status');

    Route::get('/warehouse', [\App\Http\Controllers\WarehouseController::class, 'index'])
        ->name('admin.warehouse');
    Route::post('/warehouse/{inventory}/receive', [InventoryController::class, 'receive'])
        ->name('admin.warehouse.receive');
    Route::patch('/inventory-alerts/{alert}/acknowledge', [InventoryController::class, 'acknowledge'])
        ->name('admin.inventory-alerts.acknowledge');
    Route::get('/manufacturing', [ManufacturingController::class, 'index'])
        ->name('admin.manufacturing');
    Route::get('/cars', [VehicleController::class, 'index'])
        ->name('admin.cars');
    Route::get('/parts', [StoreController::class, 'parts'])
        ->name('admin.parts');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/import', [PublicImportRequestController::class, 'index'])->name('import');
Route::post('/import/request', [PublicImportRequestController::class, 'store'])->name('import.store');

Route::get('/export', function () {
    return Inertia::render('public/page', [
        'title' => 'Export Vehicles',
        'description' => 'We manage vehicle exports, documentation, shipping, and delivery to international customers.',
    ]);
})->name('export');

Route::get('/contact', function () {
    return Inertia::render('public/page', [
        'title' => 'Contact Us',
        'description' => 'Speak with our sales team about vehicles, imports, exports, manufacturing, or partnerships.',
    ]);
})->name('contact');

require __DIR__.'/auth.php';