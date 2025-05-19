// File for managing FontAwesome icons in the application
// Imports FontAwesome library and specific icons
// and adds them to the library for use in the application
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faHeart as faHeartSolid, 
  faUser as faUserSolid, 
  faCartShopping, 
  faSun, 
  faMoon,
  faBars,
  faTimes,
  faTriangleExclamation,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular, faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';


library.add(
  faHeartSolid, 
  faHeartRegular, 
  faUserSolid, 
  faUserRegular, 
  faCartShopping, 
  faSun, 
  faMoon, 
  faBars, 
  faTimes, 
  faTriangleExclamation,
  faExclamationTriangle
);
