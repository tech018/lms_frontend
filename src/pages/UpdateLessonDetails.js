import React, { useState, useEffect } from "react";
import {
  Row,
  Container,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updateLessonById,
  lessonSingleDetails,
} from "../actions/lessonsActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LESSON_UPDATE_RESET } from "../constants/lessonsConstants";

const UpdateLessonDetails = ({ history, match }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateLessonDetails = useSelector((state) => state.updateLessonDetails);
  const { loading, error, success } = updateLessonDetails;

  const lessonDetails = useSelector((state) => state.lessonDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    lesson,
  } = lessonDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (userInfo && userInfo.role === 1) {
        dispatch(lessonSingleDetails(match.params.id));
        setTitle(lesson.title);
        if (success) {
          toast.success("Successfully Updated");
          dispatch({ type: LESSON_UPDATE_RESET });
          dispatch(lessonSingleDetails(match.params.id));
        }
        if (error) {
          toast.error(error);
          dispatch({ type: LESSON_UPDATE_RESET });
          dispatch(lessonSingleDetails(match.params.id));
        }
      }
    }
  }, [userInfo, history, dispatch, match, lesson.title, success, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateLessonById({
        _id: match.params.id,
        title,
        status,
      })
    );
  };

  return (
    <div style={{ marginTop: "75px" }}>
      <Container>
        <div style={{ paddingTop: "4rem" }}>
          <Row
            style={{
              width: "30rem",
              margin: "auto",
              border: "1px solid black",
              borderRadius: "20px",
              padding: "2rem",
            }}
          >
            <Col md={12}>
              {loadingDetails ? (
                <Loader />
              ) : errorDetails ? (
                <Message variant="danger">{errorDetails}</Message>
              ) : (
                <>
                  {loading && <Loader />}
                  <h4 className="mt-3 text-center">
                    Update Lesson Title: {lesson.title}
                  </h4>
                  <Form className="mb-3 mt-2" onSubmit={submitHandler}>
                    <Row>
                      <Col md={12}>
                        <FormControl
                          type="text"
                          autoFocus
                          value={title}
                          disabled
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </Col>

                      <Col md={12}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label>Status</Form.Label>
                          <Form.Control
                            as="select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="Finished">Finished</option>
                            <option value="No_Show">No Show</option>
                            <option value="Late_Cancellation">
                              Late Cancellation
                            </option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      type="submit"
                      style={{ marginTop: "1rem" }}
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </Form>
                </>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default UpdateLessonDetails;
