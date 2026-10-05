type StatusBadgeProps = {
    status: string;
};

function readable(status: string) {
    return status.replaceAll('_', ' ');
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const normalizedStatus = status.toLowerCase();

    let colorClass = 'bg-slate-500/15 text-slate-300';

    if (
        ['ready_for_sale', 'delivered', 'quality_passed', 'available'].includes(normalizedStatus)
    ) {
        colorClass = 'bg-green-500/15 text-green-300';
    }

    if (
        ['requested', 'inspection', 'customs_clearance', 'shipped', 'assembly_in_progress'].includes(
            normalizedStatus,
        )
    ) {
        colorClass = 'bg-amber-400/15 text-amber-300';
    }

    if (
        ['cancelled', 'quality_failed', 'low_stock'].includes(normalizedStatus)
    ) {
        colorClass = 'bg-red-500/15 text-red-300';
    }

    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${colorClass}`}>
            {readable(status)}
        </span>
    );
}