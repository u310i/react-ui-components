import { constants as backdrop } from '../components/Backdrop/_constants';
import { constants as button } from '../components/Button/_constants';
import { constants as button2 } from '../components/Button2/_constants';
import { constants as collapse } from '../components/Collapse/_constants';
import { constants as dialog } from '../components/Dialog/_constants';
import { constants as drawer } from '../components/Drawer/_constants';
import { constants as fade } from '../components/Fade/_constants';
import { constants as grow } from '../components/Grow/_constants';
import { constants as icon } from '../components/Icon/_constants';
// import { constants as list } from '../components/List/_constants';
import { constants as modal } from '../components/Modal/_constants';
import { constants as onlyScreenReader } from '../components/OnlyScreenReader/_constants';
import { constants as paper } from '../components/Paper/_constants';
import { constants as slide } from '../components/Slide/_constants';
import { constants as sticky } from '../components/Sticky/_constants';
import { constants as svg } from '../components/SVG/_constants';
import { constants as swipeableDrawer } from '../components/SwipeableDrawer/_constants';
import { constants as zoom } from '../components/Zoom/_constants';

declare global {
  namespace $Type {
    namespace Constants {
      type All = {
        backdrop: typeof backdrop;
        button: typeof button;
        button2: typeof button2;
        collapse: typeof collapse;
        dialog: typeof dialog;
        drawer: typeof drawer;
        fade: typeof fade;
        grow: typeof grow;
        icon: typeof icon;
        // list: typeof list;
        modal: typeof modal;
        onlyScreenReader: typeof onlyScreenReader;
        paper: typeof paper;
        slide: typeof slide;
        sticky: typeof sticky;
        svg: typeof svg;
        swipeableDrawer: typeof swipeableDrawer;
        zoom: typeof zoom;
      };
    }
  }
}
