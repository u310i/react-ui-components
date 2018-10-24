import * as images from '../images';
import * as fonts from '../fonts';

export default (theme, breakpoints) => ({
  theme: theme,
  globalStyles: {
    '@font-face': {
      fontFamily: '"Pacifico"',
      src: `url("${fonts.pacificoRegularTTF}") format("truetype")`
    }
  },
  container: {
    styles: {
      // display: 'grid',
      // justifyContent: 'center'
    }
  },

  globalNav: {
    general: {
      styles: {
        // paddingTop: '1.5rem',
        // paddingBottom: '1.5rem'
      }
    },
    container: {
      styles: {
        // backgroundColor: '#333',
        // fontSize: '0',
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'flex-end',
        // '& > ul': {
        //   display: 'flex',
        //   flexDirection: 'row',
        //   justifyContent: 'flex-end',
        //   margin: '0',
        //   '& > li': {
        //     display: 'block',
        //     '& > a': {
        //       color: '#f2f2f2',
        //       textAlign: 'center',
        //       paddingLeft: '1rem',
        //       paddingRight: '1rem',
        //       fontSize: '1rem',
        //       display: 'block',
        //       '&:link': {},
        //       '&:visited': {},
        //       '&:hover': {
        //         backgroundColor: '#ddd',
        //         color: 'black'
        //       },
        //       [breakpoints.sm]: {
        //         display: 'none'
        //       }
        //     }
        //   }
        // },
        '& > .icon': {
          display: 'none',
          [breakpoints.sm]: {
            display: 'block',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            fontSize: '1.8rem',
            textAlign: 'center',
            backgroundColor: '#ff7f50'
          }
        }
      }
    },
    itemList: {
      common: {
        styles: {}
      },
      list: [
        {
          textNode: 'TOP',
          attributes: { href: '#' },
          styles: {
            backgroundColor: '#4CAF50',
            color: 'white'
          }
        },
        {
          textNode: 'VISION',
          attributes: { href: '#' }
        },
        {
          textNode: 'MESSAGE',
          attributes: { href: '#' }
        },
        {
          textNode: 'STORY',
          attributes: { href: '#' }
        },
        {
          textNode: 'PROFILE',
          attributes: { href: '#' }
        }
      ]
    },
    actionIcon: {
      className: 'icon',
      styles: {},
      icon: {
        iconName: 'align-justify'
      }
    }
  },

  head: {
    container: {
      styles: {
        position: 'relative',
        maxWidth: '1280px'
      }
    },
    image: {
      attributes: {
        src: images.mainImgJPG,
        alt: 'my image'
      },
      styles: {
        height: '568px'
      }
    },
    titleOuter: {
      styles: {
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    },
    title: {
      textNode: 'Vestibulum mauris',
      styles: {
        fontSize: '2.5rem',
        fontFamily: '"Pacifico", cursive',
        color: '#fff'
      }
    },
    subTitle: {
      textNode: '最新技術と自然との調和を目指す',
      styles: {
        fontSize: '1.25rem',
        fontFamily: '"Josefin Sans", "Noto Sans JP",serif',
        color: '#fff'
      }
    }
  }
});
