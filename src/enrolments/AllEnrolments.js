import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";
import axios from "axios";
import React from "react";

const AllEnrolments = () => {
  const [enrolments, setEnrolments] = useState([]);

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://college-api.vercel.app/api/enrolments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setEnrolments(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (enrolments.length === 0) {
    return <h3>There are no enrolments available.</h3>;
  }

  const enrolmentList = enrolments.data.map((enrolment) => {
    return (
        <Row key={enrolment.id} className="gap-3 mx-auto enrolment-card" md={3} xs={1}>
          <Card
            style={{ width: "75%", height: "250px" }}
            className="card-hover"
          >
            <Card.Body>
              <Card.Title>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/enrolments/${enrolment.id}`}
                >
                  {enrolment.lecturer.name}
                </Link>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{enrolment.course.code}</Card.Subtitle>
              <p>{enrolment.course.description}</p>
            </Card.Body>
          </Card>
        </Row>
    );
  });

  console.log(enrolments);

  return (
    <>
      <h2>All Enrolments</h2>
      {enrolmentList}
    </>
  );
};

export default AllEnrolments;
