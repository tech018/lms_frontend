import React, { useState, useEffect } from "react";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { completeRegister } from "../../actions/userActions";
import Loader from "../../components/Loader";

function RegistrationComplete({ history, match }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const completeRegistration = useSelector(
    (state) => state.completeRegistration
  );
  const {
    loading: LoadingReg,
    error: errorReg,
    success,
  } = completeRegistration;

  useEffect(() => {
    const userReg = window.localStorage.getItem("emailForRegistration");
    setUserEmail(window.localStorage.getItem("emailForRegistration"));
    if (!userReg) {
      history.push("/login");
    }
    if (success) {
      toast.success("Registration is successfull");
      history.push("/login");
    }
    if (errorReg) {
      toast.error(errorReg);
    }
    if (userInfo) {
      history.push("/login");
    }
  }, [history, userInfo, success, errorReg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return toast.error("Please enter your password");

    if (!verifyPassword) return toast.error("Please re-type your password");

    if (password !== verifyPassword)
      return toast.error("Your password not match");

    if (!address) return toast.error("Please enter your current Address");

    if (!contactNo) return toast.error("Please enter your contact Number");

    try {
      window.localStorage.removeItem("emailForRegistration");
      dispatch(completeRegister(userEmail, name, address, contactNo, password));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div style={{ marginTop: "75px" }}>
      <Container>
        <Row>
          <Col md={12}>
            {LoadingReg && <Loader />}
            <Form
              onSubmit={handleSubmit}
              className="bg-secondary text-dark mt-4 mb-4"
              style={{ borderRadius: "40px", padding: "30px 30px 30px 30px" }}
            >
              <h2>Complete your Registration</h2>
              <Row>
                <Col sm={6}>
                  <Form.Group as={Col} controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Enter email"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group as={Col} controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group as={Col} controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={verifyPassword}
                      onChange={(e) => setVerifyPassword(e.target.value)}
                      placeholder="Confirm Password"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Form.Group controlId="address">
                    <Form.Label>Current Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="Email">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={contactNo}
                      onChange={(e) => setContactNo(e.target.value)}
                      placeholder="Enter contact number"
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Full Name"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Button
                    className="mt-3 justify-content-end"
                    type="submit"
                    variant="primary"
                  >
                    Complete Registration
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegistrationComplete;
