import * as images from '../images';
import * as fonts from '../fonts';

export default (theme, common) => {
  return {
    global: {
      props: {
        style: {
          '@font-face': {
            fontFamily: '"Pacifico"',
            src: `url("${fonts.pacificoRegularTTF}") format("truetype")`
          }
        }
      }
    },
    sm: {
      container: {
        props: {
          style: {
            // display: 'grid',
            // justifyContent: 'center'
            // overflow: 'hidden'
          }
        }
      },
      header: {
        props: {
          style: {}
        },
        menu: false,
        drawer: true,
        appbar: {
          props: {
            style: {
              backgroundColor: '#2f4f4f'
            },
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
          props: {
            style: {}
          }
        },
        drawer: {
          props: {
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
          props: {
            style: {}
          },
          icon: {
            close: {
              type: 'fa',
              icon: ['fas', 'angle-double-left']
            },
            open: {
              type: 'fa',
              icon: ['fas', 'angle-double-right']
            }
          }
        }
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
