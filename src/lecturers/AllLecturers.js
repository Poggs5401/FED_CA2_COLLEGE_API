import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";
import axios from "axios";
import React from "react";

const AllLecturers = () => {
  const [lecturers, setLecturers] = useState([]);

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://college-api.vercel.app/api/lecturers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setLecturers(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (lecturers.length === 0) {
    return <h3>There are no lecturers available.</h3>;
  }

  const lecturerList = lecturers.data.map((lecturer) => {
    return (
        <Row key={lecturer.id} className="gap-3 mx-auto course-card" md={3} xs={1}>
          <Card
            style={{ width: "75%", height: "250px" }}
            className="card-hover"
          >
            <Card.Body>
              <Card.Title>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/lecturers/${lecturer.id}`}
                >
                  {lecturer.name}
                </Link>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{lecturer.phone}</Card.Subtitle>
              <p>{lecturer.email}</p>
            </Card.Body>
          </Card>
        </Row>
    );
  });

  console.log(lecturers);

  return (
    <>
      <h2>All Lecturers</h2>
      {lecturerList}
    </>
  );
};

export default AllLecturers;
