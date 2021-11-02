import {
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Key, PersonCircle } from "react-bootstrap-icons";
import login from "../../assets/login.svg";
import "./login.css";
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { USER_API_URL, API_HEADERS } from "../../api";
import { FailureAlert } from "../../Components/FailureAlert/failurealert";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const API_URL = USER_API_URL;

const Login = ({ history }) => {
  const [spin, setSpin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [cookies, setCookie] = useCookies(["userInfo"]);

  const schema = yup.object({
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
  });

  useEffect(() => {
    const userInfo = cookies.userInfo;

    if (userInfo) {
      history.push("/home");
    }
  }, [cookies.userInfo, history]);

  const submitHandler = async (e) => {
    setSpin(true);

    await fetch(API_URL + "/auth/login", {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        username: e.username,
        password: e.password,
      }),
    })
      .then(async (res) => {
        var result = await res.json();
        if (res.status === 200) {
          setErrorMsg("");
          setCookie("userInfo", JSON.stringify(result), {
            path: "/",
            maxAge: 172800, // 2 days per cookie
          });
          history.push("/home");
          return result;
        } else {
          setErrorMsg(result.message);
          return result.message;
        }
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });

    setSpin(false);
  };

  return (
    <>
      <Container>
        <Card>
          <Card.Body>
            <h1 className="text-center">Login</h1>
            <img
              className="position-relative start-50 translate-middle-x img-fluid p-5 w-50"
              src={login}
              alt="login"
            />
            <Formik
              validationSchema={schema}
              onSubmit={(e) => submitHandler(e)} // use this prop later for API post
              initialValues={{
                username: "",
                password: "",
                validateOnMount: true,
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
                dirty,
              }) => (
                <Form className="form" onSubmit={handleSubmit} noValidate>
                  {!spin ? (
                    <div>
                      <Form.Group
                        className="mb-2 pb-2"
                        controlId="formUsername"
                      >
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                          <InputGroup.Text id="inputGroupPrepend">
                            <PersonCircle />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isValid={touched.username && !errors.username}
                            isInvalid={!!errors.username}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.username}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group
                        className="mb-3 pb-3"
                        controlId="formPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                          <InputGroup.Text id="inputGroupPrepend">
                            <Key />
                          </InputGroup.Text>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            aria-describedby="inputGroupPrepend"
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                            isValid={touched.password && !errors.password}
                            isInvalid={!!errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </InputGroup>
                        <Form.Text className="text-muted">
                          New to Peerprep?{" "}
                          <a href="/signup">
                            {" "}
                            Register your account here now!{" "}
                          </a>
                        </Form.Text>
                      </Form.Group>
                      {errorMsg !== "" ? (
                        <FailureAlert errorMsg={errorMsg} />
                      ) : (
                        <> </>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Spinner
                        className="p-4 mb-5 top"
                        variant="primary"
                        animation={"border"}
                      />
                    </div>
                  )}
                  <Button
                    className="me-2"
                    variant="primary"
                    type="submit"
                    disabled={!isValid || !dirty}
                  >
                    Login
                  </Button>
                  <Button variant="secondary" href="/">
                    Back to Home
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;
