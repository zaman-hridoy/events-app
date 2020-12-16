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


const SettingsDashboard = ({ updatePassword, providerId }) => {
    return (
        <Grid>
            <Grid.Column width={12}>
                <Switch>
                    <Redirect exact from="/settings" to="/settings/basic" />
                    <Route path="/settings/basic" component={BasicPage} />
                    <Route path="/settings/about" component={AboutPage} />
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
    updatePassword
}

const mapStateToProps = state => ({
    providerId: !state.firebase.auth.isEmpty  && state.firebase.auth.providerData[0].providerId
});

export default connect(mapStateToProps, actions)(SettingsDashboard);
