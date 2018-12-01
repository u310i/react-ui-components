import defaultTheme from 'theme/defaultTheme';
import { createScreenSizeMediaQueries } from 'utilities/utils';

export default theme => {
  const {
    breakpoint,
    zIndex,
    scrollbar,
    palette: { primary, secondary, tertiary },
    typography: {
      fontFamily,
      font: {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        subTitle1,
        subTitle2,
        body1,
        body2,
        button,
        caption,
        overline
      }
    }
  } = theme ? { ...defaultTheme, ...theme } : defaultTheme;

  const commonFontFamily = fontFamily.join(',');

  breakpoint.createMediaQuerie = (type, pointName) => {
    switch (type) {
      case 'maxWidth':
        return `@media (max-width: ${(
          breakpoint.values[pointName] - 1
        ).toString()}px)`;
      case 'minWidth':
        return `@media (min-width: ${breakpoint.values[
          pointName
        ].toString()}px)`;
      case 'minToMaxWidth':
        return `@media (min-width: ${breakpoint.values[
          min
        ].toString()}px) and (max-width: ${(
          breakpoint.values[max] - 1
        ).toString()}px)`;
      default:
        return 'error';
    }
  };

  return {
    breakpoint: breakpoint,
    zIndex: {
      ...zIndex
    },
    scrollbar: {
      ...scrollbar
    },
    palette: {
      primary: {
        ...primary
      },
      secondary: {
        ...secondary
      },
      tertiary: {
        ...tertiary
      }
    },

    typography: {
      fontFamily: fontFamily,
      font: {
        h1: {
          ...h1,
          fontFamily: h1.fontFamily ? h1.fontFamily.join(',') : commonFontFamily
        },
        h2: {
          ...h2,
          fontFamily: h2.fontFamily ? h2.fontFamily.join(',') : commonFontFamily
        },
        h3: {
          ...h3,
          fontFamily: h3.fontFamily ? h3.fontFamily.join(',') : commonFontFamily
        },
        h4: {
          ...h4,
          fontFamily: h4.fontFamily ? h4.fontFamily.join(',') : commonFontFamily
        },
        h5: {
          ...h5,
          fontFamily: h5.fontFamily ? h5.fontFamily.join(',') : commonFontFamily
        },
        h6: {
          ...h6,
          fontFamily: h6.fontFamily ? h6.fontFamily.join(',') : commonFontFamily
        },
        subTitle1: {
          ...subTitle1,
          fontFamily: subTitle1.fontFamily
            ? subTitle1.fontFamily.join(',')
            : commonFontFamily
        },
        subTitle2: {
          ...subTitle2,
          fontFamily: subTitle2.fontFamily
            ? subTitle2.fontFamily.join(',')
            : commonFontFamily
        },
        body1: {
          ...body1,
          fontFamily: body1.fontFamily
            ? body1.fontFamily.join(',')
            : commonFontFamily
        },
        body2: {
          ...body2,
          fontFamily: body2.fontFamily
            ? body2.fontFamily.join(',')
            : commonFontFamily
        },
        button: {
          ...button,
          fontFamily: button.fontFamily
            ? button.fontFamily.join(',')
            : commonFontFamily
        },
        caption: {
          ...caption,
          fontFamily: caption.fontFamily
            ? caption.fontFamily.join(',')
            : commonFontFamily
        },
        overline: {
          ...overline,
          fontFamily: overline.fontFamily
            ? overline.fontFamily.join(',')
            : commonFontFamily
        }
      }
    }
  };
};
