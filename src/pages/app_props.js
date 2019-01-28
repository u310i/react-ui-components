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
    sm: {
      container: {
        style: {
          // display: 'grid',
          // justifyContent: 'center'
          // overflow: 'hidden'
        }
      },
      header: {
        style: {},
        menu: false,
        drawer: true,
        options: {},
        appbar: {
          style: {
            backgroundColor: '#2f4f4f'
          },
          options: {
            height: '5rem',
            mode: 'absoluteToFixed',
            actionMode: 'scrollDown',
            timingFunction: 'ease-out',
            duration: 200,
            action: {
              scrollDown: {
                preset: 'hide',
                style: {
                  beforeStyle: {},
                  afterStyle: {}
                }
              },
              scrolling: {
                style: {
                  beforeStyle: {
                    opacity: 1
                  },
                  afterStyle: {
                    // height: '3rem',
                    opacity: 0.3,
                    backgroundColor: '#ff0000'
                  }
                }
              }
            }
          }
        },
        menu: {
          style: {},
          options: {}
        },
        drawer: {
          options: {
            style: {},
            direction: 'left',
            duration: 150,
            timingFunction: 'ease-out',
            defaultDisplay: false,
            closable: true,
            button: {
              icon: {
                type: 'fa',
                icon: ['fas', 'times']
              },
              options: {
                style: {}
              }
            },
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
            close: {
              type: 'fa',
              icon: ['fas', 'angle-double-left']
            },
            open: {
              type: 'fa',
              icon: ['fas', 'angle-double-right']
            }
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
    }
  };
};
