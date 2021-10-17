import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { Key, PersonCircle } from "react-bootstrap-icons";
import login from "../../assets/login.svg";
import "./login.css";
import * as yup from "yup";
import { Formik } from "formik";

const Login = () => {
  const schema = yup.object({
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
  });

  return (
    <>
      <Container>
        <h1 className="text-center">Login</h1>
        <img
          className="center-block rounded mx-auto img-fluid p-5 w-50"
          src={login}
          alt="login"
        />
        <Formik
          validationSchema={schema}
          onSubmit={console.log} // use this prop later for API post
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
              <Form.Group className="mb-2 pb-2" controlId="formUsername">
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

              <Form.Group className="mb-3 pb-5" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    <Key />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
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
              </Form.Group>

              <Button
                className="me-2"
                variant="primary"
                type="submit"
                disabled={!isValid || !dirty}
                href="/"
              >
                Login
              </Button>
              <Button variant="secondary" href="/">
                Back to Home
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Login;
