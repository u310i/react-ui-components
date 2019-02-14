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
      style: {
        // display: 'grid',
        // justifyContent: 'center'
        // overflow: 'hidden'
      },
      header: {
        style: {},
        appbar: {
          style: {
            backgroundColor: '#2f4f4f'
          },
          height: '5rem',
          mode: 'absoluteToFixed',
          actionMode: 'scrollDown',
          action: {
            timingFunction: 'ease-out',
            duration: 200,
            scrollDown: {
              preset: 'hide',
              beforeStyle: {},
              afterStyle: {}
            },
            scrolling: {
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
        },
        drawer: {
          style: {},
          direction: 'left',
          duration: 150,
          timingFunction: 'ease-out',
          defaultDisplay: false,
          closable: true,
          closeButton: {
            style: {},
            icon: {
              type: 'fa',
              icon: ['fas', 'times']
            }
          },
          externalToggleButton: {
            style: {},
            close: {
              type: 'fa',
              icon: ['fas', 'angle-double-left']
            },
            open: {
              type: 'fa',
              icon: ['fas', 'angle-double-right']
            }
          },
          mask: true,
          closableOnMask: true,
          maskOpacity: 0.3,
          maskStyle: {
            backgroundColor: 'white'
          },
          shiftScrollBarWidth: true,
          width: '400px',
          height: '100%',
          zIndex: theme.zIndex.drawer
        },
        verticalMenu: {
          list: common.menuList,
          style: {}
        }
      }
    }
  };
};
