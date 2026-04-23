/* eslint-disable sutro/no-plain-errors */
/* eslint @typescript-eslint/no-explicit-any: "warn" */

// See docs for serialize for details on these parameters
const dehydrate = (
  start: any,
  pathStart: string,
  delimiter: string,
  throwOnBadObject: boolean
) => {
  // Create a cache for tracking see objects.
  // Maps the seen object to a path to the object
  const dehydrationCache = new WeakMap<object, string>();

  // The actual dehydration function; recursively dehydrates an object
  const _dehydrate = (obj: any, path: string): any => {
    if (obj === null) {
      return null;
    }

    if (Array.isArray(obj)) {
      // For an array, we generate a new one, with each element dehydrated
      return obj.map((o, index) =>
        _dehydrate(o, [path, `[${index}]`].join(delimiter))
      );
    }

    if (typeof obj === "object") {
      if (throwOnBadObject && obj.constructor !== Object) {
        throw new Error(`Bad object about!: ${path}`);
      }
      // For an object, if we've see it, we return the path to that object
      if (dehydrationCache.has(obj)) {
        return dehydrationCache.get(obj);
      }

      // Otherwise, we return an object with each value dehydrated
      dehydrationCache.set(obj, path);
      return Object.fromEntries(
        Object.entries(obj)
          .map(([key, value]) => [
            key,
            _dehydrate(value, [path, key].join(delimiter)),
          ])
          .sort(([a], [b]) => a.localeCompare(b))
      );
    }
    return obj;
  };

  return _dehydrate(start, pathStart);
};

type SerializeOptions<Skip = boolean> = {
  /**
   * The string to use to indicate that a value is actually a JSON path
   */
  delimiter?: string;
  pathStart?: string;
  throwOnBadObject?: boolean;
} & (Skip extends boolean ?
  {
    /**
     * Determines whether serialization should return a string or an object
     * @defaultValue false
     */
    skipStringify?: Skip;
  }
: object);

/**
 * Serializes an valid value (i.e. not `undefined`)
 *
 * Handles any circular references
 *
 * Circular references are handled by replacing the circular reference with a string path to the original value.
 * By default, this starts with `"__$"` but can be changed by providing a value for `options.pathStart`
 *
 * Returns a JSON string, or object with no circular references, if stringification is skipped.
 *
 * @param value - The value to serialize
 * @param options - Options for serialization
 *
 */
export function serialize(
  value: any,
  options: SerializeOptions<undefined>
): string;
export function serialize(value: any, options: SerializeOptions<true>): object;
export function serialize(value: any, options: SerializeOptions<false>): string;
export function serialize(value: any): string;
export function serialize(
  value: any,
  {
    delimiter = ".",
    pathStart = "__$",
    skipStringify = false,
    throwOnBadObject = false,
  }: SerializeOptions<boolean> = {}
): string | object {
  const dehydrated = dehydrate(value, pathStart, delimiter, throwOnBadObject);
  if (skipStringify) {
    return dehydrated;
  }
  return JSON.stringify(dehydrated);
}
