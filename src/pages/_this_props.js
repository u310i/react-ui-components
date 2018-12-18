import * as images from '../images';
import * as fonts from '../fonts';

export default theme => {
  return {
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

    header: {
      options: {
        style: {},
        sm: {
          menu: false,
          drawer: true,
          drawerOptions: {
            defaultDisplay: false
          }
        },
        lg: {
          menu: true,
          drawer: false,
          drawerOptions: {
            defaultDisplay: false
          }
        }
      },
      bar: {
        options: {
          style: {
            backgroundColor: '#2f4f4f'
          },
          height: '6rem',
          sm: {
            style: {},
            timingFunction: 'ease-out',
            duration: 200,
            mode: 'staticToFixed',
            hideOnScroll: false,
            keepHeight: false,
            hidable: false,
            hidePoint: -100,
            changeable: true,
            changeableStyle: {
              before: {
                // opacity: 1
              },
              after: {
                // height: '3rem',
                backgroundColor: 'green'
                // opacity: 0.5
              }
            }
          },
          lg: {
            style: {},
            hideOnScroll: false,
            hideOnScrollOptions: {
              keepHeight: true,
              timingFunction: 'ease-out',
              duration: 200
            }
          }
        }
      },
      menu: {
        options: {
          style: {}
        }
      },
      drawer: {
        options: {
          style: {},
          direction: 'left',
          duration: 150,
          timingFunction: 'ease-out',
          closable: true,
          buttonIcon: ['fas', 'times'],
          buttonStyle: {},
          mask: true,
          maskClosable: true,
          maskOpacity: 0.3,
          maskStyle: {
            backgroundColor: 'white'
          },
          shiftScrollBarWidth: true,
          width: '400px',
          height: '100%',
          zIndex: theme.zIndex.drawer
        }
      },
      drawerButton: {
        icon: {
          close: ['fas', 'angle-double-left'],
          open: ['fas', 'angle-double-right']
        },
        options: {
          style: {}
        }
      },
      list: [
        {
          text: 'TOP',
          attribute: { href: '#' },
          style: {
            backgroundColor: '#4CAF50',
            color: 'white'
          }
        },
        {
          text: 'VISION',
          attribute: { href: '#' }
        },
        {
          text: 'MESSAGE',
          attribute: { href: '#' }
        },
        {
          text: 'STORY',
          attribute: { href: '#' }
        },
        {
          text: 'PROFILE',
          attribute: { href: '#' }
        }
      ]
    },

    headerImage: {
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
  };
};
