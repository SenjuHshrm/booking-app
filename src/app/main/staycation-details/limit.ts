export function limit<T>(array: T[], count: number): T[] {
    return array.slice(0, count);
  }