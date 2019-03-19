import { useMemo } from 'react';

export const genDurationsEasings = (duration, easing) => {
  const durations = useMemo(() => {
    const d = {
      enter: duration.enter || duration.exit || duration,
      exit: duration.exit || duration.enter || duration
    };
    if (duration.appear) d.appear = duration.appear;
    return d;
  }, [duration]);

  const easings = useMemo(() => {
    return {
      enter: easing.enter || easing.exit || easing,
      exit: easing.exit || easing.enter || easing
    };
  }, [easing]);

  return [durations, easings];
};
