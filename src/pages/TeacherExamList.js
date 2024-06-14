import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  FormControl,
  Button,
  Spinner,
  Dropdown,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { teacherexamlist, examdelete } from "../actions/examActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DELETE_EXAM_RESET } from "../constants/examConstants";

const TeacherExamList = ({ history, match }) => {
  const [keyword, setKeyword] = useState("");
  const pageNumber = 1;
  const [pageSize, setPageSize] = useState(10);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const teachersExamList = useSelector((state) => state.teachersExamList);
  const { loading, error, exams } = teachersExamList;

  const deleteExam = useSelector((state) => state.deleteExam);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success,
    examDelete,
  } = deleteExam;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (userInfo && userInfo.role !== 1) {
      history.push(`/dashboard/${userInfo._id}`);
    } else {
      dispatch(
        teacherexamlist(
          keyword,
          pageNumber,
          userInfo && userInfo.email,
          pageSize
        )
      );
    }
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(examDelete.message);
      dispatch({ type: DELETE_EXAM_RESET });
    }
    if (errorDelete) {
      toast.error(errorDelete);
      dispatch({ type: DELETE_EXAM_RESET });
    }
  }, [
    userInfo,
    history,
    pageNumber,
    keyword,
    error,
    dispatch,
    errorDelete,
    success,
    examDelete,
    pageSize,
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(examdelete(id));
    }
  };

  return (
    <div style={{ marginTop: "7rem" }}>
      <Container>
        <Row>
          <Col md={12}>
            <h2 className="text-center mb-5">Public assessment exam test</h2>
          </Col>
          <Col md={6}>
            <FormControl
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by email"
            />
          </Col>
          <Col md={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Page Size
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {[4, 10, 20, 30, 40, 50, 100].map((size) => (
                    <Dropdown.Item
                      onSelect={() => setPageSize(size)}
                      key={size}
                    >
                      {size}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <Link
                to="/dashboard/teacher/examlist/create"
                style={{ float: "right" }}
                className="btn btn-primary"
              >
                Create Assessment Test
              </Link>
            </div>
          </Col>
          <Col md={12}>
            {loadingDelete && <Spinner animation="grow" />}
            {loading ? (
              <Spinner animation="grow" />
            ) : (
              <>
                <Table className="mt-5" triped bordered hover>
                  <thead>
                    <tr>
                      <th>Student Name/Email</th>
                      <th>Fluency and coherence</th>
                      <th>Lexical Resource Score</th>
                      <th>Grammar range and accuracy</th>
                      <th>Pronunciation</th>
                      <th>Final Score</th>
                      <th>actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map((items) => (
                      <tr key={items._id}>
                        <td>
                          {items.studentName}/{items.email}
                        </td>
                        <td>{items.fluandcoh}</td>
                        <td>{items.lexires}</td>
                        <td>{items.gramandaccu}</td>
                        <td>{items.pronun}</td>
                        <td>{items.finalScore}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(items._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TeacherExamList;
