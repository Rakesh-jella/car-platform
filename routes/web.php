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

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/cars', [VehicleController::class, 'index'])->name('cars');

Route::get('/cars/{vehicle:reference}', [VehicleController::class, 'show'])
    ->name('cars.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/admin/customers', [CustomerController::class, 'index'])
    ->name('admin.customers.index');

Route::post('/admin/customers', [CustomerController::class, 'store'])
    ->name('admin.customers.store');


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

Route::get('/manufacturing', [ManufacturingController::class, 'index'])->name('manufacturing');
Route::get('/warehouse', [WarehouseController::class, 'index'])->name('warehouse');

Route::get('/contact', function () {
    return Inertia::render('public/page', [
        'title' => 'Contact Us',
        'description' => 'Speak with our sales team about vehicles, imports, exports, manufacturing, or partnerships.',
    ]);
})->name('contact');

Route::get('/admin/export-orders', [ExportOrderController::class, 'index'])
    ->name('admin.export-orders.index');

Route::post('/admin/export-orders', [ExportOrderController::class, 'store'])
    ->name('admin.export-orders.store');

Route::patch('/admin/export-orders/{exportOrder}/status', [ExportOrderController::class, 'updateStatus'])
    ->name('admin.export-orders.status');



require __DIR__.'/auth.php';