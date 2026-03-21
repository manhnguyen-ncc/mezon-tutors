export function formatLastSavedTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString([], {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export function toIsoString(value: unknown): string {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? '' : value.toISOString();
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? '' : parsed.toISOString();
  }

  return '';
}

