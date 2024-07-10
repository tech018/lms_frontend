import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  ListGroup,
} from "react-bootstrap";
import HeroImg from "../images/hero.png";
import AcaImg from "../images/academic.png";
import FooterArea from "../images/footer_life.png";
import LearnEnglish from "../images/background_home.jpg";
import FoorterDesign from "../images/footerdesign.png";
import Topdesign from "../images/top_life.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTestimonial } from "../actions/testimonialActions";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { toast } from "react-toastify";
import { register } from "../actions/userActions";
import { USER_REGISTRATION_RESET } from "../constants/userContants";
import YouTube from "react-youtube";
import { getallvideos } from "../actions/videosActions";
import { Helmet } from "react-helmet";

const Home = ({ history }) => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const testimonialList = useSelector((state) => state.testimonialList);
  const { loading, error, testimonials } = testimonialList;

  const youtubeVideos = useSelector((state) => state.youtubeVideos);
  const { loading: loadingVideos, error: errorVideos, videos } = youtubeVideos;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading: loadingUser, error: errorUser, registration } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 768 },
      items: 3,
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: { max: 768, min: 480 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 520, min: 0 },
      items: 1,
      partialVisibilityGutter: 0,
    },
  };

  const opts = {
    height: "250",
    width: "250",
  };

  useEffect(() => {
    dispatch(getallvideos());
    dispatch(listTestimonial());
    if (userInfo && userInfo.role !== 0) {
      history.push(`/dashboard/${userInfo._id}`);
    }
    if (registration) {
      toast.success(registration);
    }
    if (errorUser) {
      toast.error(errorUser);
      dispatch({ type: USER_REGISTRATION_RESET });
    }

    setEmail("");
  }, [dispatch, history, userInfo, registration, errorUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email to register");
    } else {
      dispatch(register(email));
    }
  };

  return (
    <div style={{ marginTop: "68px" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Learn and Share Online English Education</title>
      </Helmet>
      <Image
        src={Topdesign}
        style={{
          position: "fixed",
          width: "100%",
          marginTop: "14px",
          zIndex: "100",
        }}
      />
      <div
        style={{
          backgroundColor: "rgb(0 0 0 / 33%)",
          borderBottom: "1spx solid yellow",
          height: "580px",
        }}
      >
        <Container>
          <Row>
            <Col md={8}>
              <Image
                className="picture_1"
                src={HeroImg}
                style={{
                  position: "absolute",
                  zIndex: "-1",
                  paddingTop: "180px",
                  transform: "scaleX(-1)",
                }}
              />
              <div
                id="herosection"
                className="text-white"
                style={{ paddingLeft: "30px", paddingRight: "30px" }}
              >
                <h1
                  className="mb-5 text-white header1"
                  style={{ marginTop: "130px" }}
                >
                  <i className="fas fa-braille"></i> Welcome to Learn and Share
                  Online English Education Website
                </h1>
                <p className="header-paragraph" style={{ fontSize: "20px" }}>
                  Try our free trial class and test your speaking level now
                </p>
                <Link
                  to="/ourcourses"
                  className="btn btn-info mt-4 mb-5 button-header"
                >
                  View Courses
                </Link>
              </div>
            </Col>
            <Col md={4}>
              {loadingUser && <Loader />}
              <Form
                onSubmit={handleSubmit}
                className="text-white form_register"
                style={{
                  padding: "30px 30px 30px 30px",
                  borderRadius: "30px",
                  backgroundColor: "rgb(2, 58, 122)",
                  marginTop: "125px",
                }}
              >
                <h4 className="mb-4 text-white">
                  <i className="fas fa-running"></i> Hurry up, Register now!
                </h4>
                <Form.Group controlId="emailAddress">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Form.Text className="text-light mb-5">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Button variant="info" className="mt-3" type="submit">
                  Register
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <Image
          src={FoorterDesign}
          style={{ width: "100%", position: "absolute", zIndex: "1" }}
        />
      </div>

      <div
        style={{
          backgroundImage: "url(" + LearnEnglish + ")",
          backgroundPosition: "cover",
        }}
        className="secondSection"
      >
        <div style={{ backgroundColor: "rgba(5, 141, 231, 0.494)" }}>
          <Container>
            <Row>
              <Col sm={7} className="choose">
                <ListGroup
                  className="mt-5"
                  style={{
                    backgroundColor: "rgb(2, 58, 122)",
                    zIndex: "1",
                    position: "relative",
                  }}
                >
                  <h2 className="text-center mt-4 text-white">
                    <i className="far fa-question-circle"></i> Why Choose Us?
                  </h2>
                  <ListGroup.Item
                    className="text-light"
                    style={{ backgroundColor: "rgb(2, 58, 122)" }}
                  >
                    <i className="fas fa-check"></i> Professional, native,
                    competent and experienced teachers
                  </ListGroup.Item>
                  <ListGroup.Item
                    className="text-light"
                    style={{ backgroundColor: "rgb(2, 58, 122)" }}
                  >
                    <i className="fas fa-check"></i> Methodology based on group
                    dynamics to promote learning quickly and efficiently
                  </ListGroup.Item>
                  <ListGroup.Item
                    className="text-light"
                    style={{ backgroundColor: "rgb(2, 58, 122)" }}
                  >
                    <i className="fas fa-check"></i> Highly participatory
                    classes. Special emphasis on communication skills.
                  </ListGroup.Item>
                  <ListGroup.Item
                    className="text-light"
                    style={{ backgroundColor: "rgb(2, 58, 122)" }}
                  >
                    <i className="fas fa-check"></i> Relevant and tailored made
                    content for specific customer needs.
                  </ListGroup.Item>
                  <ListGroup.Item
                    className="text-light"
                    style={{
                      marginBottom: "60px",
                      backgroundColor: "rgb(2, 58, 122)",
                    }}
                  >
                    <i className="fas fa-check"></i> Friendly, work-focused,
                    serious atmosphere.
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={5}>
                <Image
                  className="picture_2"
                  src={AcaImg}
                  style={{
                    width: "400px",
                    margin: "20px 0px 0px 70px",
                    zIndex: "1",
                    position: "relative",
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <h1
                  className="mb-3 text-center"
                  style={{ color: "whitesmoke", marginTop: "40px" }}
                >
                  Featured Videos
                </h1>
                {loadingVideos ? (
                  <Loader />
                ) : errorVideos ? (
                  <Message variant="danger">{errorVideos}</Message>
                ) : (
                  <>
                    <div
                      className="featured"
                      style={{
                        padding: "65px 0px 0px 88px",
                        marginBottom: "200px",
                      }}
                    >
                      <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlaySpeed={2000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-100-px"
                      >
                        {videos.map((items) => (
                          <YouTube
                            style={{ zIndex: "1" }}
                            videoId={items.videoId}
                            opts={opts}
                            className="youtube"
                          />
                        ))}
                      </Carousel>
                    </div>
                  </>
                )}
              </Col>
              <Col md={12}>
                <div className="alert alert-dismissible alert-info mb-5 hvr-bounce-to-left content_3">
                  <h2 className="text-white">
                    <i className="fas fa-user-graduate"></i> OUR ONLINE ACADEMIC
                    PROGRAMS
                  </h2>
                  <p>
                    With the ever dynamic and competitive environment that we
                    live in, it is not only a need to survive with the talents
                    that we are born with. Acquiring new skills and techniques
                    are needed to be globally equipped especially when it comes
                    to learning. Benjamin Franklin once said, “An investment in
                    knowledge pays the best interest.” What better way to invest
                    your future and your children’s future than to avail of our
                    online educational services.
                  </p>
                  <p>
                    We offer different English language courses catered to the
                    ever changing demands and needs of our clients, using
                    various teaching techniques, innovative and up-to-date
                    learning materials, and efficient and competent mentors. Our
                    company offers courses to suit busy or on-the-go clients.
                    You can learn at the comforts of your home or outside at
                    your most convenient and preferred schedule.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Container>
        <Row>
          <Col md={12}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <div className="bg-default">
                <h1 className="text-center mt-5 mb-5">
                  <i className="fas fa-bullhorn"></i> Testimonials
                </h1>

                <Carousel
                  swipeable={false}
                  draggable={false}
                  showDots={true}
                  responsive={responsive}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlaySpeed={1000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container mb-3"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-50-px"
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial._id}>
                      <figure
                        class="text-center testimonials"
                        style={{ paddingRight: "30px", paddingLeft: "30px" }}
                      >
                        <blockquote class="blockquote">
                          <Image
                            roundedCircle
                            src={testimonial.user.picture}
                            style={{ width: "150px" }}
                          />
                          <h5 className="mt-3 mb-3">
                            <strong>
                              {testimonial.user.name},{" "}
                              {testimonial.user.address}
                            </strong>
                          </h5>
                        </blockquote>
                        <figcaption class="blockquote-footer mt-1">
                          <span className="text-warning">
                            <strong>{testimonial.title}</strong>
                          </span>
                          <br />
                          <span title="Source Title">
                            {testimonial.testimony}
                          </span>
                        </figcaption>
                      </figure>
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </Col>
          <Col md={12} className="mb-5">
            {userInfo ? (
              <Link to="/addtestimony" className="btn btn-primary">
                Create Testimony
              </Link>
            ) : (
              <span>
                Please login before you leave a testimony, login{" "}
                <Link className="text-danger" to="/login">
                  here
                </Link>
              </span>
            )}
          </Col>
          <Row></Row>
        </Row>
      </Container>
      <Image src={FooterArea} style={{ width: "100%", position: "absolute" }} />
    </div>
  );
};

export default Home;
