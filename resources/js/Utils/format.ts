export function formatCurrency(amount: number, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatStatus(status: string) {
    return status.replaceAll('_', ' ');
}

export function formatNumber(value: number) {
    return new Intl.NumberFormat('en-US').format(value);
}