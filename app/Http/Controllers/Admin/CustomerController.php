<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/customers', [
            'customers' => Customer::latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Customer::create($request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'country' => ['nullable', 'string', 'max:100'],
            'address' => ['nullable', 'string'],
        ]));

        return to_route('admin.customers.index')
            ->with('success', 'Customer created successfully.');
    }
}