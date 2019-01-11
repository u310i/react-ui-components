// import Wifi from './Wifi';
// import Phone from './Phone';
// import Trash from './Trash';
// import Message from './Message';
import Message from './Message';
import Envelope from './Envelope';

import Bird from './Bird';

const getIcon = name => {
  let Component;
  switch (name) {
    // case 'phone':
    //   return <Phone {...props} />;
    // case 'wifi':
    //   return <Wifi {...props} />;
    // case 'trash':
    //   return <Trash {...props} />;
    case 'message':
      Component = Message;
      break;
    case 'envelope':
      Component = Envelope;
      break;
    case 'bird':
      Component = Bird;
      break;
    default:
      return;
  }
  return Component;
};

export { getIcon };
