import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createtestimony } from "../actions/testimonialActions";
import {
  Col,
  Form,
  Row,
  Container,
  FormControl,
  Button,
} from "react-bootstrap";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { TESTIMONIAL_CREATE_RESET } from "../constants/testimonialConstants";

const AddTestimony = ({ history }) => {
  const [title, setTitle] = useState("");
  const [testimony, setTestimony] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createTestimony = useSelector((state) => state.createTestimony);
  const { loading, error, success } = createTestimony;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch({ type: TESTIMONIAL_CREATE_RESET });
    if (success) {
      toast.success("Successfully added your testimony");
      history.push("/");
    }
    if (error) {
      toast.error(error);
    }
  }, [userInfo, history, success, error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Please enter a titile");
    } else if (!testimony) {
      toast.error("Please enter your testimony");
    } else {
      dispatch(createtestimony(title, testimony));
    }
  };

  return (
    <div style={{ marginTop: "75px" }}>
      <Container>
        <Row>
          <Col md={12}>
            <h1 className="mt-5">Create a Testimony</h1>
            {loading ? (
              <Loader />
            ) : (
              <Form onSubmit={handleSubmit} className="mt-5 mb-5">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="message">
                      <Form.Label>Title</Form.Label>
                      <FormControl
                        type="text"
                        autoFocus
                        placeholder="Please enter a title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="message">
                      <Form.Label>Testimony</Form.Label>
                      <FormControl
                        as="textarea"
                        rows={3}
                        value={testimony}
                        onChange={(e) => setTestimony(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit" variant="warning">
                  Create
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddTestimony;
