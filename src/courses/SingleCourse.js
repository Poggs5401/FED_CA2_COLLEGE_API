import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DeleteButton from "../components/DeleteButton";

const SingleCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setCourse(response.data.data);
      })
      .catch((err) => console.error(err));
  });

  if (!course) {
    return <h3>Course not found.</h3>;
  }

  return (
    <>
      <h2>Course: {id}</h2>
      <div>
        <p>
          <b>Title:</b>
          {course.title}
        </p>
        <p>
          <b>Description:</b> {course.description}
        </p>
        <br />
        <Link to={`/courses/${id}/edit`}>Edit</Link>
        <DeleteButton id={course.id} resource="courses" deleteCallback={() => navigate('/courses')} />
      </div>
    </>
  );
};

export default SingleCourse;
