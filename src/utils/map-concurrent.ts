// Bound network work so large catalogues do not burst requests at the APIs.
export async function mapConcurrent<T, R>(
  items: T[],
  transform: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(2, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;
        results[index] = await transform(items[index]);
      }
    })
  );
  return results;
}
