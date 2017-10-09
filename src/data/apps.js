//TODO: put into a backend database
import ProjectsMap from '../components/Map';
import SimpleMap from '../components/SimpleMap';
import NewMovies from '../components/NewMovies';
import UserSignup from '../components/UserSignup';
import UserLogin from '../components/UserLogin';
import UserProfile from '../components/UserProfile';
import UserConnect from '../components/UserConnect';

//Apps list database
const appsList = [
  {
    "id":0,
    "path": "/map",
    "des": "Projects Map",
    "component": ProjectsMap,
    "menu": true
  },
  {
    "id":1,
    "path": "/testing",
    "des": "Testing",
    "component": SimpleMap,
    "menu": true
  },
  {
    "id":2,
    "path": "/movie",
    "des": "New Movies",
    "component": NewMovies,
    "menu": true
  },
  {
    "id":3,
    "path": "/login",
    "des": "Login",
    "component": UserLogin,
    "menu": true
  },
  {
    "id":4,
    "path": "/signup",
    "des": "Signup",
    "component": UserSignup,
    "menu": false
  },
  {
    "id":5,
    "path": "/profile",
    "des": "Profile",
    "component": UserProfile,
    "menu": true
  },
  {
    "id":6,
    "path": "/connect",
    "des": "User Connect",
    "component": UserConnect,
    "menu": false
  }
];

export default appsList;
