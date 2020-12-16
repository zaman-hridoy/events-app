import * as actions from './authConstants';
import { closeModal } from '../modals/modalActions';
import { SubmissionError, reset } from 'redux-form';
import { toastr } from 'react-redux-toastr';

export const login = creds => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try { 
            await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
            dispatch(closeModal());
        } catch (err) {
            throw new SubmissionError({
                _error: err.message
            })
        }
    }
}

export const registerUser = user => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase  = getFirebase();
        const firestore = getFirestore();

        try {
            // create user
            let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            console.log(createdUser);
            // update auth profile
            await createdUser.user.updateProfile({
                displayName: user.displayName
            });
            // create a new profile
            let newUser = {
                displayName: user.displayName,
                createdAt: firestore.FieldValue.serverTimestamp()
            }
            await firestore.set(`users/${createdUser.user.uid}`, {...newUser});
            dispatch(closeModal());
        } catch (err) {
            throw new SubmissionError({
                _error: err.message
            });
        }
    }
}

export const socialLogin = selectedProvider => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        try {
            const user = await firebase.login({
                provider: selectedProvider,
                type: 'popup'
            });
            console.log(user.additionalUserInfo.isNewUser);
            if(user.additionalUserInfo.isNewUser) {
                await firestore.set(`users/${user.user.uid}`, {
                    displayName: user.profile.displayName,
                    photoURL: user.profile.avatarUrl,
                    createdAt: firestore.FieldValue.serverTimestamp()
                });
            }
            dispatch(closeModal());
        } catch (error) {
            console.log(error)
        }   
    }
}

export const updatePassword = (creds) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser

        try {
            await user.updatePassword(creds.newPassword1);
            await dispatch(reset('account'));
            toastr.success('Success', 'Your password has been updated.')
        } catch (error) {
            throw new SubmissionError({
                _error: error.message
            })
        }
    }
}