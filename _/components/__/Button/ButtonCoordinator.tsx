import * as React from 'react';
import { Icon } from '..';
import Button from './Button';
import ButtonGroup from './ButtonGroup';

type Content =
  | null
  | string
  | $Type.ReactUtils.CreatePropComponentProps<typeof Icon>;

type Props = {
  contents: (Content | Content[])[];
  group?: {
    childPropList?: (
      | $Type.ReactUtils.CreatePropComponentProps<typeof Button>
      | undefined)[];
  } & $Type.Components.BaseElementProps;
} & $Type.ReactUtils.CreatePropComponentProps<typeof Button>;

const getChild = (item: Content, index: number) => {
  if (!item) return null;
  if (typeof item === 'string') {
    return item;
  } else if (item.icon) {
    return <Icon key={index} {...item} />;
  } else {
    return null;
  }
};

const createButton = (
  contents: Props['contents'],
  props: $TypeProps
  group?: Props['group'],
  index?: number
) => {
  const { childPropList = [], ...groupProps } = group || {};
  let isGroup = false;
  const children = contents.map((item, i: number) => {
    if (Array.isArray(item)) {
      isGroup = true;
      return createButton(item, { ...props, ...childPropList[i] }, {}, i);
    }
    return getChild(item, i);
  });

  const key = index || index === 0 ? index : undefined;

  return isGroup ? (
    <ButtonGroup key={key} {...groupProps}>
      {children}
    </ButtonGroup>
  ) : (
    <Button key={key} {...props}>
      {children}
    </Button>
  );
};

const ButtonCoordinator = ({ contents = [], group = {}, ...props }: Props) => {
  return createButton(contents, props, group);
};

export default ButtonCoordinator;
