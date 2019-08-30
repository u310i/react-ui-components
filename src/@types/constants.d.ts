import { constants as backdropConstants } from '../components/Backdrop/_constants';
import { constants as buttonConstants } from '../components/Button/_constants';
import { constants as collapseConstants } from '../components/Collapse/_constants';
import { constants as dialogConstants } from '../components/Dialog/_constants';
import { constants as drawerConstants } from '../components/Drawer/_constants';
import { constants as fadeConstants } from '../components/Fade/_constants';
import { constants as growConstants } from '../components/Grow/_constants';
import { constants as iconConstants } from '../components/Icon/_constants';
import { constants as listConstants } from '../components/List/_constants';
import { constants as modalConstants } from '../components/Modal/_constants';
import { constants as paperConstants } from '../components/Paper/_constants';
import { constants as slideConstants } from '../components/Slide/_constants';
import { constants as stickyConstants } from '../components/Sticky/_constants';
import { constants as svgConstants } from '../components/SVG/_constants';
import { constants as swipeableDrawerConstants } from '../components/SwipeableDrawer/_constants';
import { constants as zoomConstants } from '../components/Zoom/_constants';

declare global {
  namespace $Type {
    namespace Constants {
      type All = {
        backdrop: typeof backdropConstants;
        button: typeof buttonConstants;
        collapse: typeof collapseConstants;
        dialog: typeof dialogConstants;
        drawer: typeof drawerConstants;
        fade: typeof fadeConstants;
        grow: typeof growConstants;
        icon: typeof iconConstants;
        list: typeof listConstants;
        modal: typeof modalConstants;
        paper: typeof paperConstants;
        slide: typeof slideConstants;
        sticky: typeof stickyConstants;
        svg: typeof svgConstants;
        swipeableDrawer: typeof swipeableDrawerConstants;
        zoom: typeof zoomConstants;
      };
    }
  }
}
