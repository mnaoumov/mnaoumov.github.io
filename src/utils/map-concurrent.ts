// Bound network work so large catalogues do not burst requests at the APIs.
export async function mapConcurrent<T, R>(
  items: T[],
  transform: (item: T) => Promise<R>
): Promise<R[]> {
  const defaultConcurrency = 2;
  const allocatedCores = Number(process.env.BULK_CORES);
  const concurrency =
    Number.isInteger(allocatedCores) && allocatedCores > 0
      ? Math.min(defaultConcurrency, allocatedCores)
      : defaultConcurrency;
  const results: R[] = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;
        results[index] = await transform(items[index]);
      }
    })
  );
  return results;
}
