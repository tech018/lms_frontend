import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  userinfodetails,
  updatepicture,
  updatephoto,
} from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import moment from "moment";
import { toast } from "react-toastify";
import { UPDATE_USER_PHOTO_RESET } from "../constants/userContants";
import { Helmet } from "react-helmet";

const AccountSettings = ({ history, match }) => {
  const [avatar, setAvatar] = useState("");
  const id = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userInfoDetails = useSelector((state) => state.userInfoDetails);
  const { loading, error, userdetails } = userInfoDetails;

  const userUpdatePhoto = useSelector((state) => state.userUpdatePhoto);
  const {
    loading: loadingPicture,
    error: errorPicture,
    userpicture,
  } = userUpdatePhoto;

  const userUpdateImage = useSelector((state) => state.userUpdateImage);
  const { loading: loadingImage, error: errorImage, success } = userUpdateImage;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(userinfodetails(id));
      if (errorPicture) {
        toast.error(errorPicture);
      }
      if (userpicture) {
        setAvatar(userpicture.url);
      }
      if (errorImage) {
        toast.error(errorImage);
      }
      if (success) {
        dispatch(userinfodetails(id));
        dispatch({ type: UPDATE_USER_PHOTO_RESET });
        setAvatar("");
      }
    }
  }, [
    history,
    dispatch,
    userInfo,
    id,
    errorPicture,
    userpicture,
    success,
    errorImage,
  ]);

  const changeAvatar = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    let formData = new FormData();
    formData.append("file", file);

    dispatch(updatepicture(formData));
  };

  const handleupdatePhoto = (e) => {
    e.preventDefault();
    if (!avatar) {
      toast.error("Please upload a picture first");
    } else {
      const imageUrl = userpicture && userpicture.url;
      dispatch(updatephoto(id, imageUrl));
    }
  };
  return (
    <div style={{ marginTop: "75px" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {`${userInfo && userInfo.name}`} | Account Info | Learn and Share
          Online English Education
        </title>
      </Helmet>
      <Container>
        <Row className="mb-3">
          <Col md={3}>
            {loadingImage && <Loader />}
            <Image
              src={userdetails && userdetails.picture}
              style={{ width: "200px", margin: "48px 20px 20px 20px" }}
              className="rounded-circle"
            />
            <Form onSubmit={handleupdatePhoto}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="file"
                  name="file"
                  id="file_up"
                  onChange={changeAvatar}
                />
                {loadingPicture && <Loader />}
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="form-control"
                />
              </div>
              <Button
                disabled={!avatar}
                type="submit"
                className="mt-3"
                variant="primary"
              >
                Update Photo
              </Button>
            </Form>
          </Col>
          <Col md={9}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <ListGroup className="mb-3 mt-5">
                <ListGroup.Item>
                  Name: {userdetails && userdetails.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  Email: {userdetails && userdetails.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  Address: {userdetails && userdetails.address}
                </ListGroup.Item>
                <ListGroup.Item>
                  Contact No: {userdetails && userdetails.contactno}
                </ListGroup.Item>
                <ListGroup.Item>
                  Member since :{" "}
                  {userdetails && moment(userdetails.createdAt).format("lll")}
                </ListGroup.Item>
              </ListGroup>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountSettings;
