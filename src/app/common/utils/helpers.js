import moment from 'moment';

export const createNewEvent = (user, photoURL, event) => {
    return {
        ...event,
        hostUid: user.uid,
        hostedBy: user.displayName,
        hostPhotoURL: photoURL || '/assets/img/user.png',
        created: Date.now(),
        attendees: {
            [user.uid]: {
                going: true,
                joinDate: Date.now(),
                photoURL: photoURL || '/assets/img/user.png',
                displayName: user.displayName,
                host: true
            }
        }
    }
}

export const objectToArray = (obj) => {
    return Object.keys(obj).map(key => ({
        id: key,
        ...obj[key]
    }))
}