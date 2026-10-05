import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';

type ImportPageProps = {
    success?: string;
};

type CarColor = {
    name: string;
    hex: string;
    isWhite?: boolean;
    isBlack?: boolean;
    isGrey?: boolean;
};

type VehicleModelConfig = {
    id: string;
    name: string;
    bodyType: string;
    defaultYear: number;
    defaultFuel: string;
    defaultTransmission: string;
    estTransitDays: string;
    baseImage: string;
    colors: CarColor[];
};

type BrandConfig = {
    brand: string;
    models: VehicleModelConfig[];
};

const VEHICLE_CATALOG: BrandConfig[] = [
    {
        brand: 'BMW',
        models: [
            {
                id: 'bmw-3-series',
                name: '3 Series Sedan (M Sport)',
                bodyType: 'Luxury Sports Sedan',
                defaultYear: 2024,
                defaultFuel: 'Petrol / Hybrid',
                defaultTransmission: 'Automatic',
                estTransitDays: '14-21 Days',
                baseImage: 'https://pngimg.com/d/bmw_PNG99557.png',
                colors: [
                    { name: 'Alpine White (Solid)', hex: '#FFFFFF', isWhite: true },
                    { name: 'Black Sapphire Metallic', hex: '#111827', isBlack: true },
                    { name: 'Portimao Blue Metallic', hex: '#1D4ED8' },
                    { name: 'Melbourne Red Metallic', hex: '#DC2626' },
                    { name: 'Brooklyn Grey Metallic', hex: '#94A3B8', isGrey: true },
                    { name: 'Isle of Man Green Metallic', hex: '#047857' },
                    { name: 'Sunset Orange Metallic', hex: '#EA580C' },
                ],
            },
            {
                id: 'bmw-5-series',
                name: '5 Series Executive Sedan',
                bodyType: 'Executive Luxury Sedan',
                defaultYear: 2024,
                defaultFuel: 'Plug-in Hybrid',
                defaultTransmission: 'Automatic',
                estTransitDays: '16-24 Days',
                baseImage: 'https://pngimg.com/d/bmw_PNG99557.png',
                colors: [
                    { name: 'Mineral White Pearl', hex: '#F8FAFC', isWhite: true },
                    { name: 'Carbon Black Metallic', hex: '#09090B', isBlack: true },
                    { name: 'Phytonic Blue Metallic', hex: '#2563EB' },
                    { name: 'Oxide Grey Metallic', hex: '#64748B', isGrey: true },
                    { name: 'Cape York Green', hex: '#0F766E' },
                    { name: 'Fire Red Metallic', hex: '#B91C1C' },
                ],
            },
            {
                id: 'bmw-x5',
                name: 'X5 xDrive40i Luxury SUV',
                bodyType: 'Mid-Size Luxury SUV',
                defaultYear: 2024,
                defaultFuel: 'Petrol Turbo',
                defaultTransmission: 'Automatic',
                estTransitDays: '18-28 Days',
                baseImage: 'https://pngimg.com/d/bmw_PNG1702.png',
                colors: [
                    { name: 'Alpine White', hex: '#FFFFFF', isWhite: true },
                    { name: 'Black Sapphire', hex: '#18181B', isBlack: true },
                    { name: 'Tanzanite Blue II Metallic', hex: '#1E3A8A' },
                    { name: 'Dravit Grey Metallic', hex: '#475569', isGrey: true },
                    { name: 'Manhattan Green Metallic', hex: '#166534' },
                    { name: 'Ametrine Metallic Red', hex: '#831843' },
                ],
            },
        ],
    },
    {
        brand: 'Mercedes-Benz',
        models: [
            {
                id: 'merc-c-class',
                name: 'C-Class AMG Line',
                bodyType: 'Compact Executive Sedan',
                defaultYear: 2024,
                defaultFuel: 'Mild Hybrid',
                defaultTransmission: 'Automatic',
                estTransitDays: '14-20 Days',
                baseImage: 'https://pngimg.com/d/mercedes_PNG80135.png',
                colors: [
                    { name: 'Polar White (Solid)', hex: '#FFFFFF', isWhite: true },
                    { name: 'Obsidian Black Metallic', hex: '#111827', isBlack: true },
                    { name: 'Sodalite Blue Metallic', hex: '#1D4ED8' },
                    { name: 'Patagonia Red Bright', hex: '#DC2626' },
                    { name: 'Selenite Grey Metallic', hex: '#6B7280', isGrey: true },
                    { name: 'Spectral Blue Metallic', hex: '#0284C7' },
                    { name: 'Emerald Green Metallic', hex: '#064E3B' },
                ],
            },
            {
                id: 'merc-e-class',
                name: 'E-Class Exclusive Sedan',
                bodyType: 'Executive Luxury Sedan',
                defaultYear: 2024,
                defaultFuel: 'Diesel / Hybrid',
                defaultTransmission: 'Automatic',
                estTransitDays: '16-24 Days',
                baseImage: 'https://pngimg.com/d/mercedes_PNG1861.png',
                colors: [
                    { name: 'Diamond White Bright', hex: '#F8FAFC', isWhite: true },
                    { name: 'Onyx Black', hex: '#0F172A', isBlack: true },
                    { name: 'Nautical Blue Metallic', hex: '#1E40AF' },
                    { name: 'Mojave Silver Metallic', hex: '#CBD5E1', isGrey: true },
                    { name: 'Verde Silver Green', hex: '#15803D' },
                    { name: 'Cardinal Red Metallic', hex: '#991B1B' },
                ],
            },
            {
                id: 'merc-g-wagon',
                name: 'G 63 AMG Luxury Off-Roader',
                bodyType: 'Luxury 4x4 Heavy SUV',
                defaultYear: 2024,
                defaultFuel: 'Petrol V8 Bi-Turbo',
                defaultTransmission: 'Automatic',
                estTransitDays: '20-30 Days',
                baseImage: 'https://pngimg.com/d/mercedes_PNG1880.png',
                colors: [
                    { name: 'G Manufaktur Diamond White', hex: '#FFFFFF', isWhite: true },
                    { name: 'Obsidian Black Metallic', hex: '#18181B', isBlack: true },
                    { name: 'Desert Sand Khaki', hex: '#D97706' },
                    { name: 'South Seas Blue', hex: '#0284C7' },
                    { name: 'Monza Grey Magno (Matte)', hex: '#4B5563', isGrey: true },
                    { name: 'Olive Green Metallic', hex: '#3F6212' },
                    { name: 'Jupiter Red', hex: '#DC2626' },
                ],
            },
        ],
    },
    {
        brand: 'Audi',
        models: [
            {
                id: 'audi-a4',
                name: 'A4 Sedan S-Line',
                bodyType: 'Premium Sedan',
                defaultYear: 2024,
                defaultFuel: 'TFSI Petrol',
                defaultTransmission: 'Automatic',
                estTransitDays: '14-22 Days',
                baseImage: 'https://pngimg.com/d/audi_PNG1736.png',
                colors: [
                    { name: 'Ibis White (Solid)', hex: '#FFFFFF', isWhite: true },
                    { name: 'Mythos Black Metallic', hex: '#18181B', isBlack: true },
                    { name: 'Navarra Blue Metallic', hex: '#1E40AF' },
                    { name: 'Tango Red Metallic', hex: '#DC2626' },
                    { name: 'Daytona Grey Pearl', hex: '#64748B', isGrey: true },
                    { name: 'District Green Metallic', hex: '#15803D' },
                    { name: 'Turbo Blue', hex: '#0284C7' },
                ],
            },
            {
                id: 'audi-q5',
                name: 'Q5 Quattro SUV',
                bodyType: 'Mid-Size Premium SUV',
                defaultYear: 2024,
                defaultFuel: 'TDI Diesel / Hybrid',
                defaultTransmission: 'Automatic',
                estTransitDays: '16-24 Days',
                baseImage: 'https://pngimg.com/d/audi_PNG7204.png',
                colors: [
                    { name: 'Glacier White Metallic', hex: '#F1F5F9', isWhite: true },
                    { name: 'Brilliant Black', hex: '#0F172A', isBlack: true },
                    { name: 'Ultra Blue Metallic', hex: '#2563EB' },
                    { name: 'Matador Red Metallic', hex: '#991B1B' },
                    { name: 'Chronos Grey Metallic', hex: '#94A3B8', isGrey: true },
                    { name: 'District Green', hex: '#166534' },
                ],
            },
        ],
    },
    {
        brand: 'Toyota',
        models: [
            {
                id: 'toyota-camry',
                name: 'Camry Hybrid Sedan',
                bodyType: 'Mid-Size Sedan',
                defaultYear: 2024,
                defaultFuel: 'Dual Hybrid',
                defaultTransmission: 'Automatic',
                estTransitDays: '12-18 Days',
                baseImage: 'https://pngimg.com/d/toyota_PNG1912.png',
                colors: [
                    { name: 'Ice Edge White', hex: '#FFFFFF', isWhite: true },
                    { name: 'Midnight Black Metallic', hex: '#18181B', isBlack: true },
                    { name: 'Reservoir Blue', hex: '#1D4ED8' },
                    { name: 'Supersonic Red', hex: '#DC2626' },
                    { name: 'Celestial Silver Metallic', hex: '#94A3B8', isGrey: true },
                    { name: 'Underground Slate Grey', hex: '#475569', isGrey: true },
                ],
            },
            {
                id: 'toyota-landcruiser',
                name: 'Land Cruiser 300 VXR',
                bodyType: 'Full-Size 4WD SUV',
                defaultYear: 2024,
                defaultFuel: 'Diesel V6 Twin-Turbo',
                defaultTransmission: 'Automatic',
                estTransitDays: '20-30 Days',
                baseImage: 'https://pngimg.com/d/toyota_PNG1949.png',
                colors: [
                    { name: 'Precious White Pearl', hex: '#F8FAFC', isWhite: true },
                    { name: 'Attitude Black', hex: '#09090B', isBlack: true },
                    { name: 'Dark Red Mica Metallic', hex: '#991B1B' },
                    { name: 'Avant-Garde Bronze Metallic', hex: '#78350F' },
                    { name: 'Silver Metallic', hex: '#CBD5E1', isGrey: true },
                    { name: 'Deep Sea Blue', hex: '#1E3A8A' },
                ],
            },
        ],
    },
];

