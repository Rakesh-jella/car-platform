import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useMemo } from 'react';

type Statistics = {
    vehicles: number;
    ready_for_sale: number;
    in_transit: number;
    imported_vehicles: number;
    manufactured_vehicles: number;
    import_requests: number;
    pending_import_requests: number;
    warehouses: number;
    inventory_items: number;
    low_stock_items: number;
    manufacturing_orders: number;
    vehicle_sales_value: number;
};

type ImportRequest = {
    reference: string | null;
    customer: string;
    vehicle: string;
    country: string;
    status: string;
    created_at: string;
};

type Vehicle = {
    reference: string;
    name: string;
    source: string;
    status: string;
    price: number;
};

type LowStockItem = {
    part_name: string;
    sku: string;
    available: number;
    minimum: number;
};

type DashboardProps = {
    statistics: Statistics;
    lowStockItems: LowStockItem[];
    recentImportRequests: ImportRequest[];
    recentVehicles: Vehicle[];
};

type ShowcaseCar = {
    id: string;
    name: string;
    subtitle: string;
    rating: string;
    ratingCount: string;
    location: string;
    pricePerDay: string;
    transmission: string;
    range: string;
    tier: string;
    seats: string;
    brand: string;
    image: string;
};

const INITIAL_CARS: ShowcaseCar[] = [
    {
        id: 'bmw-3-series',
        name: 'BMW 3 Series Sedan',
        subtitle: 'The 3 Sedan',
        rating: '4.9',
        ratingCount: '100+',
        location: 'Jl Kendalsari V, Malang',
        pricePerDay: '87.44',
        transmission: 'Automatic',
        range: '250km',
        tier: 'Premium',
        seats: '4 Seat',
        brand: 'BMW',
        image: 'https://pngimg.com/d/bmw_PNG1710.png',
    },
    {
        id: 'mercedes-c-class',
        name: 'Mercedes-Benz C-Class',
        subtitle: 'The 3 Sedan',
        rating: '4.9',
        ratingCount: '100',
        location: 'Malang, East Java',
        pricePerDay: '60.20',
        transmission: 'Automatic',
        range: '250km',
        tier: 'Premium',
        seats: '4 Seat',
        brand: 'Mercedes',
        image: 'https://pngimg.com/d/mercedes_PNG80135.png',
    },
    {
        id: 'audi-q5-suv',
        name: 'Audi Q5 SUV',
        subtitle: 'The 3 Sedan',
        rating: '4.9',
        ratingCount: '100',
        location: 'Jl Merdeka Raya No. 21, Malang',
        pricePerDay: '97.82',
        transmission: 'Automatic',
        range: '250km',
        tier: 'Premium',
        seats: '4 Seat',
        brand: 'Audi A4',
        image: 'https://pngimg.com/d/audi_PNG1736.png',
    },
    {
        id: 'toyota-camry',
        name: 'Toyota Camry Sedan',
        subtitle: 'The 3 Sedan',
        rating: '4.9',
        ratingCount: '100',
        location: 'Central Malang, East Java',
        pricePerDay: '120.70',
        transmission: 'Automatic',
        range: '250km',
        tier: 'Premium',
        seats: '4 Seat',
        brand: 'Toyota',
        image: 'https://pngimg.com/d/toyota_PNG1912.png',
    },
];

const BRANDS = ['BMW', 'Honda', 'Toyota', 'Mazda', 'Nissan', 'Audi A4', 'Mercedes'];

const HISTOGRAM_BARS = [
    14, 18, 22, 28, 34, 30, 26, 22, 18, 22, 28, 36, 46, 56, 68, 76, 84, 92,
    88, 76, 64, 52, 42, 34, 28, 22, 16, 12, 10
];

