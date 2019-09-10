
type III<T> = T extends ReadonlyArray<infer R> ? Array<R> : false
type IIII = III<Array<'foo' | 'bar'>>
type I = Array<'foo' | 'bar'>

type J = string | string | number

type Compact<A> = { [K in keyof A]: A[K] }
type H = Compact<Map<string, string>>
type Equals<A, B> = (<C>() => C extends Compact<A> ? 'T' : 'F') extends (<C>() => C extends Compact<B>
  ? 'T'
  : 'F')
  ? 'T'
  : 'F'
type ff = Equals<null, undefined>
type FFF<A> = <C>() => C extends Compact<A> ? 'T' : 'F'
// let fff: FFF<string> = 'T'
type GGG = <C>() => C
const ggg: GGG = () => undefined
const g2: string = ggg<string>()

type A = { tag: 'A'; a: string }
type B = { tag: 'B'; b: number }
type C = A | B

type DD = keyof C

type G<A> = A extends ReadonlyArray<infer R> ? A[number] : false
type GG = G<readonly ['foo', 'bar', 'baz', 'foobaz']>

interface DeepReadonlyArray<A> extends ReadonlyArray<DeepReadonly<A>> { }
type DeepReadonly<A> = A extends Array<infer B> ? DeepReadonlyArray<B> : DeepReadonlyObject<A>
type DeepReadonlyObject<A> = { readonly [K in keyof A]: DeepReadonly<A[K]> }

type DDD<A> = A extends Array<infer B> ? DeepReadonlyArray<B> : false
let ddd: DDD<['foo', 'bar', 'baz']>
type EEE = DeepReadonlyArray<'foo' | 'bar'>
const eee: EEE = ['foo', 'bar', 'foo']

type Test = object extends never ? true : false

type Test2<T, U> = BranchIfObject<T, never, T extends Wide<U, any[]> ? T : U>
type Test2_2 = Test2<[123, 'true'], ['foo', 'bar', 'baz', 'foobaz']>
type TT = BranchIfObject<[123, 'true'], true, false>

type Test4 = string[] extends any[] ? true : false


type Test3 = ToWidening<['foo', 'bar', 'baz']>
type ObjType = { a: 'aaa' }
type Test5 = ObjType extends Test3 ? true : false
type Obj2 = {
  a: ['foo', 'bar', 'baz']
}
type Test6 = {
  [P in keyof Obj2]: Obj2[P]
}
type AAA = ReadonlyMap<string, string> extends Map<any, any> ? true : false

type BBB<T> = {
  readonly [P in keyof T]?: T[P]
}
let bbb: BBB<[]>

type CCC = readonly [] extends readonly any[] ? true : false

// type ToWidenning<T> = T extends string ? string : (T extends number ? number : (T extends boolean ? boolean : (T extends any[] ? any[] : (T extends Function ? Function : (T extends ReadonlyMap<any, any> ? ReadonlyMap<any, any> : T)))))

type Widen2<T> =
  T extends boolean ? boolean :
  T extends number ? number :
  T extends string ? string :
  T extends Function ? Function :
  T;

type DeepWiden<T> =
  T extends ReadonlyArray<any> ? DeepWidenArray<T[number]> :
  T extends ReadonlyMap<infer R, infer I> ? DeepWidenMap<R, I> :
  T extends object ? DeepWidenObject<T> :
  Widen2<T>;

interface DeepWidenArray<T> extends ReadonlyArray<DeepWiden<T>> { }
interface DeepWidenMap<T, U> extends Map<DeepWiden<T>, DeepWiden<U>> { }

type DeepWidenObject<T> = {
  [P in keyof T]: DeepWiden<T[P]>;
};

type Wide<T, U> = T extends U ? U : T;

type ToWidening<T> = Wide<Wide<Wide<Wide<Wide<Wide<T, string>, number>, boolean>, readonly any[]>, Function>, ReadonlyMap<any, any>>

type ObjectIfObject<T> = T extends object ? (T extends readonly any[] ? never : (T extends Function ? never : (T extends ReadonlyMap<any, any> ? never : T))) : never

type BranchIfObject<T, Posi, Nega> = ObjectIfObject<T> extends never ? Nega : Posi;

type KeyofObjectIfObject<T> = ObjectIfObject<T> extends never ? never : keyof T;


type DeepOverrideObject<T, U> = {
  [P in keyof T]: P extends KeyofObjectIfObject<U> ? BranchIfObject<T[P], DeepOverrideObject<T[P], U[P]>, U[P] extends DeepWiden<T[P]> ? U[P] : T[P]> : T[P];
}

type L = 'foo' | 'bar'
type LL = 'foo' | '234'
type LLL = Extract<L, LL>

const target1 = {
  a: ['foo', 'bar', 'baz']
} as const

const source1 = {
  a: ['123', '234']
} as const


const obj2: DeepOverrideObject<typeof target1, typeof source1> = {
  a: ['123', '234'],
} as const


const map = new Map([['foo', 123], ['bar', 234]])

const target = {
  a: {
    a_1: 'a_1_',
  },
  b: 'b_',
  c: {
    c_1: 'c_1_',
    c_2: 'c_2_',
    c_3: {
      c_3_1: 'c_3_1_',
      c_3_2: ['foo', 'bar', 'baz', 'foobaz'],
    },
  },
  d: 'd_',
  e: map
} as const;

const newMap = new Map([['foo', 100], ['bar', 200]])

const source = {
  a: 'aa_',
  b: {
    b_1: 'bb_1_',
  },
  c: {
    c_2: {
      c_2_1: 'c_2_1_',
    },
    c_3: {
      c_3_1: ['aaa', 'bbb'],
      c_3_2: ['123', 'true'],
    },
  },
  d: ['AAA', 'BBB'],
  e: newMap
} as const;

const obj: DeepOverrideObject<typeof target, typeof source> = {
  a: { a_1: 'a_1_' },
  b: 'b_',
  c:
  {
    c_1: 'c_1_',
    c_2: 'c_2_',
    c_3: { c_3_1: 'c_3_1_', c_3_2: ['123', 'true'] }
  },
  d: 'd_',
  e: newMap
} as const
