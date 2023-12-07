import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import { Row } from "react-bootstrap";

const NavBar = ({ authenticated, onAuthenticated }) => {
  const navigate = useNavigate();

  const logout = () => {
    onAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <div className="d-flex gap-3">
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Courses
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/courses">
                All Courses
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/courses/create">
                Create Course
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Lecturers
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/lecturers">
                All Lecturers
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/lecturers/create">
                Add a Lecturer
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Enrolments
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/enrolments">
                All Enrolments
              </Dropdown.Item>
              {/* <Dropdown.Item as={Link} to="/lecturers/create">
                Add a Lecturer
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          {authenticated ? <Button variant="outline-secondary" onClick={logout}>Logout</Button> : ""}
        </div>
      </div>
    </>
  );
};

export default NavBar;
