import React, { useEffect, useState } from "react";
import { examlist, examdelete } from "../actions/examActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Table,
  FormControl,
  Spinner,
  Button,
  Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DELETE_EXAM_RESET } from "../constants/examConstants";

const Exam = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const examList = useSelector((state) => state.examList);
  const { loading, error, exams, pages, page } = examList;

  const deleteExam = useSelector((state) => state.deleteExam);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success,
    examDelete,
  } = deleteExam;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (userInfo && userInfo.role !== 2) {
        history.push(`/dasboard/${userInfo._id}`);
      } else {
        dispatch(examlist(keyword, pageNumber));
      }
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
    history,
    userInfo,
    pageNumber,
    dispatch,
    keyword,
    error,
    errorDelete,
    success,
    examDelete,
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(examdelete(id));
    }
  };
  return (
    <div style={{ marginTop: "80px" }}>
      <Container>
        <Row>
          <Col md={12}>
            <h1 className="mt-5 text-center">
              List of Speaking Assessment Test
            </h1>
          </Col>
          <Col md={5}>
            <FormControl
              className="mt-3"
              placeholder="Search student name"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Col>

          <Col md={12}>
            {loadingDelete && <Spinner animation="grow" />}
            {loading ? (
              <Spinner animation="grow" />
            ) : (
              <Table striped bordered hover style={{ marginTop: "2rem" }}>
                <thead>
                  <tr>
                    <th>Student</th>

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
                      <td>{items.studentName}</td>
                      <td>{items.fluandcoh}</td>
                      <td>{items.lexires}</td>
                      <td>{items.gramandaccu}</td>
                      <td>{items.pronun}</td>
                      <td>{items.finalScore}</td>
                      <td>
                        <Link
                          to={`/admin/speakingassesment/${items.id}`}
                          className="btn btn-primary"
                        >
                          View
                        </Link>
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
            )}
            {page && (
              <Pagination>
                {[...Array(pages).keys()].map((x) => (
                  <Pagination.Item active={x + 1 === page}>
                    {" "}
                    <Link
                      key={x + 1}
                      to={`/admin/speakingassesment/page/${x + 1}`}
                    >
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

export default Exam;
