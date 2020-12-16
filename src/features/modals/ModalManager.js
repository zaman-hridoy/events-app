import React from 'react';
import { connect } from 'react-redux';
import TestModal from './TestModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const modallookUp = {
    TestModal,
    LoginModal,
    RegisterModal
}

function ModalManager({ currentModal }) {
    const { modalType, modalProps } = currentModal;
    let renderedModal = null;
    if(modalType) {
        const ModalComponent = modallookUp[modalType];

        renderedModal = <ModalComponent {...modalProps} />
    }
    return <span>{renderedModal}</span>
}

const mapStateToProps = state => ({
    currentModal: state.modals
})

export default connect(mapStateToProps)(ModalManager);