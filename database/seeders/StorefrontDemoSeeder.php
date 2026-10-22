<?php

namespace Database\Seeders;

use App\Models\Inventory;
use App\Models\InventoryAlert;
use App\Models\InventoryTransaction;
use App\Models\Part;
use App\Models\StoreOrder;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StorefrontDemoSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Warehouses
        $mainWarehouse = Warehouse::updateOrCreate(
            ['code' => 'MAIN-HYD'],
            [
                'name' => 'Hyderabad Central Hub',
                'city' => 'Hyderabad',
                'country' => 'India',
                'address' => 'Gachibowli Logistics Park, Hyderabad',
            ]
        );

        $mumbaiWarehouse = Warehouse::updateOrCreate(
            ['code' => 'HUB-BOM'],
            [
                'name' => 'Mumbai Port Terminal',
                'city' => 'Mumbai',
                'country' => 'India',
                'address' => 'JNPT Port Road, Navi Mumbai',
            ]
        );

        $bangaloreWarehouse = Warehouse::updateOrCreate(
            ['code' => 'HUB-BLR'],
            [
                'name' => 'Bangalore Regional Center',
                'city' => 'Bangalore',
                'country' => 'India',
                'address' => 'Electronic City Phase 2, Bangalore',
            ]
        );

        // 2. Cars for Sale
        $saleVehicles = [
            [
                'reference' => 'VEH-SALE-001',
                'vin' => 'JTEBR3FJ50K100001',
                'brand' => 'Toyota',
                'model' => 'Land Cruiser 300',
                'variant' => 'ZX V6 Twin Turbo',
                'year' => 2024,
                'source' => 'imported',
                'status' => 'ready_for_sale',
                'listing_type' => 'sale',
                'fuel_type' => 'Diesel',
                'transmission' => 'Automatic',
                'color' => 'Pearl White',
                'image_url' => 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80',
                'mileage' => 150,
                'warehouse_id' => $mumbaiWarehouse->id,
                'purchase_cost' => 14000000,
                'selling_price' => 21000000,
                'notes' => 'Flagship imported luxury SUV. Full customs cleared with valid RTO documentation.',
            ],
            [
                'reference' => 'VEH-SALE-002',
                'vin' => 'WBA33AY05P8200002',
                'brand' => 'BMW',
                'model' => 'M4 Competition',
                'variant' => 'Coupe M xDrive',
                'year' => 2024,
                'source' => 'imported',
                'status' => 'ready_for_sale',
                'listing_type' => 'sale',
                'fuel_type' => 'Petrol',
                'transmission' => 'Automatic',
                'color' => 'Isle of Man Green',
                'image_url' => 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
                'mileage' => 1200,
                'warehouse_id' => $bangaloreWarehouse->id,
                'purchase_cost' => 11000000,
                'selling_price' => 15300000,
                'notes' => '503 hp TwinPower Turbo Inline-6. Carbon fiber roof and bucket seats.',
            ],
            [
                'reference' => 'VEH-SALE-003',
                'vin' => 'W1KAF4HB5PN300003',
                'brand' => 'Mercedes-Benz',
                'model' => 'C-Class',
                'variant' => 'C300 AMG Line',
                'year' => 2024,
                'source' => 'manufactured',
                'status' => 'ready_for_sale',
                'listing_type' => 'sale',
                'fuel_type' => 'Petrol',
                'transmission' => 'Automatic',
                'color' => 'Obsidian Black',
                'image_url' => 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
                'mileage' => 450,
                'warehouse_id' => $mainWarehouse->id,
                'purchase_cost' => 4800000,
                'selling_price' => 6200000,
                'notes' => 'Mild-hybrid performance sedan with Burmester 3D Surround sound and panoramic sunroof.',
            ],
            [
                'reference' => 'VEH-SALE-004',
                'vin' => 'WP0AB2A97NS400004',
                'brand' => 'Porsche',
                'model' => '911 Carrera S',
                'variant' => 'Coupe PDK',
                'year' => 2024,
                'source' => 'imported',
                'status' => 'ready_for_sale',
                'listing_type' => 'sale',
                'fuel_type' => 'Petrol',
                'transmission' => 'Automatic',
                'color' => 'Guards Red',
                'image_url' => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
                'mileage' => 850,
                'warehouse_id' => $mumbaiWarehouse->id,
                'purchase_cost' => 14500000,
                'selling_price' => 18500000,
                'notes' => '3.0L twin-turbo flat-6 generating 443 hp. Sport Chrono package equipped.',
            ],
            [
                'reference' => 'VEH-SALE-005',
                'vin' => 'JTDBR32E720500005',
                'brand' => 'Toyota',
                'model' => 'Camry Hybrid',
                'variant' => 'Luxury Elegance',
                'year' => 2024,
                'source' => 'imported',
                'status' => 'ready_for_sale',
                'listing_type' => 'sale',
                'fuel_type' => 'Hybrid',
                'transmission' => 'Automatic',
                'color' => 'Silver Metallic',
                'image_url' => 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80',
                'mileage' => 0,
                'warehouse_id' => $mainWarehouse->id,
                'purchase_cost' => 3500000,
                'selling_price' => 4600000,
                'notes' => 'Self-charging hybrid executive saloon with exceptional fuel efficiency and ventilated rear seats.',
            ],
            [
                'reference' => 'VEH-SALE-006',
                'vin' => 'WAUZZZF45PA600006',
                'brand' => 'Audi',
                'model' => 'A4',
                'variant' => '40 TFSI Technology',
                'year' => 2024,
                'source' => 'manufactured',
                'status' => 'ready_for_sale',
                'listing_type' => 'sale',
                'fuel_type' => 'Petrol',
                'transmission' => 'Automatic',
                'color' => 'Ibis White',
                'image_url' => 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
                'mileage' => 1800,
                'warehouse_id' => $bangaloreWarehouse->id,
                'purchase_cost' => 3900000,
                'selling_price' => 5180000,
                'notes' => 'Audi Virtual Cockpit Plus, Matrix LED headlights, and Bang & Olufsen 3D Sound.',
            ],
            [
                'reference' => 'VEH-SALE-007',
                'vin' => '1FA6P8CF4P5700007',
                'brand' => 'Ford',
                'model' => 'Mustang GT',
                'variant' => 'Fastback 5.0 V8',
                'year' => 2023,
                'source' => 'imported',
                'status' => 'ready_for_sale',
                'listing_type' => 'sale',
                'fuel_type' => 'Petrol',
                'transmission' => 'Automatic',
                'color' => 'Velocity Blue',
                'image_url' => 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
                'mileage' => 3200,
                'warehouse_id' => $mainWarehouse->id,
                'purchase_cost' => 5500000,
                'selling_price' => 7450000,
                'notes' => 'Naturally aspirated 450 hp Coyote V8 with active valve performance exhaust.',
            ],
            [
                'reference' => 'VEH-SALE-008',
                'vin' => 'SALYA2V48PA800008',
                'brand' => 'Range Rover',
                'model' => 'Velar',
                'variant' => 'Dynamic HSE 2.0D',
                'year' => 2024,
                'source' => 'imported',
                'status' => 'ready_for_sale',
                'listing_type' => 'sale',
                'fuel_type' => 'Diesel',
                'transmission' => 'Automatic',
                'color' => 'Fuji White',
                'image_url' => 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
                'mileage' => 600,
                'warehouse_id' => $bangaloreWarehouse->id,
                'purchase_cost' => 7200000,
                'selling_price' => 9400000,
                'notes' => 'Modern avant-garde luxury SUV with flush door handles and adaptive dynamics.',
            ],
        ];

        foreach ($saleVehicles as $vData) {
            Vehicle::updateOrCreate(['reference' => $vData['reference']], $vData);
        }

        // 3. Cars for Rent (listing_type = 'rental')
        $rentalVehicles = [
            [
                'reference' => 'VEH-RENT-001',
                'vin' => 'MBJ11BBA4P9000001',
                'brand' => 'Mahindra',
                'model' => 'Thar Roxx',
                'variant' => 'AX7L 4x4 Automatic',
                'year' => 2024,
                'source' => 'manufactured',
                'status' => 'ready_for_sale',
                'listing_type' => 'rental',
                'fuel_type' => 'Diesel',
                'transmission' => 'Automatic',
                'color' => 'Stealth Black',
                'image_url' => 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=80',
                'mileage' => 4500,
                'warehouse_id' => $mainWarehouse->id,
                'rental_price_per_day' => 4800,
                'notes' => 'Popular 5-door 4x4 off-roader with panoramic roof and Harman Kardon audio.',
            ],
            [
                'reference' => 'VEH-RENT-002',
                'vin' => 'TYS22GRS8P9000002',
                'brand' => 'Toyota',
                'model' => 'Fortuner',
                'variant' => 'GR-Sport 4x4 AT',
                'year' => 2024,
                'source' => 'manufactured',
                'status' => 'ready_for_sale',
                'listing_type' => 'rental',
                'fuel_type' => 'Diesel',
                'transmission' => 'Automatic',
                'color' => 'Attitude Black',
                'image_url' => 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
                'mileage' => 8200,
                'warehouse_id' => $mainWarehouse->id,
                'rental_price_per_day' => 6500,
                'notes' => '7-seater rugged tourer with tuned GR suspension and ventilated front seats.',
            ],
            [
                'reference' => 'VEH-RENT-003',
                'vin' => 'W1K2130761A900003',
                'brand' => 'Mercedes-Benz',
                'model' => 'E-Class',
                'variant' => 'E220d Exclusive Long Wheelbase',
                'year' => 2024,
                'source' => 'imported',
                'status' => 'ready_for_sale',
                'listing_type' => 'rental',
                'fuel_type' => 'Diesel',
                'transmission' => 'Automatic',
                'color' => 'Polar White',
                'image_url' => 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
                'mileage' => 3100,
                'warehouse_id' => $mumbaiWarehouse->id,
                'rental_price_per_day' => 14500,
                'notes' => 'Executive chauffeur-ready luxury with rear reclining seats and air suspension.',
            ],
            [
                'reference' => 'VEH-RENT-004',
                'vin' => 'WBA51BJ08P9000004',
                'brand' => 'BMW',
                'model' => '5 Series',
                'variant' => '530d M Sport',
                'year' => 2024,
                'source' => 'imported',
                'status' => 'ready_for_sale',
                'listing_type' => 'rental',
                'fuel_type' => 'Diesel',
                'transmission' => 'Automatic',
                'color' => 'Carbon Black',
                'image_url' => 'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=1200&q=80',
                'mileage' => 2900,
                'warehouse_id' => $bangaloreWarehouse->id,
                'rental_price_per_day' => 13000,
                'notes' => '265 hp 6-cylinder diesel luxury sedan with M Sport brakes and gesture control.',
            ],
            [
                'reference' => 'VEH-RENT-005',
                'vin' => '1FA6P8FF2P9000005',
                'brand' => 'Ford',
                'model' => 'Mustang',
                'variant' => 'GT V8 Convertible',
                'year' => 2023,
                'source' => 'imported',
                'status' => 'ready_for_sale',
                'listing_type' => 'rental',
                'fuel_type' => 'Petrol',
                'transmission' => 'Automatic',
                'color' => 'Race Red',
                'image_url' => 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
                'mileage' => 5400,
                'warehouse_id' => $mumbaiWarehouse->id,
                'rental_price_per_day' => 18500,
                'notes' => 'Open-top muscle car experience for weddings, shoots, and weekend coastal road trips.',
            ],
            [
                'reference' => 'VEH-RENT-006',
                'vin' => 'SALEE2E46P9000006',
                'brand' => 'Land Rover',
                'model' => 'Defender 110',
                'variant' => 'D300 HSE X-Dynamic',
                'year' => 2024,
                'source' => 'imported',
                'status' => 'ready_for_sale',
                'listing_type' => 'rental',
                'fuel_type' => 'Diesel',
                'transmission' => 'Automatic',
                'color' => 'Pangea Green',
                'image_url' => 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
                'mileage' => 4100,
                'warehouse_id' => $bangaloreWarehouse->id,
                'rental_price_per_day' => 16000,
                'notes' => 'Legendary adventure 4x4 with electronic air suspension and 3D surround camera.',
            ],
        ];

        foreach ($rentalVehicles as $rData) {
            Vehicle::updateOrCreate(['reference' => $rData['reference']], $rData);
        }

        // 4. Products / Parts Catalog across all 3 storefront categories:
        // Category 1: 'parts' (Mechanical & Replacement Parts)
        // Category 2: 'styling' (Aesthetics, Body Kits & Wheels)
        // Category 3: 'sports_racing' (Performance, Track & Racing Gear)
        $catalogParts = [
            // --- CATEGORY: PARTS ---
            [
                'sku' => 'BRM-BP-001',
                'name' => 'Brembo Front Performance Ceramic Brake Pad Set',
                'category' => 'parts',
                'unit' => 'set',
                'stock_quantity' => 24,
                'selling_price' => 8500,
                'description' => 'Low-dust, high-temperature ceramic compound delivering exceptional bite and fade resistance for performance road driving.',
                'image_url' => 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'BSC-SP-004',
                'name' => 'Bosch Double Iridium Spark Plug Kit (Pack of 4)',
                'category' => 'parts',
                'unit' => 'pack',
                'stock_quantity' => 45,
                'selling_price' => 4200,
                'description' => 'Ultra-fine wire 360-degree laser-welded iridium firing pin for optimal combustion efficiency and extended 100,000 km service life.',
                'image_url' => 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'GRT-TB-001',
                'name' => 'Garrett GT2860R Dual Ball Bearing Turbocharger',
                'category' => 'parts',
                'unit' => 'unit',
                'stock_quantity' => 6,
                'selling_price' => 68000,
                'description' => 'Ceramic dual ball-bearing turbocharger unit with Inconel turbine wheel capable of supporting up to 360 HP boost.',
                'image_url' => 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'KN-AI-057',
                'name' => 'K&N 57-Series High-Flow Cold Air Intake System',
                'category' => 'parts',
                'unit' => 'kit',
                'stock_quantity' => 18,
                'selling_price' => 18500,
                'description' => 'Engineered to increase horsepower and throttle response by replacing restrictive factory air boxes with a washable oiled cotton filter.',
                'image_url' => 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'BLS-SA-004',
                'name' => 'Bilstein B6 Monotube Performance Damper Kit (Set of 4)',
                'category' => 'parts',
                'unit' => 'set',
                'stock_quantity' => 8,
                'selling_price' => 52000,
                'description' => 'Gas-pressure monotube suspension technology that enhances stability and grip under heavy loads without lowering vehicle ride height.',
                'image_url' => 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'EXD-CL-001',
                'name' => 'Exedy Heavy-Duty Organic Sport Clutch & Flywheel Kit',
                'category' => 'parts',
                'unit' => 'kit',
                'stock_quantity' => 12,
                'selling_price' => 34500,
                'description' => 'Premium friction material providing 30% higher torque capacity with smooth pedal effort for daily and spirited driving.',
                'image_url' => 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'MTL-OIL-300V',
                'name' => 'Motul 300V Power 5W-40 Synthetic Racing Engine Oil (5L)',
                'category' => 'parts',
                'unit' => 'can',
                'stock_quantity' => 38,
                'selling_price' => 6900,
                'description' => 'Ester Core technology formulated for motorsport engines operating over a wide range of RPM and high oil temperatures.',
                'image_url' => 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
            ],

            // --- CATEGORY: STYLING ---
            [
                'sku' => 'VST-SP-001',
                'name' => 'Vorsteiner Aero Grade Carbon Fiber Rear GT Wing Spoiler',
                'category' => 'styling',
                'unit' => 'piece',
                'stock_quantity' => 7,
                'selling_price' => 28500,
                'description' => 'Pre-preg autoclave carbon fiber wing with clear UV-resistant lacquer finish. Delivers functional high-speed downforce and aggressive styling.',
                'image_url' => 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'BBS-WHL-19',
                'name' => 'BBS Super RS 19-Inch Custom Forged Alloy Wheel Set (Set of 4)',
                'category' => 'styling',
                'unit' => 'set',
                'stock_quantity' => 4,
                'selling_price' => 135000,
                'description' => 'Two-piece forged construction with polished stepped rim and iconic cross-spoke pattern for unrivaled stance and lightness.',
                'image_url' => 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'LED-HL-002',
                'name' => 'Dynamic Sequential Matrix Bi-LED Smoked Headlight Assembly',
                'category' => 'styling',
                'unit' => 'pair',
                'stock_quantity' => 9,
                'selling_price' => 44000,
                'description' => 'Plug-and-play full LED headlights with sweeping amber sequential turn signals and laser-sharp projector light cutoff.',
                'image_url' => 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'AKR-EXT-002',
                'name' => 'Akrapovič Dual Matte Carbon Fiber Exhaust Tips (Pair)',
                'category' => 'styling',
                'unit' => 'pair',
                'stock_quantity' => 15,
                'selling_price' => 21000,
                'description' => 'High-grade titanium core with outer matte carbon fiber shroud and laser-engraved Akrapovič emblem.',
                'image_url' => 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'SPL-LIP-001',
                'name' => 'Aerodynamic Front Bumper Lip Splitter in Gloss Carbon',
                'category' => 'styling',
                'unit' => 'piece',
                'stock_quantity' => 11,
                'selling_price' => 22500,
                'description' => 'Precision vacuum-infused composite lip that reduces aerodynamic lift and lends a lowered, aggressive road presence.',
                'image_url' => 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => '3M-TINT-IR',
                'name' => '3M Ceramic IR Series Deep Dark Solar UV Window Film (Roll)',
                'category' => 'styling',
                'unit' => 'roll',
                'stock_quantity' => 20,
                'selling_price' => 12900,
                'description' => 'Advanced non-metallized ceramic technology blocking up to 99% of UV rays and rejecting 95% of infrared heat.',
                'image_url' => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'ALC-TRM-001',
                'name' => 'Handcrafted Alcantara & Carbon Interior Trim Package',
                'category' => 'styling',
                'unit' => 'kit',
                'stock_quantity' => 14,
                'selling_price' => 17500,
                'description' => 'Italian Alcantara wrapped dashboard inserts, console trim, and shift boot with contrasting double yellow stitching.',
                'image_url' => 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=80',
            ],

            // --- CATEGORY: SPORTS_RACING ---
            [
                'sku' => 'SPC-ST-002',
                'name' => 'Sparco Circuit II QRT FIA-Certified Bucket Racing Seat',
                'category' => 'sports_racing',
                'unit' => 'piece',
                'stock_quantity' => 5,
                'selling_price' => 44000,
                'description' => 'Ultra-lightweight fiberglass composite shell with integrated head restraint protection and non-slip fabric in high-wear zones.',
                'image_url' => 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'OMP-STR-320',
                'name' => 'OMP Superquadro 320mm Flat-Bottom Racing Suede Steering Wheel',
                'category' => 'sports_racing',
                'unit' => 'piece',
                'stock_quantity' => 8,
                'selling_price' => 24800,
                'description' => 'Ergonomic 3-spoke competition wheel trimmed in black suede leather with yellow centering stripe and horn button.',
                'image_url' => 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'SBL-HRN-006',
                'name' => 'Sabelt Formula 6-Point Lightweight FIA Quick-Release Harness',
                'category' => 'sports_racing',
                'unit' => 'set',
                'stock_quantity' => 10,
                'selling_price' => 19200,
                'description' => '2-inch polyester webbing with aluminum alloy rotary cam-lock buckle homologated to FIA 8853-2016 competition standards.',
                'image_url' => 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'CSC-RC-006',
                'name' => 'Cusco 6-Point Chromoly FIA Bolt-In Safety Roll Cage Kit',
                'category' => 'sports_racing',
                'unit' => 'kit',
                'stock_quantity' => 3,
                'selling_price' => 78000,
                'description' => 'Lightweight 40mm seamless chromoly tubing engineered for maximum chassis torsional rigidity and driver rollover protection.',
                'image_url' => 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'NOS-EFI-150',
                'name' => 'NOS Nitrous Oxide EFI Wet Injector System Kit (75-150 HP)',
                'category' => 'sports_racing',
                'unit' => 'kit',
                'stock_quantity' => 4,
                'selling_price' => 69500,
                'description' => 'Complete direct-port wet nitrous system with 10 lb blue anodized aluminum bottle, microswitch activation, and fuel pressure safety cut-off.',
                'image_url' => 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'WLD-BBK-006',
                'name' => 'Wilwood Forged Superlite 6-Piston Big Brake Competition Kit',
                'category' => 'sports_racing',
                'unit' => 'kit',
                'stock_quantity' => 3,
                'selling_price' => 120000,
                'description' => 'Massive 355mm directional curved-vane slotted rotors with forged aluminum radial-mount 6-piston calipers and stainless braided lines.',
                'image_url' => 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'MSH-RAD-002',
                'name' => 'Mishimoto Performance Dual-Pass Aluminum Racing Radiator',
                'category' => 'sports_racing',
                'unit' => 'unit',
                'stock_quantity' => 6,
                'selling_price' => 36000,
                'description' => '100% brazed aluminum 2-row core designed to maximize coolant surface area and lower engine temperatures by up to 25% under track duress.',
                'image_url' => 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'sku' => 'HKS-EXH-T01',
                'name' => 'HKS Hi-Power Spec-L Lightweight Titanium Track Exhaust System',
                'category' => 'sports_racing',
                'unit' => 'system',
                'stock_quantity' => 4,
                'selling_price' => 92000,
                'description' => 'Ultra-thin wall Japanese titanium construction weighing 50% less than OEM with straight-through acoustics for uninhibited exhaust velocity.',
                'image_url' => 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
            ],
        ];

        foreach ($catalogParts as $pData) {
            $part = Part::updateOrCreate(
                ['sku' => $pData['sku']],
                [
                    'name' => $pData['name'],
                    'category' => $pData['category'],
                    'unit' => $pData['unit'],
                    'stock_quantity' => $pData['stock_quantity'],
                    'selling_price' => $pData['selling_price'],
                    'description' => $pData['description'],
                    'image_url' => $pData['image_url'],
                ]
            );

            // Connect inventory in warehouse
            $targetWarehouse = match ($pData['category']) {
                'sports_racing' => $bangaloreWarehouse,
                'styling' => $mumbaiWarehouse,
                default => $mainWarehouse,
            };

            $inv = Inventory::updateOrCreate(
                [
                    'warehouse_id' => $targetWarehouse->id,
                    'part_id' => $part->id,
                ],
                [
                    'quantity' => $pData['stock_quantity'],
                    'reserved_quantity' => 0,
                    'minimum_quantity' => 5,
                ]
            );

            InventoryTransaction::updateOrCreate(
                [
                    'warehouse_id' => $targetWarehouse->id,
                    'part_id' => $part->id,
                    'reference' => 'STOCK-' . $part->sku,
                ],
                [
                    'type' => 'stock_in',
                    'quantity' => $inv->quantity,
                    'notes' => 'Storefront demo inventory setup.',
                ]
            );
        }

        // 5. Low-stock / Sold-out item to demonstrate warehouse alert notification!
        $soldOutPart = Part::updateOrCreate(
            ['sku' => 'BRM-CCB-ROT'],
            [
                'name' => 'Brembo Carbon-Ceramic Matrix Brake Disc Rotors (Pair)',
                'category' => 'sports_racing',
                'unit' => 'pair',
                'stock_quantity' => 0,
                'selling_price' => 240000,
                'description' => 'High-performance carbon-ceramic brake discs for GT competition cars. Currently sold out.',
                'image_url' => 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
            ]
        );

        Inventory::updateOrCreate(
            [
                'warehouse_id' => $mainWarehouse->id,
                'part_id' => $soldOutPart->id,
            ],
            [
                'quantity' => 0,
                'reserved_quantity' => 0,
                'minimum_quantity' => 2,
            ]
        );

        InventoryAlert::updateOrCreate(
            [
                'part_id' => $soldOutPart->id,
                'category' => 'sports_racing',
            ],
            [
                'message' => 'Brembo Carbon-Ceramic Matrix Brake Disc Rotors sold out in sports racing.',
                'created_at' => now()->subHours(2),
            ]
        );

        // 6. Seed sample user orders for test customer
        $customer = User::where('is_admin', false)->first() ?? User::factory()->create([
            'name' => 'Rakesh Jella',
            'email' => 'customer@example.com',
            'is_admin' => false,
        ]);

        StoreOrder::updateOrCreate(
            ['reference' => 'ORD-CARSALE-101'],
            [
                'user_id' => $customer->id,
                'product_type' => 'vehicle',
                'product_id' => 1,
                'product_name' => 'Toyota Land Cruiser 300 ZX',
                'category' => 'cars',
                'order_type' => 'booking',
                'quantity' => 1,
                'rental_days' => null,
                'unit_price' => 21000000,
                'total_amount' => 21000000,
                'advance_amount' => 50000,
                'status' => 'advance_pending',
                'created_at' => now()->subDays(1),
            ]
        );

        StoreOrder::updateOrCreate(
            ['reference' => 'ORD-RENTAL-202'],
            [
                'user_id' => $customer->id,
                'product_type' => 'vehicle',
                'product_id' => 2,
                'product_name' => 'Mercedes-Benz E-Class Exclusive LWB',
                'category' => 'cars',
                'order_type' => 'rental_booking',
                'quantity' => 1,
                'rental_days' => 3,
                'unit_price' => 14500,
                'total_amount' => 43500,
                'advance_amount' => 43500,
                'status' => 'advance_pending',
                'created_at' => now()->subDays(2),
            ]
        );

        StoreOrder::updateOrCreate(
            ['reference' => 'ORD-PARTS-303'],
            [
                'user_id' => $customer->id,
                'product_type' => 'part',
                'product_id' => 1,
                'product_name' => 'Vorsteiner Aero Grade Carbon Fiber Rear GT Wing Spoiler',
                'category' => 'styling',
                'order_type' => 'purchase',
                'quantity' => 1,
                'rental_days' => null,
                'unit_price' => 28500,
                'total_amount' => 28500,
                'advance_amount' => 0,
                'status' => 'payment_pending',
                'created_at' => now()->subHours(6),
            ]
        );
    }
}

