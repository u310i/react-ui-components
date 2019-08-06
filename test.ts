type TagProps = {
  tagProps1: {
    a1: string;
    a2?: string;
    c1: string;
  };
  tagProps2: {
    b1: number;
    b2: number;
    c1: string;
  };
};

type Props = {
  tagName: keyof TagProps;
  c1: string;
  c2: string;
  // tagName: string;
};

type ToUnion<T, K extends keyof T> = K extends keyof T ? T[K] : never;

type InsertPropsWithKeysForToUnion<T> = ToUnion<T, keyof T>;

type ReMakeElementTagNameMap<T, U> = {
  [P in keyof U]: Omit<U[P], keyof T> & { tagName: P };
};

type MergeProps<T, U> = InsertPropsWithKeysForToUnion<
  ReMakeElementTagNameMap<T, U>
> &
  Omit<T, 'tagName'>;

type BaseProps = MergeProps<Props, TagProps>;

// type Test1<U, K, T> = K extends keyof U ? U[K] : never;
// type PropsType = Props & Test1<TagProps, keyof TagProps, Props>;

const component = (obj: BaseProps) => {
  console.log(obj.c1);
  console.log(obj.c2);
  if (obj.tagName === 'tagProps1') {
    console.log(obj.a1);
  } else if (obj.tagName === 'tagProps2') {
    console.log(obj.b1);
  }
};

const props1 = {
  tagName: 'tagProps1' as const,
  a1: 'string',
  a2: 'string',
  c1: 'string',
  c2: 'string',
};
const props2 = {
  tagName: 'tagProps2' as const,
  b1: 123,
  b2: 123,
  c1: 'string',
  c2: 'string',
};

component(props2);
