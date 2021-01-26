import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import SettingsNav from './SettingsNav';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';
import { connect } from 'react-redux';
import { updatePassword } from '../../auth/authActions';
import { updateProfile } from '../userActions';
import moment from 'moment';


const SettingsDashboard = ({ updatePassword, providerId, user, updateProfile }) => {
    return (
        <Grid>
            <Grid.Column width={12}>
                <Switch>
                    <Redirect exact from="/settings" to="/settings/basic" />
                    <Route path="/settings/basic" render={() => <BasicPage initialValues={user} updateProfile={updateProfile} />} />
                    <Route path="/settings/about" render={() => <AboutPage initialValues={user} updateProfile={updateProfile} />} />
                    <Route path="/settings/photos" component={PhotosPage} />
                    <Route path="/settings/account" render={() => 
                        <AccountPage 
                            updatePassword={updatePassword} 
                            providerId={providerId}
                        />
                    }/>
                </Switch>
            </Grid.Column>
            <SettingsNav />
        </Grid>
    )
}

const actions = {
    updatePassword,
    updateProfile
}

const mapStateToProps = state => {
    let user = {};
    if(state.firebase.profile.dateOfBirth) {
        user = {
            ...state.firebase.profile,
            dateOfBirth: state.firebase.profile.dateOfBirth.toDate(),
            createdAt: state.firebase.profile.createdAt.toDate()
        }
    }
    return {
        providerId: !state.firebase.auth.isEmpty  && state.firebase.auth.providerData[0].providerId,
        user
    }
};

export default connect(mapStateToProps, actions)(SettingsDashboard);
