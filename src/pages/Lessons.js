import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { lessonsById, lessonDeleteSingle } from "../actions/lessonsActions";
import {
  LESSONS_DETAILS_RESET,
  LESSONS_CREATE_RESET,
} from "../constants/lessonsConstants";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Lessons = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const classId = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getLessonById = useSelector((state) => state.getLessonById);
  const { loading, error, page, pages, lessons } = getLessonById;

  const lessonDelete = useSelector((state) => state.lessonDelete);
  const { error: errorDeleteLesson, success: successDeleteLesson } =
    lessonDelete;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch({ type: LESSONS_CREATE_RESET });
      dispatch({ type: LESSONS_DETAILS_RESET });
      dispatch(lessonsById(classId, pageNumber));
    }
    if (successDeleteLesson) {
      dispatch({ type: LESSONS_CREATE_RESET });
      dispatch({ type: LESSONS_DETAILS_RESET });
      dispatch(lessonsById(classId, pageNumber));
    }
    if (errorDeleteLesson) {
      dispatch({ type: LESSONS_CREATE_RESET });
      dispatch({ type: LESSONS_DETAILS_RESET });
      dispatch(lessonsById(classId, pageNumber));
      toast.error(errorDeleteLesson);
    }
  }, [
    userInfo,
    history,
    dispatch,
    classId,
    pageNumber,
    successDeleteLesson,
    errorDeleteLesson,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(lessonDeleteSingle(id));
    }
  };

  return (
    <div style={{ marginTop: "75px" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lesson | Learn and Share Online English Education</title>
      </Helmet>
      <Container>
        <Row>
          <Col md={12}>
            {userInfo && userInfo.role === 1 && (
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">Create new schedule</Tooltip>
                }
              >
                <span className="d-inline-block">
                  <Link
                    to={`/createlesson/${classId}`}
                    className="btn btn-primary mt-3 md-2"
                  >
                    <i className="fas fa-plus-circle"></i>
                  </Link>
                </span>
              </OverlayTrigger>
            )}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Table responsive hover striped className="mt-2">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Time Start</th>
                    <th>Time End</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map((lesson) => (
                    <tr key={lesson._id}>
                      <td>
                        {lesson.title} <br />
                        {lesson.NewLesson ? (
                          <span class="badge bg-danger">New</span>
                        ) : (
                          <span class="badge bg-success">Seen</span>
                        )}
                      </td>
                      <td>
                        {lesson.status === "Finished" ? (
                          <span className="badge bg-success">Finished</span>
                        ) : lesson.status === "Late_Cancellation" ? (
                          <span className="badge bg-warning">
                            Late Cancellation
                          </span>
                        ) : (
                          <span className="badge bg-danger">No Show</span>
                        )}
                      </td>
                      <td>{moment(lesson.start).format("LT")}</td>
                      <td>{moment(lesson.end).format("LT")}</td>
                      <td>{moment(lesson.start).format("LL")}</td>
                      <td>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-disabled">View notes</Tooltip>
                          }
                        >
                          <span className="d-inline-block">
                            <Link
                              style={{ marginRight: "5px" }}
                              to={`/lessonDetails/${lesson._id}`}
                              className="btn btn-success"
                            >
                              <i className="far fa-eye"></i>
                            </Link>
                          </span>
                        </OverlayTrigger>
                        {userInfo && userInfo.role === 1 && (
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-disabled">
                                Update lesson
                              </Tooltip>
                            }
                          >
                            <span className="d-inline-block">
                              <Link
                                style={{ marginRight: "5px" }}
                                to={`/updatelesson/${lesson._id}`}
                                className="btn btn-primary"
                              >
                                <i className="fas fa-edit"></i>
                              </Link>
                            </span>
                          </OverlayTrigger>
                        )}
                        {userInfo && userInfo.role === 1 && (
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-disabled">
                                Create new or update notes
                              </Tooltip>
                            }
                          >
                            <span className="d-inline-block">
                              <Link
                                style={{ marginRight: "5px" }}
                                to={`/createnotes/${lesson._id}`}
                                className="btn btn-primary"
                              >
                                <i className="fas fa-notes-medical"></i>
                              </Link>
                            </span>
                          </OverlayTrigger>
                        )}
                        {userInfo && userInfo.role === 1 && (
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-disabled">
                                Delete this lesson
                              </Tooltip>
                            }
                          >
                            <span className="d-inline-block">
                              <Button
                                variant="danger"
                                onClick={() => deleteHandler(lesson._id)}
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </span>
                          </OverlayTrigger>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            {page && (
              <Pagination>
                {[...Array(pages).keys()].map((x) => (
                  <Pagination.Item active={x + 1 === page}>
                    {" "}
                    <Link key={x + 1} to={`/lessons/${classId}/page/${x + 1}`}>
                      {x + 1}
                    </Link>
                  </Pagination.Item>
                ))}
              </Pagination>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Lessons;
