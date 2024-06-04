import React, { useEffect, useState } from "react";
import {
  adminlistAnnounce,
  deleteAnnouncement,
} from "../actions/announcementActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Pagination,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Markup } from "interweave";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const AdminAnnouncement = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const announceAdmin = useSelector((state) => state.announceAdmin);
  const { loading, error, adminAnnounce, page, pages } = announceAdmin;

  const announcementDelete = useSelector((state) => state.announcementDelete);
  const { success: successDeleteAnn, error: errorDeleteAnn } =
    announcementDelete;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(adminlistAnnounce(keyword, pageNumber));
    }
    if (userInfo && userInfo.role === 1) {
      history.push(`/dashboard/${userInfo._id}`);
    }
    if (userInfo && userInfo.role === 0) {
      history.push(`/dashboard/${userInfo._id}`);
    }
    if (userInfo && userInfo.role === null) {
      history.push(`/dashboard/${userInfo._id}`);
    }
    if (successDeleteAnn) {
      dispatch(adminlistAnnounce(keyword, pageNumber));
    }
    if (errorDeleteAnn) {
      dispatch(adminlistAnnounce(keyword, pageNumber));
    }
  }, [
    userInfo,
    history,
    dispatch,
    pageNumber,
    keyword,
    successDeleteAnn,
    errorDeleteAnn,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteAnnouncement(id));
    }
    if (error) {
      toast.error("Error delete");
    }
  };

  return (
    <div style={{ marginTop: "75px" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Announcement | Learn and Share Online English Education</title>
      </Helmet>
      <Container>
        <Row>
          <Col md={8}>
            <Link to="/createAnnoucement" className="btn btn-primary mt-3">
              <i className="fas fa-plus-circle"></i>
            </Link>
          </Col>
          <Col md={4}>
            <Form>
              <FormControl
                type="text"
                value={keyword}
                placeholder="Search by title"
                onChange={(e) => setKeyword(e.target.value)}
                className="mt-3 justify-content-end"
              />
            </Form>
          </Col>
          <Col md={12}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Row>
                {adminAnnounce.map((announce) => (
                  <Col md={6}>
                    <Card key={announce._id} className="mt-3 mb-3">
                      <Card.Body>
                        <Card.Title>{announce.title}</Card.Title>
                        <Card.Text>
                          <Markup content={announce.details} />
                        </Card.Text>
                        <Card.Text>
                          {userInfo && userInfo.role === 2 && (
                            <Link
                              style={{ marginRight: "10px" }}
                              to={`/updateannoucement/${announce._id}`}
                              className="btn btn-success"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                          )}
                          {userInfo && userInfo.role === 2 && (
                            <Button
                              variant="danger"
                              onClick={() => deleteHandler(announce._id)}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          )}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
          <Col md={12}>
            <Pagination>
              {[...Array(pages).keys()].map((x) => (
                <Pagination.Item active={x + 1 === page}>
                  {" "}
                  <Link key={x + 1} to={`/announcements/page/${x + 1}`}>
                    {x + 1}
                  </Link>
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminAnnouncement;
