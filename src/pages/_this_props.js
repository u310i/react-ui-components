import * as images from '../images';
import * as fonts from '../fonts';

export default theme => ({
  global: {
    style: {
      '@font-face': {
        fontFamily: '"Pacifico"',
        src: `url("${fonts.pacificoRegularTTF}") format("truetype")`
      }
    }
  },
  container: {
    style: {
      // display: 'grid',
      // justifyContent: 'center'
      // overflow: 'hidden'
    }
  },

  globalNav: {
    general: {
      style: {
        // paddingTop: '1.5rem',
        // paddingBottom: '1.5rem'
      }
    },
    container: {
      style: {
        [theme.breakpoints.presets.min]: {
          backgroundColor: '#2f4f4f'
        }
      }
    },
    drawer: {
      container: {
        style: {},
        attribute: {}
      },
      list: {
        container: {
          style: {},
          listItems: [
            {
              textNode: 'TOP',
              attribute: { href: '#' },
              style: {
                backgroundColor: '#4CAF50',
                color: 'white'
              }
            },
            {
              textNode: 'VISION',
              attribute: { href: '#' }
            },
            {
              textNode: 'MESSAGE',
              attribute: { href: '#' }
            },
            {
              textNode: 'STORY',
              attribute: { href: '#' }
            },
            {
              textNode: 'PROFILE',
              attribute: { href: '#' }
            }
          ]
        }
      }
    },

    actionIcon: {
      container: {
        style: {},
        icon: {
          close: 'angle-double-left',
          open: 'angle-double-right'
        }
      }
    }
  },

  head: {
    container: {
      style: {
        position: 'relative',
        maxWidth: '1280px'
      }
    },
    image: {
      attribute: {
        src: images.mainImgJPG,
        alt: 'my image'
      },
      style: {
        height: '568px'
      }
    },
    titleOuter: {
      style: {
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    },
    title: {
      textNode: 'Vestibulum mauris',
      style: {
        fontSize: '2.5rem',
        fontFamily: '"Pacifico", cursive',
        color: '#fff'
      }
    },
    subTitle: {
      textNode: '最新技術と自然との調和を目指す',
      style: {
        fontSize: '1.25rem',
        fontFamily: '"Josefin Sans", "Noto Sans JP",serif',
        color: '#fff'
      }
    }
  }
});
