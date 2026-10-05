<?php

namespace App\Http\Controllers;

use App\Models\ImportRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicImportRequestController extends Controller
{
    public function index()
    {
        return Inertia::render('public/import', [
            'success' => session('success'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'country' => ['required', 'string', 'max:100'],
            'vehicle_brand' => ['required', 'string', 'max:100'],
            'vehicle_model' => ['required', 'string', 'max:100'],
            'year' => ['nullable', 'integer', 'min:1900', 'max:2027'],
            'fuel_type' => ['nullable', 'string', 'max:50'],
            'transmission' => ['nullable', 'string', 'max:50'],
            'budget' => ['nullable', 'numeric', 'min:0'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $importRequest = ImportRequest::create($validated);

        $importRequest->update([
            'reference' => 'IMP-' . str_pad((string) $importRequest->id, 6, '0', STR_PAD_LEFT),
        ]);

        return redirect()
            ->route('import')
            ->with('success', "Your import request {$importRequest->reference} was submitted successfully.");
    }
}