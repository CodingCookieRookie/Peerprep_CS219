// import { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import "./loadingmodal.css";

const LoadingModal = ({ show, onHide }) => {
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header>
          <Modal.Title>Waiting for a match</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display: 'flex', justifyContent:'center'}}>
          <Spinner
            className="spinner-body"
            variant="primary"
            animation={"border"}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoadingModal;
