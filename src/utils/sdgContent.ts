export function normalizeSdgContent<T>(value: T): T {
  if (typeof value === 'string') {
    return value.replace(
      /\b(SDG\s+GOALS?|SUSTAINABLE\s+DEVELOPMENT\s+GOALS?)\s+\d{4}\b/gi,
      '$1 2030'
    ) as T;
  }
  if (Array.isArray(value)) return value.map(normalizeSdgContent) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, content]) => [key, normalizeSdgContent(content)])
    ) as T;
  }
  return value;
}
