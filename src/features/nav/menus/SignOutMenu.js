import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

export default function SignOutMenu({ handleSignIn, handleRegister }) {
    return (
        <Menu.Item position="right">
            <Button onClick={handleSignIn} basic inverted content="Login" />
            <Button onClick={handleRegister} basic inverted content="Register" style={{marginLeft: '0.5em'}} />
        </Menu.Item>
    )
}
