import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useMemo
} from 'react';
import { useAddWindowEvent } from 'utilities/hooks/useEffects';
import { getIsArrivedToElOnScrollEvent } from 'utilities/windowEvents';
