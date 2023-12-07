import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DeleteButton from "../components/DeleteButton";

const SingleLecturer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lecturer, setLecturer] = useState(null);

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/lecturers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setLecturer(response.data.data);
      })
      .catch((err) => console.error(err));
  });

  if (!lecturer) {
    return <h3>Lecturer not found.</h3>;
  }

  return (
    <>
      <h2>Lecturer: {id}</h2>
      <div>
        <p>
          <b>Name:</b>
          {lecturer.name}
        </p>
        <h3>
          <b>Contact Information;</b>
        </h3>
        <p>
        {lecturer.phone}
        <br />
        {lecturer.email}
        </p>
        <br />
        <Link to={`/lecturers/${id}/edit`}>Edit</Link>
        <DeleteButton id={lecturer.id} resource="lecturers" deleteCallback={() => navigate('/lecturers')} />
      </div>
    </>
  );
};

export default SingleLecturer;
