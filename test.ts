type TagPropsTest = {
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

type aaa = {
  a1: string;
  a2?: number;
  c1: string;
};
type test = aaa[keyof aaa];

type PropsTest = {
  tagName: keyof TagPropsTest;
  c1: string;
  c2: string;
  // tagName: string;
};

type HtmlElementsTest<U, K extends keyof U, T> = K extends keyof U
  ? Omit<U[K], keyof T> & { tagName: K }
  : never;
type MergePropsTest<T, U> = Omit<T, 'tagName'> &
  HtmlElementsTest<U, keyof U, T>;

// type Test1<U, K, T> = K extends keyof U ? U[K] : never;
// type PropsType = Props & Test1<TagProps, keyof TagProps, Props>;
type Test3<T, K> = K extends K ? (K extends { tagName: T } ? K : never) : never;
type Test2<T extends keyof TagPropsTest, U> = Test3<T, U>;
type Test = Test2<'tagProps1', MergePropsTest<PropsTest, TagPropsTest>>;

const testProps: Test = {
  tagName: 'tagProps1' as const,
  a1: 'string',
  a2: 'string',
  c1: 'string',
  c2: 'string',
};

const component = (obj: MergePropsTest<PropsTest, TagPropsTest>) => {
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
