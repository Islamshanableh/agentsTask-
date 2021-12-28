
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/action/search";
const Navigation = () => {
  const dispatch = useDispatch();
  
    const state = useSelector((state) => {
      return {
        token: state.token.token,
      };
    });
  

 

  const history = useHistory();
  return (
    <>
    {!state.token ? (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
        sticky="top"
        style={{ height: "80px" }}
      >
        <Container>
          <Navbar.Brand>
            <Link to="/home">
              <Image
                className="logo"
                src="https://www.clipartmax.com/png/middle/240-2403197_ico-download-seller-image-seller-icon-png.png"
                width="10%"
                height="10%"
                onClick={() => history.push("/home")}
                style={{ cursor: "pointer" }}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Form>
                  <Form.Control
                    type="text"
                    placeholder="  Search..."
                    onChange={(e)=>{
                      dispatch(setSearch(e.target.value));
                    }}
                  />
              </Form>
            </Nav>
            <Nav>
              
              <Nav.Link>
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Login
                </Link>
              </Nav.Link>
              <Nav.Link eventKey={2}>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Register
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>):(
        <Navbar
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
        sticky="top"
        style={{ height: "80px" }}
      >
        <Container>
          <Navbar.Brand>
            <Link to="/home">
              <Image
                className="logo"
                src="https://www.clipartmax.com/png/middle/240-2403197_ico-download-seller-image-seller-icon-png.png"
                width="10%"
                height="10%"
                onClick={() => history.push("/home")}
                style={{ cursor: "pointer" }}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Form>
                  <Form.Control
                    type="text"
                    placeholder="  Search..."
                    onChange={(e)=>{
                      dispatch(setSearch(e.target.value));
                    }}
                  />
              </Form>
            </Nav>
            <Nav>
              
              <Nav.Link>
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Home
                </Link>
              </Nav.Link>
              
              <Nav.Link eventKey={2}>
                <Link
                  to="/logout"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Logout
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      )}
    </>
  );
};
export default Navigation;
