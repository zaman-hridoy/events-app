import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';
import firebase from '../config/firebase';

import {
    firebaseReducer,
    getFirebase
  } from 'react-redux-firebase';

  import { 
      firestoreReducer,
      getFirestore,
      reduxFirestore 
} from 'redux-firestore';

import authReducer from '../../features/auth/authReducer';
import modalReducer from '../../features/modals/modalReducer';
import eventReducer from '../../features/event/eventReducer';
import asyncReducer from '../../features/async/asyncReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    modals: modalReducer,
    events: eventReducer,
    form: formReducer,
    async: asyncReducer,
    toastr: toastrReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

const configureStore = () => {
    const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancer];

    const composedEnhancer = composeWithDevTools(
        ...storeEnhancers,
        // reactReduxFirebase(firebase),
        reduxFirestore(firebase)
    );

    const store = createStore(rootReducer, composedEnhancer);

    return store;
}

export default configureStore;