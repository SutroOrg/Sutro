/* eslint @typescript-eslint/no-explicit-any: "warn" */
import { AnyObject, UnknownObject } from "../object-types.js";

/**
 *
 * This Hydrate function will **_MODIFY_** the original object. That is the easiest
 * way there is to keep track of all the data. So use with caution.
 *
 * @param startObj - The previously serialized object that will be modified.
 * @param pathStart - This is the identifier encoded in the data that marks that a string is a path.
 * @param delimiter - The delimiter for the encoded paths.
 * @returns
 */
const hydrate = (
  startObj: UnknownObject,
  pathStart: string,
  delimiter: string
): any => {
  const isPath = (obj: any): obj is string =>
    typeof obj === "string" &&
    (obj === pathStart || obj.startsWith(`${pathStart}${delimiter}`)); //pathStartRegex.test(obj);

  const findFromPath = (path: string) => {
    const pathSplit = path.split(delimiter);

    const findNext = (currObj: AnyObject) => {
      const key = pathSplit.shift();

      if (key) {
        // Match strings that contain "[\d]" where \d is an integer
        if (/\[\d+\]/.test(key) && Array.isArray(currObj)) {
          const index = parseInt(key.slice(1, -1));
          return findNext(currObj[index]);
        }
        return findNext(currObj[key]);
      }

      return currObj;
    };

    try {
      return findNext({ [pathStart]: startObj });
    } catch (e) {
      console.error(path);
      throw e;
    }
  };

  // The actual hydration function; recursively hydrates an object
  const _hydrate = (obj: any, path: string): any => {
    if (obj === null) {
      return null;
    }
    if (Array.isArray(obj)) {
      // For an array, we modify the content so that no objects are moved around
      obj.forEach((o, index) => {
        obj[index] = _hydrate(o, [path, `[${index}]`].join(delimiter));
      });
      return obj;
    }

    if (typeof obj === "object") {
      // Since we want all identical references to point to the same object, we _mutate_ the object
      // rather than make immutable copies
      Object.entries(obj).forEach(([key, value]) => {
        const newVal = _hydrate(value, [path, key].join(delimiter));
        obj[key] = newVal;
      });

      return obj;
    }

    if (isPath(obj)) {
      // If we see a string that starts with our pathStart, we return the object from the cache
      return findFromPath(obj);
    }
    return obj;
  };

  return _hydrate(startObj, pathStart);
};

/**
 * Deserializes an object created by `serialize` in "./serialize" then JSON.parsed.
 * That means it works well with `res.json()` in a `fetch` response.
 *
 * Circular references are handled by replacing the circular reference with a string path to the original value.
 * By default, this starts with `"__$"` but can be changed by passing a second argument.
 *
 * Returns whatever type the input represents
 *
 * @param input - The `JSON.parse`d object that was the output of `serialize`.
 * @param options
 * @param options.pathStart - The string that marks a the beginning of a reference path.
 * This should match what was used in `serialze`.
 * @param options.delimiter - The string that separates path keys in the reference path.
 * This should match what was used in `serialze`.
 * @returns
 */
export const deserializeFromObject = <T = unknown>(
  input: UnknownObject,
  { pathStart = "__$", delimiter = "." }: DeserializeOptions = {}
): T => {
  try {
    // console.log(JSON.stringify(input, null, 2));
    return hydrate(input, pathStart, delimiter);
  } catch (e) {
    console.error(e);
    // console.error("Failed to deserialize", input);
    throw e;
  }
};

/**
 * Deserializes an string created by `serialize` in "./serialize".
 *
 * Circular references are handled by replacing the circular reference with a string path to the original value.
 * By default, this starts with `"__$"` but can be changed by passing a second argument.
 *
 * Returns whatever type the input represents
 *
 * @param input - The `JSON.parse`d object that was the output of `serialize`.
 * @param options
 * @param options.pathStart - The string that marks a the beginning of a reference path.
 * This should match what was used in `serialze`. Default is `"__$"`.
 * @param options.delimiter - The string that separates path keys in the reference path.
 * This should match what was used in `serialze`. Default is `"."`.
 * @returns
 */
export const deserialize = <T = unknown>(
  input: string,
  { pathStart = "__$", delimiter = "." }: DeserializeOptions = {}
): T => {
  return deserializeFromObject<T>(JSON.parse(input), {
    pathStart,
    delimiter,
  });
};

type DeserializeOptions = { pathStart?: string; delimiter?: string };
