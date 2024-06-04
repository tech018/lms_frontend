import React from "react";
import { Container, Image, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

const { Brand, Toggle, Collapse } = Navbar;

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Navbar
        style={{ backgroundColor: "#003976" }}
        expand="lg"
        variant="dark"
        fixed="top"
      >
        <Container>
          <Brand>
            <Image src={Logo} style={{ width: "250px" }} />
          </Brand>
          <Toggle aria-controls="basic-navbar-nav" />
          <Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav className="mr-auto">
              {userInfo ? (
                <>
                  {userInfo && userInfo.role === 0 && (
                    <Link to="/" className="nav-link">
                      <i className="fas fa-home"></i> Home
                    </Link>
                  )}
                  <Link to={`/dashboard/${userInfo._id}`} className="nav-link">
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                  </Link>
                  {userInfo && userInfo.role === 1 ? (
                    <Link></Link>
                  ) : (
                    <Link to="/coursesoffer" className="nav-link">
                      <i className="fab fa-discourse"></i> Courses Offer
                    </Link>
                  )}
                  <Link to="/library" className="nav-link">
                    <i className="fas fa-book-open"></i> Library
                  </Link>

                  {userInfo && userInfo.role === 1 && (
                    <Link to="/dashboard/teacher/examlist" className="nav-link">
                      <i class="fas fa-diagnoses"></i> Exams
                    </Link>
                  )}

                  <NavDropdown
                    title={userInfo.email.substring(
                      0,
                      userInfo.email.indexOf("@")
                    )}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item as={Link} to={`/details/${userInfo._id}`}>
                      <i className="fas fa-user-cog"></i> Account Details
                    </NavDropdown.Item>
                    {userInfo && userInfo.role === 0 && (
                      <NavDropdown.Item
                        as={Link}
                        to={`/myapplications/${userInfo._id}`}
                      >
                        <i className="fas fa-file-alt"></i> Enrolled Course
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Link to="/" className="nav-link">
                    <i className="fas fa-home"></i> Home
                  </Link>
                  <Link to="/publiclibrary" className="nav-link">
                    <i className="fas fa-book-open"></i>Library
                  </Link>
                  <Link to="/about" className="nav-link">
                    <i className="far fa-question-circle"></i> About
                  </Link>
                  <Link to="/login" className="nav-link btn btn-warning">
                    <i className="fas fa-user"></i> Login
                  </Link>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
