export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;

export type Falsy = false | "" | 0 | null | undefined;

export type Nullish = null | undefined;

export type NonUndefined<A> = A extends undefined ? never : A;

// Built-In
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Required<T> = {
  [P in keyof T]-?: T[P];
};

export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

export type Record<K extends keyof any, T> = {
  [P in K]: T;
};

export type Exclude<T, U> = T extends U ? never : T;

export type Extract<T, U> = T extends U ? T : never;

export type NonNullable<T> = T extends null | undefined ? never : T;

export type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

export type ConstructorParameters<
  T extends new (...args: any) => any
> = T extends new (...args: infer P) => any ? P : never;

export type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

export type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;

export type FunctTypeKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? K : never;
}[keyof T];

export type NonFuncTypeKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? never : K;
}[keyof T];

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

export type Writable<T> = Mutable<T>;

export type Immutable<T> = { readonly [P in keyof T]: T[P] };

// deep
export type DeepPartial<T> = {
  [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U];
};

export type DeepMutable<T> = {
  -readonly [U in keyof T]: T[U] extends object ? DeepMutable<T[U]> : T[U];
};

export type DeepImmutable<T> = {
  -readonly [U in keyof T]: T[U] extends object ? DeepMutable<T[U]> : T[U];
};

export type DeepNonNullable<T> = {
  [U in keyof T]: T[U] extends object ? DeepImmutable<T[U]> : NonNullable<T[U]>;
};

// cut
export type PickByValueType<T, ValueType> = Pick<
  T,
  { [Key in keyof T]-?: T[Key] extends ValueType ? Key : never }[keyof T]
>;

export type OmitByValueType<T, ValueType> = Pick<
  T,
  { [Key in keyof T]-?: T[Key] extends ValueType ? never : Key }[keyof T]
>;

export type PromiseType<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;
