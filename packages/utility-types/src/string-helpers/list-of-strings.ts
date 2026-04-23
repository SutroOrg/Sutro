import React, { type ReactNode } from "react";

/**
 * Takes a list of strings or ReactNodes and turns it into a comma-separated list with an "and" before the last item.
 *
 * If passing in ReactNodes, they should really be simple strings wrapped in a React element such as a bold element, or it's not going
 * to really make much sense
 */

export function listOfStrings(list: string[]): string;
export function listOfStrings(list: ReactNode[]): ReactNode;
export function listOfStrings(
  list: string[] | ReactNode[]
): string | ReactNode {
  const isReactNodes = list.some((item) => typeof item !== "string");

  // Not using JSX here, since this is in sutro-common and we don't want to force people to use JSX
  const asDesiredOutput = (...input: string[] | ReactNode[]) =>
    isReactNodes ?
      React.createElement(React.Fragment, {}, ...input)
    : input.join("");

  const [first, second, ...rest] = list;
  if (first === undefined) {
    return asDesiredOutput("");
  }

  if (second === undefined) {
    return asDesiredOutput(first);
  }
  if (rest.length === 0) {
    return asDesiredOutput(first, " and ", second);
  }

  const last = list.pop();
  return asDesiredOutput(
    ...list.flatMap((entry) => [entry, ", "]),
    "and ",
    last
  );
}
