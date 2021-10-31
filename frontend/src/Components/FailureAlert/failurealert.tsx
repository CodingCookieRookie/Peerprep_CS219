import { Alert } from "react-bootstrap";
import { InfoSquareFill } from "react-bootstrap-icons";

export const FailureAlert = (props: { errorMsg: string }) => {
  return (
    <Alert variant="danger">
      <InfoSquareFill className="me-2 mb-1"></InfoSquareFill>
      {props.errorMsg}
    </Alert>
  );
};
