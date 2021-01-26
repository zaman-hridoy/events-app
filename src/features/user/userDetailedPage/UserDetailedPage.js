import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Grid} from "semantic-ui-react";
import { compose } from 'redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedSidebar from './UserDetailedSidebar';
import LoadingComponent from '../../../app/common/LoadingComponent';

class UserDetailedPage extends Component {

    render() {
        const { profile, photos, auth, match, requesting } = this.props;
        const isCurrentUser = auth.uid === match.params.id;
        const loading = Object.values(requesting).some(a => a === true);
        if(loading) return <LoadingComponent />
        return (
            <Grid>
                {/* header */}
                <UserDetailedHeader profile={profile} />

                {/* description */}
                <UserDetailedDescription profile={profile} />

                {/* sidebar */}
                <UserDetailedSidebar isCurrentUser={isCurrentUser} />

                {/* photos */}
                {photos && photos.length > 0 && (
                    <UserDetailedPhotos photos={photos} />
                )}

                {/* events */}
                <UserDetailedEvents />
            </Grid>

        );
    }
}

const queryData = ({ auth, userUid }) => {
    if(userUid !== null) {
        return [
            {
                collection: 'users',
                doc: userUid,
                storeAs: 'profile'
            },
            {
                collection: 'users',
                doc: userUid,
                subcollections: [{
                    collection: 'photos'
                }],
                storeAs: 'photos'
            }
        ]
    }else {
        return [{
            collection: 'users',
            doc: auth.uid,
            subcollections: [{
                collection: 'photos'
            }],
            storeAs: 'photos'
        }]
    }
}

const mapStateToProps = (state, ownProps) => {
    let userUid = null;
    let profile = {};
    if(ownProps.match.params.id === state.auth.uid) {
        profile = state.firebase.profile;
    }else {
        profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
        userUid = ownProps.match.params.id;
    }
    return {
        profile,
        userUid,
        auth: state.firebase.auth,
        photos: state.firestore.ordered.photos,
        requesting: state.firestore.status.requesting
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => queryData(props))
)(UserDetailedPage);