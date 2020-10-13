import { Primitive, Falsy, Nullish } from ".";

export const isPrimitive = (val: unknown): val is Primitive => {
  if (val === null || val === undefined) {
    return true;
  }

  const typeDef = typeof val;

  const primitiveNonNullishTypes = [
    "string",
    "number",
    "bigint",
    "boolean",
    "symbol",
  ];

  return primitiveNonNullishTypes.indexOf(typeDef) !== -1;
};

export const isFalsy = (val: unknown): val is Falsy => !val;

export const isNullish = (val: unknown): val is Nullish => val == null;
