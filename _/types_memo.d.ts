type ToUnion<T, K extends keyof T> = K extends keyof T ? T[K] : never;

type InsertPropsWithKeysForToUnion<T> = ToUnion<T, keyof T>;

type ReMakeElementTagNameMap<T, U> = {
  [P in keyof U]: Omit<U[P], keyof T> & { tagName: P };
};

type MergeProps<T, U> = InsertPropsWithKeysForToUnion<
  ReMakeElementTagNameMap<T, U>
> &
  Omit<T, 'tagName'>;

type Props = {
  tagName: keyof ElementTagNameMap;
  type?: string;
  _style_?: CSS.Properties;
  style?: CSS.Properties;
  _className_?: string;
  classNames?: string[];
  className?: string;
  _id_?: string;
  ids?: string[];
  id?: string;
  _arias_?: Arias;
  arias?: Arias;
  _refer_?: Refer;
  refer?: Refer;
};

type BaseProps = Readonly<MergeProps<Props, React.ReactDOM>>;