export default function MotiveDashboard({
    statistics,
}: DashboardProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedBookingCar, setSelectedBookingCar] = useState<ShowcaseCar | null>(null);

    // Form states
    const [pickupLoc, setPickupLoc] = useState('');
    const [dropoffLoc, setDropoffLoc] = useState('');
    const [pickupDate, setPickupDate] = useState('19/01/2025');
    const [pickupTime, setPickupTime] = useState('07:00 AM');
    const [dropoffDate, setDropoffDate] = useState('19/01/2025');
    const [dropoffTime, setDropoffTime] = useState('07:00 AM');

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedBrand(null);
    };

    const filteredCars = useMemo(() => {
        return INITIAL_CARS.filter((car) => {
            const matchesSearch =
                !searchQuery.trim() ||
                car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                car.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesBrand =
                !selectedBrand || car.brand.toLowerCase() === selectedBrand.toLowerCase();
            return matchesSearch && matchesBrand;
        });
    }, [searchQuery, selectedBrand]);

    return (
        <AdminLayout hideDefaultTitle={true}>
            <Head title="Motive - All In One Car Platform" />

            <div className="space-y-8 w-full max-w-[1720px] mx-auto">
                {/* HERO BOOKING & SEARCH CARD */}
                <section className="rounded-3xl bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col xl:flex-row items-center justify-between gap-10 transition-colors">
                    
                    {/* Left Banner Section */}
                    <div className="flex-1 max-w-xl">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                            All In One Car Platform
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-slate-400 font-medium">
                            Renting a car gives your freedom, and we&apos;ll help you
                        </p>

                        {/* 3 Sports Cars Graphic */}
                        <div className="mt-8 flex items-center justify-start gap-1 relative overflow-visible h-32 sm:h-40">
                            {/* Red Car (Left) */}
                            <div className="w-32 sm:w-44 -mr-10 z-10 transition-transform hover:scale-105 hover:z-30 duration-200">
                                <img
                                    src="https://pngimg.com/d/audi_PNG1736.png"
                                    alt="Red car"
                                    className="w-full object-contain filter drop-shadow-md"
                                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                />
                            </div>

                            {/* Blue Car (Center - Primary) */}
                            <div className="w-44 sm:w-56 z-20 transition-transform hover:scale-110 duration-200">
                                <img
                                    src="https://pngimg.com/d/bmw_PNG1710.png"
                                    alt="Blue car"
                                    className="w-full object-contain filter drop-shadow-xl"
                                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                />
                            </div>

                            {/* White / Metallic Car (Right) */}
                            <div className="w-32 sm:w-44 -ml-10 z-10 transition-transform hover:scale-105 hover:z-30 duration-200">
                                <img
                                    src="https://pngimg.com/d/mercedes_PNG80135.png"
                                    alt="White car"
                                    className="w-full object-contain filter drop-shadow-md"
                                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Pick-up & Drop-off Location + DateTime Form */}
                    <div className="w-full xl:w-[680px] grid sm:grid-cols-2 gap-6 shrink-0">
                        {/* Column 1: Pick-up */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                                    Pick-up Location
                                </label>
                                <div className="relative">
                                    <svg className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="3" />
                                        <circle cx="12" cy="12" r="8" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={pickupLoc}
                                        onChange={(e) => setPickupLoc(e.target.value)}
                                        placeholder="Enter City, Airport, or Address"
                                        className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-gray-400 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                                        Pick-up Date
                                    </label>
                                    <div className="relative">
                                        <svg className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        <input
                                            type="text"
                                            value={pickupDate}
                                            onChange={(e) => setPickupDate(e.target.value)}
                                            className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 pl-10 pr-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                                        Pick-up Time
                                    </label>
                                    <div className="relative">
                                        <svg className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        <input
                                            type="text"
                                            value={pickupTime}
                                            onChange={(e) => setPickupTime(e.target.value)}
                                            className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 pl-10 pr-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Drop-off */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                                    Drop-off Location
                                </label>
                                <div className="relative">
                                    <svg className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="3" />
                                        <circle cx="12" cy="12" r="8" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={dropoffLoc}
                                        onChange={(e) => setDropoffLoc(e.target.value)}
                                        placeholder="Enter City, Airport, or Address"
                                        className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-gray-400 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                                        Drop-off Date
                                    </label>
                                    <div className="relative">
                                        <svg className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        <input
                                            type="text"
                                            value={dropoffDate}
                                            onChange={(e) => setDropoffDate(e.target.value)}
                                            className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 pl-10 pr-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                                        Drop-off Time
                                    </label>
                                    <div className="relative">
                                        <svg className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        <input
                                            type="text"
                                            value={dropoffTime}
                                            onChange={(e) => setDropoffTime(e.target.value)}
                                            className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 pl-10 pr-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* MAIN SPLIT: FILTER PLANS (LEFT) + CAR GRID (RIGHT) */}
                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">
                    
                    {/* LEFT FILTER PLANS CARD */}
                    <aside className="rounded-3xl bg-white dark:bg-slate-900 p-7 shadow-sm border border-gray-100 dark:border-slate-800 space-y-7 transition-colors">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white">
                                Filter Plans
                            </h3>
                            <button
                                type="button"
                                onClick={handleResetFilters}
                                className="text-xs font-bold text-gray-400 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className="relative">
                            <svg className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="7" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-gray-400 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                            />
                        </div>

                        {/* Price & Budget Histogram Section */}
                        <div>
                            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                                Price &amp; Budget
                            </h4>
                            <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">
                                Average range $34
                            </p>

                            {/* Histogram Graphic with Highlighted Orange Selection */}
                            <div className="mt-5 pt-2">
                                <div className="flex items-end justify-between h-20 gap-[3px] px-1 relative">
                                    {/* Left orange boundary line */}
                                    <div className="absolute left-[38%] top-0 bottom-0 w-[2px] bg-[#ffa31a] z-10" />
                                    {/* Right orange boundary line */}
                                    <div className="absolute left-[68%] top-0 bottom-0 w-[2px] bg-[#ffa31a] z-10" />

                                    {HISTOGRAM_BARS.map((height, idx) => {
                                        const isHighlighted = idx >= 11 && idx <= 20;
                                        return (
                                            <div
                                                key={idx}
                                                style={{ height: `${height}%` }}
                                                className={`w-full rounded-t-sm transition-all duration-150 ${
                                                    isHighlighted
                                                        ? 'bg-[#ffa31a]'
                                                        : 'bg-gray-200 dark:bg-slate-800'
                                                }`}
                                            />
                                        );
                                    })}
                                </div>

                                {/* Scale marks */}
                                <div className="flex justify-between text-xs text-gray-400 dark:text-slate-500 font-semibold mt-2.5 px-1">
                                    <span>0</span>
                                    <span>20</span>
                                    <span>40</span>
                                    <span>60</span>
                                    <span>80</span>
                                    <span>100</span>
                                </div>
                            </div>

                            {/* Two Price Input / Readout Cards */}
                            <div className="grid grid-cols-2 gap-3.5 mt-5">
                                <div className="rounded-2xl border border-gray-200/80 dark:border-slate-800 bg-[#f8f9fa] dark:bg-slate-800/60 p-3.5">
                                    <p className="text-xs font-semibold text-gray-400 dark:text-slate-400">Main Price</p>
                                    <p className="text-base font-black text-slate-900 dark:text-white mt-1">$120</p>
                                </div>
                                <div className="rounded-2xl border border-gray-200/80 dark:border-slate-800 bg-[#f8f9fa] dark:bg-slate-800/60 p-3.5">
                                    <p className="text-xs font-semibold text-gray-400 dark:text-slate-400">Max price</p>
                                    <p className="text-base font-black text-slate-900 dark:text-white mt-1">$420</p>
                                </div>
                            </div>
                        </div>

                        {/* Brand & Model Pills */}
                        <div>
                            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                                Brand &amp; Model
                            </h4>
                            <p className="text-xs text-gray-400 dark:text-slate-400 mt-1 mb-3.5">
                                Brand
                            </p>

                            <div className="flex flex-wrap gap-2.5">
                                {BRANDS.map((brand) => {
                                    const isActive = selectedBrand === brand;
                                    return (
                                        <button
                                            key={brand}
                                            type="button"
                                            onClick={() =>
                                                setSelectedBrand(isActive ? null : brand)
                                            }
                                            className={`rounded-xl px-3.5 py-2 text-xs font-bold border transition ${
                                                isActive
                                                    ? 'bg-[#ffa31a] text-white border-[#ffa31a] shadow-sm'
                                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-gray-200 dark:border-slate-700 hover:border-gray-400'
                                            }`}
                                        >
                                            {brand}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Operational ERP Quick Glance */}
                        <div className="border-t border-gray-100 dark:border-slate-800 pt-5">
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
                                <span>Active Showroom Fleet</span>
                                <span className="font-extrabold text-slate-900 dark:text-white">{statistics.vehicles} units</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 mt-2">
                                <span>Pending Import Inquiries</span>
                                <span className="font-extrabold text-[#ffa31a]">{statistics.pending_import_requests}</span>
                            </div>
                            <Link
                                href="/cars"
                                className="mt-4 block text-center rounded-2xl bg-gray-100 dark:bg-slate-800 py-3 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
                            >
                                View Full ERP Inventory →
                            </Link>
                        </div>
                    </aside>

                    {/* RIGHT CAR GRID (2x2 BIGGER CAR CARDS) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredCars.map((car) => (
                            <article
                                key={car.id}
                                className="rounded-3xl bg-white dark:bg-slate-900 p-6 lg:p-7 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div>
                                    {/* Header: Name + Rating */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
                                                {car.name}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-400 dark:text-slate-400 font-medium mt-1">
                                                {car.subtitle}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-1 shrink-0 text-xs font-black text-slate-800 dark:text-slate-200">
                                            <span className="text-[#ffa31a] text-sm">★</span>
                                            <span>{car.rating}</span>
                                            <span className="text-gray-400 dark:text-slate-500 font-normal">({car.ratingCount})</span>
                                        </div>
                                    </div>

                                    {/* Vehicle Image Rendering with shadow */}
                                    <div className="my-6 flex items-center justify-center h-44 relative">
                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-transform hover:scale-105 duration-300"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src =
                                                    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=500&q=80';
                                            }}
                                        />
                                    </div>

                                    {/* Location & Daily Rate */}
                                    <div className="flex items-center justify-between gap-2 border-t border-gray-100 dark:border-slate-800 pt-4">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-400 truncate">
                                            <svg className="h-4 w-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            <span className="truncate">{car.location}</span>
                                        </div>

                                        <div className="text-right shrink-0">
                                            <span className="text-lg font-black text-slate-900 dark:text-white">
                                                ${car.pricePerDay}
                                            </span>
                                            <span className="text-xs text-gray-400 dark:text-slate-400 font-medium">
                                                /Day
                                            </span>
                                        </div>
                                    </div>

                                    {/* Specifications Row */}
                                    <div className="mt-4 flex items-center justify-between text-xs text-gray-600 dark:text-slate-300 bg-[#f8f9fa] dark:bg-slate-800/60 rounded-2xl px-3.5 py-2.5">
                                        <span className="flex items-center gap-1 font-medium">
                                            <svg className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                            {car.transmission}
                                        </span>

                                        <span className="flex items-center gap-1 font-medium">
                                            <svg className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                            </svg>
                                            {car.range}
                                        </span>

                                        <span className="flex items-center gap-1 font-medium">
                                            <svg className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                            </svg>
                                            {car.tier}
                                        </span>

                                        <span className="flex items-center gap-1 font-medium">
                                            <svg className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                            {car.seats}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Button: Rent Now */}
                                <div className="mt-5">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedBookingCar(car)}
                                        className="w-full rounded-2xl bg-[#1e1e1e] hover:bg-black dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300 text-white text-xs sm:text-sm font-bold py-3.5 transition shadow-sm hover:shadow"
                                    >
                                        Rent Now
                                    </button>
                                </div>
                            </article>
                        ))}

                        {filteredCars.length === 0 && (
                            <div className="col-span-full rounded-3xl bg-white dark:bg-slate-900 p-12 text-center text-gray-400 border border-gray-100 dark:border-slate-800">
                                <p className="text-lg font-bold text-slate-700 dark:text-slate-200">No cars found matching filters.</p>
                                <button
                                    type="button"
                                    onClick={handleResetFilters}
                                    className="mt-4 inline-flex items-center rounded-2xl bg-[#ffa31a] px-5 py-2.5 text-xs font-bold text-white shadow-sm"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* BOOKING CONFIRMATION MODAL */}
            {selectedBookingCar && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 p-7 shadow-2xl border border-gray-100 dark:border-slate-800 space-y-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-[#ffa31a]">
                                    Instant Booking Reservation
                                </span>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                                    {selectedBookingCar.name}
                                </h3>
                                <p className="text-xs text-gray-400 dark:text-slate-400">{selectedBookingCar.location}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedBookingCar(null)}
                                className="h-9 w-9 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="h-40 flex items-center justify-center bg-[#f8f9fa] dark:bg-slate-800/60 rounded-2xl p-3">
                            <img
                                src={selectedBookingCar.image}
                                alt={selectedBookingCar.name}
                                className="max-h-full max-w-full object-contain filter drop-shadow-xl"
                            />
                        </div>

                        <div className="rounded-2xl bg-gray-50 dark:bg-slate-800/80 p-4 space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                            <div className="flex justify-between">
                                <span className="text-gray-400 dark:text-slate-400">Daily Rental:</span>
                                <span className="font-bold text-slate-900 dark:text-white">${selectedBookingCar.pricePerDay}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 dark:text-slate-400">Pick-up Date:</span>
                                <span className="font-semibold">{pickupDate} ({pickupTime})</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 dark:text-slate-400">Transmission &amp; Range:</span>
                                <span className="font-semibold">{selectedBookingCar.transmission} • {selectedBookingCar.range}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setSelectedBookingCar(null)}
                                className="flex-1 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    alert(`Reservation confirmed for ${selectedBookingCar.name}!`);
                                    setSelectedBookingCar(null);
                                }}
                                className="flex-1 rounded-2xl bg-[#ffa31a] py-3.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-amber-500/25 hover:bg-[#ff9400]"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}