const STEPS = [
    { num: '01', title: 'Vehicle Selection', desc: 'Select model & preferred paint finish' },
    { num: '02', title: 'Source & Quote', desc: 'Global dealer sourcing & duty calculation' },
    { num: '03', title: 'Shipping & Transit', desc: 'Insured sea freight & bill of lading' },
    { num: '04', title: 'Customs & Delivery', desc: 'Port clearance & direct handover' },
];

export default function ImportPage({ success }: ImportPageProps) {
    const [selectedBrandName, setSelectedBrandName] = useState<string>('BMW');
    const [selectedModelId, setSelectedModelId] = useState<string>('bmw-3-series');
    const [selectedColor, setSelectedColor] = useState<CarColor>(
        VEHICLE_CATALOG[0].models[0].colors[0]
    );
    const [customHex, setCustomHex] = useState('#FFFFFF');

    const currentBrand = useMemo(() => {
        return VEHICLE_CATALOG.find((b) => b.brand === selectedBrandName) || VEHICLE_CATALOG[0];
    }, [selectedBrandName]);

    const currentModel = useMemo(() => {
        return (
            currentBrand.models.find((m) => m.id === selectedModelId) ||
            currentBrand.models[0]
        );
    }, [currentBrand, selectedModelId]);

    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: '',
        email: '',
        phone: '',
        country: '',
        vehicle_brand: 'BMW',
        vehicle_model: '3 Series Sedan (M Sport)',
        year: '2024',
        fuel_type: 'Petrol / Hybrid',
        transmission: 'Automatic',
        budget: '',
        notes: 'Selected Finish: Alpine White (Solid) (#FFFFFF)',
    });

    // Auto-update form when model changes
    useEffect(() => {
        if (currentModel) {
            const defaultWhite =
                currentModel.colors.find((c) => c.isWhite) || currentModel.colors[0];
            setSelectedColor(defaultWhite);
            setCustomHex(defaultWhite.hex);

            setData((prev) => ({
                ...prev,
                vehicle_brand: currentBrand.brand,
                vehicle_model: currentModel.name,
                year: String(currentModel.defaultYear),
                fuel_type: currentModel.defaultFuel,
                transmission: currentModel.defaultTransmission,
                notes: `Selected Finish: ${defaultWhite.name} (${defaultWhite.hex})`,
            }));
        }
    }, [currentModel, currentBrand]);

    const handleBrandSelect = (brandName: string) => {
        setSelectedBrandName(brandName);
        const brand = VEHICLE_CATALOG.find((b) => b.brand === brandName);
        if (brand && brand.models.length > 0) {
            setSelectedModelId(brand.models[0].id);
        }
    };

    const handleColorSelect = (color: CarColor) => {
        setSelectedColor(color);
        setCustomHex(color.hex);
        setData((prev) => ({
            ...prev,
            notes: `Selected Finish: ${color.name} (${color.hex})`,
        }));
    };

    const handleCustomHexChange = (hex: string) => {
        setCustomHex(hex);
        const customColor: CarColor = {
            name: `Custom Finish (${hex.toUpperCase()})`,
            hex: hex,
            isWhite: hex.toUpperCase() === '#FFFFFF',
            isBlack: hex.toUpperCase() === '#000000' || hex.toUpperCase() === '#111827',
        };
        setSelectedColor(customColor);
        setData((prev) => ({
            ...prev,
            notes: `Selected Finish: ${customColor.name}`,
        }));
    };

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post('/import/request', {
            onSuccess: () => reset(),
        });
    }

    // Determine visual behavior based on the chosen color
    const isWhiteMode = Boolean(
        selectedColor.isWhite ||
        selectedColor.hex.toUpperCase() === '#FFFFFF' ||
        selectedColor.hex.toUpperCase() === '#F8FAFC' ||
        selectedColor.hex.toUpperCase() === '#F1F5F9'
    );

    const isBlackMode = Boolean(
        selectedColor.isBlack ||
        selectedColor.hex.toUpperCase() === '#111827' ||
        selectedColor.hex.toUpperCase() === '#09090B' ||
        selectedColor.hex.toUpperCase() === '#18181B' ||
        selectedColor.hex.toUpperCase() === '#000000'
    );

    const isGreyMode = Boolean(selectedColor.isGrey);

    return (
        <>
            <Head title="Import Vehicle - Motive Platform" />

            <div className="min-h-screen bg-[#f4f5f8] dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 antialiased selection:bg-[#ffa31a] selection:text-white transition-colors duration-200">
                {/* Expansive Top Header */}
                <header className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800/80 sticky top-0 z-30 transition-colors">
                    <div className="mx-auto flex max-w-[1720px] items-center justify-between px-6 sm:px-12 py-5">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#ff9400] to-[#ffa826] font-black text-2xl text-white shadow-lg shadow-amber-500/25">
                                M
                            </div>
                            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                                MOTIVE <span className="text-[#ffa31a] text-xs font-bold uppercase tracking-widest ml-1 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">Import Portal</span>
                            </span>
                        </Link>

                        <div className="flex items-center gap-6">
                            <Link href="/" className="text-sm font-semibold text-gray-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                                ← Back to Home
                            </Link>
                            <Link
                                href="/admin"
                                className="rounded-2xl bg-[#ffa31a] hover:bg-[#ff9400] px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-md shadow-amber-500/20 transition"
                            >
                                Admin Dashboard
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-[1720px] px-6 sm:px-12 py-10 space-y-10">
                    
                    {/* Hero Title */}
                    <div className="max-w-3xl space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#ffa31a]">
                            Interactive Sourcing Studio
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                            Select Model &amp; Color Mode.
                        </h1>
                        <p className="text-base sm:text-lg text-gray-500 dark:text-slate-400 font-medium">
                            Choose your preferred vehicle and watch the car transform immediately into your selected paint finish—from pristine Alpine White to vibrant Metallics.
                        </p>
                    </div>

                    {/* Step Pipeline */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {STEPS.map((s) => (
                            <div
                                key={s.num}
                                className="rounded-2xl bg-white dark:bg-slate-900 p-5 border border-gray-100 dark:border-slate-800 shadow-sm"
                            >
                                <span className="text-xs font-black text-[#ffa31a]">{s.num}</span>
                                <h3 className="text-sm font-black text-slate-900 dark:text-white mt-1">{s.title}</h3>
                                <p className="text-xs text-gray-400 dark:text-slate-400 mt-1">{s.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Success Notice */}
                    {success && (
                        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-3">
                            <span className="text-xl">✓</span>
                            <span>{success}</span>
                        </div>
                    )}

                    {/* MAIN TWO-COLUMN WORKBENCH: VEHICLE COLOR SELECTOR & IMPORT FORM */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
                        
                        {/* LEFT COLUMN: INTERACTIVE VISUAL CAR & LIVE COLOR CHANGER */}
                        <div className="rounded-3xl bg-white dark:bg-slate-900 p-7 sm:p-9 border border-gray-100 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
                            
                            {/* Step 1: Brand Selection Pills */}
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 block mb-3">
                                    Step 1: Select Brand
                                </span>
                                <div className="flex flex-wrap gap-2.5">
                                    {VEHICLE_CATALOG.map((b) => {
                                        const isBrandActive = b.brand === selectedBrandName;
                                        return (
                                            <button
                                                key={b.brand}
                                                type="button"
                                                onClick={() => handleBrandSelect(b.brand)}
                                                className={`rounded-2xl px-5 py-2.5 text-xs sm:text-sm font-bold border transition duration-150 ${
                                                    isBrandActive
                                                        ? 'bg-[#ffa31a] text-white border-[#ffa31a] shadow-md shadow-amber-500/25 scale-105'
                                                        : 'bg-gray-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-gray-400'
                                                }`}
                                            >
                                                {b.brand}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Step 2: Model Selection Pills */}
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 block mb-3">
                                    Step 2: Select Model Series
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {currentBrand.models.map((m) => {
                                        const isModelActive = m.id === selectedModelId;
                                        return (
                                            <button
                                                key={m.id}
                                                type="button"
                                                onClick={() => setSelectedModelId(m.id)}
                                                className={`text-left rounded-2xl p-4 border transition duration-150 ${
                                                    isModelActive
                                                        ? 'bg-amber-50/70 dark:bg-amber-950/20 border-[#ffa31a] ring-2 ring-[#ffa31a]/30 shadow-sm'
                                                        : 'bg-gray-50/80 dark:bg-slate-800/60 border-gray-200 dark:border-slate-800 hover:border-gray-300'
                                                }`}
                                            >
                                                <p className="text-xs font-bold text-[#ffa31a] uppercase">{m.bodyType}</p>
                                                <p className="text-sm font-black text-slate-900 dark:text-white mt-1 leading-snug">{m.name}</p>
                                                <p className="text-[11px] text-gray-400 dark:text-slate-400 mt-1">Est. {m.estTransitDays}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* DYNAMIC VEHICLE SHOWCASE & REAL-TIME COLOR TINT ENGINE */}
                            <div className="rounded-3xl bg-gradient-to-b from-[#f8f9fc] to-[#edf0f5] dark:from-slate-850 dark:to-slate-900 border border-gray-200/80 dark:border-slate-800 p-7 sm:p-8 space-y-6 relative overflow-hidden">
                                
                                {/* Header with Active Model Name and Paint Badge */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                                    <div>
                                        <span className="text-xs font-bold text-[#ffa31a] uppercase tracking-wider">
                                            {currentBrand.brand} • {currentModel.bodyType}
                                        </span>
                                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5">
                                            {currentModel.name}
                                        </h3>
                                    </div>

                                    {/* Active Selected Finish Badge */}
                                    <div className="inline-flex items-center gap-2 rounded-2xl bg-white dark:bg-slate-800 px-4 py-2 shadow-sm border border-gray-200 dark:border-slate-700">
                                        <span
                                            className="h-4 w-4 rounded-full border border-gray-300 shadow-inner shrink-0"
                                            style={{ backgroundColor: selectedColor.hex }}
                                        />
                                        <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                                            {selectedColor.name}
                                        </span>
                                    </div>
                                </div>

                                {/* REAL-TIME DYNAMIC CAR COLOR TRANSFORMER */}
                                <div className="my-6 flex items-center justify-center h-60 sm:h-72 w-full relative z-10 select-none">
                                    
                                    {/* Base Car Render (Clean White / Silver Base) */}
                                    <img
                                        key={currentModel.id}
                                        src={currentModel.baseImage}
                                        alt={`${currentModel.name} base`}
                                        style={{
                                            filter: isWhiteMode
                                                ? 'brightness(1.12) contrast(1.03)'
                                                : isBlackMode
                                                ? 'brightness(0.38) contrast(1.35)'
                                                : isGreyMode
                                                ? 'grayscale(1) brightness(1.08) contrast(1.05)'
                                                : 'brightness(1.02) contrast(1.02)',
                                        }}
                                        className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-all duration-300 transform hover:scale-105"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                'https://pngimg.com/d/bmw_PNG99557.png';
                                        }}
                                    />

                                    {/* DYNAMIC COLOR MULTIPLY SHADER (Turns white paint to chosen color) */}
                                    {!isWhiteMode && (
                                        <div
                                            className="absolute inset-0 pointer-events-none transition-all duration-300"
                                            style={{
                                                backgroundColor: selectedColor.hex,
                                                mixBlendMode: 'multiply',
                                                opacity: isBlackMode ? 0.94 : 0.88,
                                                WebkitMaskImage: `url("${currentModel.baseImage}")`,
                                                maskImage: `url("${currentModel.baseImage}")`,
                                                WebkitMaskSize: 'contain',
                                                maskSize: 'contain',
                                                WebkitMaskRepeat: 'no-repeat',
                                                maskRepeat: 'no-repeat',
                                                WebkitMaskPosition: 'center',
                                                maskPosition: 'center',
                                            }}
                                        />
                                    )}

                                    {/* DYNAMIC COLOR SATURATION OVERLAY (Vibrant metallic tones) */}
                                    {!isWhiteMode && !isBlackMode && !isGreyMode && (
                                        <div
                                            className="absolute inset-0 pointer-events-none transition-all duration-300"
                                            style={{
                                                backgroundColor: selectedColor.hex,
                                                mixBlendMode: 'color',
                                                opacity: 0.82,
                                                WebkitMaskImage: `url("${currentModel.baseImage}")`,
                                                maskImage: `url("${currentModel.baseImage}")`,
                                                WebkitMaskSize: 'contain',
                                                maskSize: 'contain',
                                                WebkitMaskRepeat: 'no-repeat',
                                                maskRepeat: 'no-repeat',
                                                WebkitMaskPosition: 'center',
                                                maskPosition: 'center',
                                            }}
                                        />
                                    )}

                                    {/* White Metallic Pearl Sheen for White Mode */}
                                    {isWhiteMode && (
                                        <div
                                            className="absolute inset-0 pointer-events-none transition-all duration-300"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)',
                                                mixBlendMode: 'screen',
                                                opacity: 0.5,
                                                WebkitMaskImage: `url("${currentModel.baseImage}")`,
                                                maskImage: `url("${currentModel.baseImage}")`,
                                                WebkitMaskSize: 'contain',
                                                maskSize: 'contain',
                                                WebkitMaskRepeat: 'no-repeat',
                                                maskRepeat: 'no-repeat',
                                                WebkitMaskPosition: 'center',
                                                maskPosition: 'center',
                                            }}
                                        />
                                    )}
                                </div>

                                {/* Step 3: AVAILABLE COLOR PALETTE SWATCHES */}
                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700/80 relative z-10 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                                                Select Paint Color Mode ({currentModel.colors.length} Available)
                                            </span>
                                        </div>
                                        <span className="text-[11px] font-semibold text-[#ffa31a]">
                                            ● Instant Live Preview
                                        </span>
                                    </div>

                                    {/* Color Swatches Grid */}
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        {currentModel.colors.map((c) => {
                                            const isSelected = selectedColor.name === c.name;
                                            return (
                                                <button
                                                    key={c.name}
                                                    type="button"
                                                    onClick={() => handleColorSelect(c)}
                                                    className={`group relative flex items-center gap-2 rounded-2xl px-3.5 py-2 transition-all duration-150 ${
                                                        isSelected
                                                            ? 'bg-white dark:bg-slate-800 ring-2 ring-[#ffa31a] shadow-md shadow-amber-500/25 scale-105'
                                                            : 'bg-white/80 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 border border-gray-200/80 dark:border-slate-700'
                                                    }`}
                                                >
                                                    <span
                                                        className="h-4.5 w-4.5 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm shrink-0"
                                                        style={{ backgroundColor: c.hex }}
                                                    />
                                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                        {c.name}
                                                    </span>
                                                </button>
                                            );
                                        })}

                                        {/* Custom Color Wheel Picker */}
                                        <label className="group flex items-center gap-2 rounded-2xl px-3.5 py-2 bg-white/80 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 border border-dashed border-gray-300 dark:border-slate-600 cursor-pointer transition">
                                            <input
                                                type="color"
                                                value={customHex}
                                                onChange={(e) => handleCustomHexChange(e.target.value)}
                                                className="sr-only"
                                            />
                                            <span
                                                className="h-4.5 w-4.5 rounded-full border border-gray-300 shadow-sm shrink-0"
                                                style={{ backgroundColor: customHex }}
                                            />
                                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                Custom Color...
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                {/* Quick Specs Footer */}
                                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
                                    <div className="rounded-xl bg-white/60 dark:bg-slate-800/50 p-2.5 border border-gray-200/50 dark:border-slate-700/50">
                                        <span className="text-[10px] text-gray-400 block uppercase">Standard Year</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{currentModel.defaultYear}</span>
                                    </div>
                                    <div className="rounded-xl bg-white/60 dark:bg-slate-800/50 p-2.5 border border-gray-200/50 dark:border-slate-700/50">
                                        <span className="text-[10px] text-gray-400 block uppercase">Powertrain</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{currentModel.defaultFuel}</span>
                                    </div>
                                    <div className="rounded-xl bg-white/60 dark:bg-slate-800/50 p-2.5 border border-gray-200/50 dark:border-slate-700/50">
                                        <span className="text-[10px] text-gray-400 block uppercase">Transit</span>
                                        <span className="font-bold text-[#ffa31a]">{currentModel.estTransitDays}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: SUBMISSION FORM (PRE-FILLED WITH ACTIVE VEHICLE & COLOR) */}
                        <div className="rounded-3xl bg-white dark:bg-slate-900 p-7 sm:p-9 border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-[#ffa31a]">
                                    Step 4: Customer Details &amp; Quotation
                                </span>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                                    Submit Import Request
                                </h2>
                                <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                                    Selected vehicle, specs, and paint color are automatically locked into this request.
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Vehicle Brand
                                        </label>
                                        <input
                                            required
                                            value={data.vehicle_brand}
                                            onChange={(e) => setData('vehicle_brand', e.target.value)}
                                            className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 p-3.5 text-xs sm:text-sm font-bold text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                        />
                                        {errors.vehicle_brand && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.vehicle_brand}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Vehicle Model
                                        </label>
                                        <input
                                            required
                                            value={data.vehicle_model}
                                            onChange={(e) => setData('vehicle_model', e.target.value)}
                                            className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 p-3.5 text-xs sm:text-sm font-bold text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                        />
                                        {errors.vehicle_model && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.vehicle_model}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            required
                                            placeholder="e.g. John Doe"
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                            className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                        />
                                        {errors.full_name && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.full_name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Email Address *
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="client@example.com"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                        />
                                        {errors.email && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Phone / WhatsApp *
                                        </label>
                                        <input
                                            required
                                            placeholder="+1 555-0199"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                        />
                                        {errors.phone && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Destination Country *
                                        </label>
                                        <input
                                            required
                                            placeholder="e.g. United States, Germany, Japan"
                                            value={data.country}
                                            onChange={(e) => setData('country', e.target.value)}
                                            className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                        />
                                        {errors.country && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.country}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Target Year
                                        </label>
                                        <input
                                            type="number"
                                            value={data.year}
                                            onChange={(e) => setData('year', e.target.value)}
                                            className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Transmission
                                        </label>
                                        <select
                                            value={data.transmission}
                                            onChange={(e) => setData('transmission', e.target.value)}
                                            className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                        >
                                            <option value="Automatic">Automatic</option>
                                            <option value="Manual">Manual</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Budget (USD)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="e.g. 75000"
                                            value={data.budget}
                                            onChange={(e) => setData('budget', e.target.value)}
                                            className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                        Color &amp; Custom Requirements
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        placeholder="Add specific trim options, interior leather preferences, or port instructions..."
                                        className="w-full rounded-2xl bg-[#f4f5f7] dark:bg-slate-800 border-0 p-3.5 text-xs sm:text-sm text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#ffa31a] transition"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-2xl bg-[#ffa31a] hover:bg-[#ff9400] px-6 py-4 font-black text-slate-950 text-sm sm:text-base shadow-lg shadow-amber-500/25 transition disabled:opacity-50"
                                >
                                    {processing ? 'Submitting Import Order...' : `Submit Request for ${currentBrand.brand} ${currentModel.name}`}
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}