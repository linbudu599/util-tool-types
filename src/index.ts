export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;

interface A {
  a: string;
  b: number;
}
interface B {
  a: string;
}

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

// Exclude<keyof T, K> 会剔除T中K拥有的字段
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 类型统一重写为T
export type Record<K extends keyof any, T> = {
  [P in K]: T;
};

// 此类工具类型实际使用的是分布式有条件类型 即其中的裸类型参数会被分开进行条件判断
export type Exclude<T, U> = T extends U ? never : T;

export type Extract<T, U> = T extends U ? T : never;

export type NonNullable<T> = T extends null | undefined ? never : T;

/** 参数、构造函数、返回值类型提取器返回的是元祖类型
 * function foo(name: string, age: number) {}
 * type FooParamsType = Parameters<typeof foo>;
 * const implement: FooParamsType = ["1", 2];
 */
export type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

/**
 * class A {
 *   constructor(foo: string, b: boolean) {}
 * }
 * type AConsType = ConstructorParameters<typeof A>;
 */
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

// 返回函数类型值的键名
// { [K in keyof T]: T[K] ... K : never }[keyof T]这一写法适用于需要返回键值得情况
// { [K in keyof T]: T[K] ... K : never } 会返回 { a: "a", b: never} 这种形式的值
// 不满足条件的键其键值会成为never 再次使用[keyof T]会返回其中的有效键值（同时也是键名）
export type FunctTypeKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? K : never;
}[keyof T];

export type NonFuncTypeKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? never : K;
}[keyof T];

export type MutableKeys<T extends object> = {
  [P in keyof T]-?: Equal<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P,
    never
  >;
}[keyof T];

export type IMmutableKeys<T extends object> = {
  [P in keyof T]-?: Equal<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
}[keyof T];

// 判断X Y类型是否相同 如果相同返回A 否则返回B
// 同样有分布式有条件类型的参与
type Equal<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

export type Immutable<T> = { readonly [P in keyof T]: T[P] };

// deep
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

export type DeepImmutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

export type DeepNonNullable<T> = {
  [P in keyof T]: T[P] extends object ? DeepImmutable<T[P]> : NonNullable<T[P]>;
};

// 先挑选键值，然后Pick
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

// section
