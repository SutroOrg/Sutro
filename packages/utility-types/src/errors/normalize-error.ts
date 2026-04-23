export const normalizeError = <E extends Error = Error>(
  e: unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eCtor: new (message?: string, ...args: any[]) => E
): Error => {
  if (e instanceof Error) {
    return e;
  } else if (typeof e === "string") {
    return new eCtor(e);
  } else {
    const newError = new eCtor("Unexpected error type");
    if ("context" in newError) {
      newError.context = { e };
    }
    return newError;
  }
};
