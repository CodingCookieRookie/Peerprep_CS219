// import { useState } from "react";
import { Modal, Spinner, Stack } from "react-bootstrap";
import "./loadingmodal.css";

const LoadingModal = ({ show, onHide, difficulty }) => {
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Question Difficulty: {difficulty} </Modal.Title>
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
