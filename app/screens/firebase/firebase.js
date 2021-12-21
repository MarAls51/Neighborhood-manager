// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import '@firebase/auth';
import{createStore,applyMiddleware} from 'redux'
import rootReducer from '../../redux/reducers'
import thunk from 'redux-thunk'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
};

export const store = createStore(rootReducer,applyMiddleware(thunk))
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
 export const auth = firebase.auth()
