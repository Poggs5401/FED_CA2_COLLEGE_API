import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";
import axios from "axios";
import React from "react";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://college-api.vercel.app/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCourses(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (courses.length === 0) {
    return <h3>There are no courses available.</h3>;
  }

  const courseList = courses.data.map((course) => {
    return (
        <Row key={course.id} className="gap-3 mx-auto course-card" md={3} xs={1}>
          <Card
            style={{ width: "75%", height: "250px" }}
            className="card-hover"
          >
            <Card.Body>
              <Card.Title>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/courses/${course.id}`}
                >
                  {course.title}
                </Link>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{course.code}</Card.Subtitle>
              <p>{course.description}</p>
            </Card.Body>
          </Card>
        </Row>
    );
  });

  console.log(courses);

  return (
    <>
      <h2>All Courses</h2>
      {courseList}
    </>
  );
};

export default AllCourses;
