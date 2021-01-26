import React, { Component } from 'react';
import { Menu, Container,Button } from 'semantic-ui-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import SignOutMenu from '../menus/SignOutMenu';
import SignedInMenu from '../menus/SignedInMenu';
import { connect } from 'react-redux';

import { openModal } from '../../modals/modalActions';
import { withFirebase } from 'react-redux-firebase';

class Navbar extends Component {

    handleSignIn = () => this.props.openModal('LoginModal');
    handleRegister = () => this.props.openModal('RegisterModal');

    handleSignOut = () => {
        this.props.firebase.logout();
        this.props.history.push("/");
    };

    render() {
        const { auth, profile } = this.props;
        const authenticated = auth.isLoaded && !auth.isEmpty;
        return (
            <Menu inverted fixed="top">
                <Container>
                <Menu.Item header as={Link} to="/">
                    <img src="/assets/img/logo.png" alt="logo" />
                    Re-vents
                </Menu.Item>
                <Menu.Item as={NavLink} to="/events" name="Events" />
                {authenticated && <Menu.Item as={NavLink} to="/people" name="People" />}
                {authenticated && (
                    <Menu.Item as={Link} to="/create-event">
                        <Button floated="right" positive inverted content="Create Event" />
                    </Menu.Item>
                )}
                
                {authenticated ? 
                    <SignedInMenu handleSignOut={this.handleSignOut} profile={profile} auth={auth} /> 
                    : 
                    <SignOutMenu handleSignIn={this.handleSignIn} handleRegister={this.handleRegister} />}
                </Container>
            </Menu>
        )
    }
}

const mapStateToProps = state => ({
   auth: state.firebase.auth,
   profile: state.firebase.profile,

})

const actions = {
    openModal
}

export default withRouter(withFirebase(connect(mapStateToProps, actions)(Navbar)));