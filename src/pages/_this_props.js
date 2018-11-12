import * as images from '../images';
import * as fonts from '../fonts';

export default theme => ({
  global: {
    styles: {
      '@font-face': {
        fontFamily: '"Pacifico"',
        src: `url("${fonts.pacificoRegularTTF}") format("truetype")`
      }
    }
  },
  container: {
    styles: {
      // display: 'grid',
      // justifyContent: 'center'
      overflow: 'hidden'
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
        [theme.breakpoints.maxWidthPresets.sm]: {
          backgroundColor: '#2f4f4f'
        }
      }
    },
    drawer: {
      container: {
        styles: {},
        attributes: {}
      },
      list: {
        container: {
          styles: {},
          listItems: [
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
        }
      }
    },

    actionIcon: {
      container: {
        styles: {},
        icon: {
          close: 'angle-double-left',
          open: 'angle-double-right'
        }
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
