import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';

export const updateProfile = user => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const { isLoaded, isEmpty, token, ...updatedUser } = user;
        if(updatedUser.dateOfBirth) {
            updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
        }

        try {
            console.log(updatedUser)
            await firebase.updateProfile(updatedUser);
            toastr.success('Success', 'Profile updated');
        } catch (error) {
            console.log(error);
        }
    }
}

export const uploadProfileImage = (file) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const imageName = cuid();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`; // path where image to be uploaded in to firestore
        const options = {
            name: imageName
        }

        try {
            dispatch(asyncActionStart());
            // upload the file to firebase storage
            let uploadedFile = await firebase.uploadFile(path, file, null, options);
            // console.log({uploadedFile})
            // get url of image
            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            // console.log({downloadURL})
            // get user doc
            let userDoc = await firestore.get(`users/${user.uid}`);
            // console.log(userDoc.data())
            if(!userDoc.data().photoURL) {
                await firebase.updateProfile({
                    photoURL: downloadURL
                });
                await user.updateProfile({
                    photoURL: downloadURL
                });
            }

            // add new photo to photos collection
            await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections: [{
                    collection: 'photos'
                }]
            }, {
                name: imageName,
                url: downloadURL
            });
            
            dispatch(asyncActionFinish());

        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
            toastr.error('Oops', error.message);
        }
    }
}

export const deletePhoto = photo => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        try {
            await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
            await firestore.delete({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos', doc: photo.id}]
            });
        } catch (err) {
            console.log(err);
            toastr.error('Oops', err.message);
        }
    }
}

export const setMainPhoto = photo => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try {
            await firebase.updateProfile({
                photoURL: photo.url
            });
            
        } catch (err) {
            console.log(err);
            toastr.error('Oops', err.message);
        }
    }
}


export const goingToEvent = event => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const photoURL = getState().firebase.profile.photoURL || '/assets/img/user.png';
        const attendee = {
            going: true,
            joinDate: Date.now(),
            photoURL,
            host: false,
            displayName: user.displayName
        }
        try {
            await firestore.update(`events/${event.id}`, {
                [`attendees.${user.uid}`]: attendee
            });
            await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
                eventId: event.id,
                userId: user.uid,
                host: false,
                eventDate: event.date
            })
        } catch (err) {
            console.log(err);
            toastr.error('Oops', err.message);
        }
    }
}

export const cancelGoingToEvent = event => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        try {
            await firestore.update(`events/${event.id}`, {
                [`attendees.${user.uid}`]: firestore.FieldValue.delete()
            });
            await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
        } catch (err) {
            console.log(err);
            toastr.error('Oops', err.message);
        }
    }
}