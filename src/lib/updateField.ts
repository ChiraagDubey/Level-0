export function updateField<T>(source: T, path: Array<string | number>, value: unknown): T {
  if (path.length === 0) {
    return value as T;
  }

  const [segment, ...rest] = path;

  if (Array.isArray(source)) {
    const nextArray = [...source];
    const index = Number(segment);
    nextArray[index] = rest.length === 0 ? value : updateField(nextArray[index], rest, value);
    return nextArray as T;
  }

  const nextObject = { ...(source as Record<string, unknown>) };
  nextObject[String(segment)] =
    rest.length === 0 ? value : updateField(nextObject[String(segment)], rest, value);

  return nextObject as T;
}
