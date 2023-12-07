import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DeleteButton from "../components/DeleteButton";

const SingleEnrolment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrolment, setEnrolments] = useState(null);

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/enrolments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setEnrolments(response.data.data);
      })
      .catch((err) => console.error(err));
  });

  if (!enrolment) {
    return <h3>Enrolment not found.</h3>;
  }

  return (
    <>
      <h2>Enrolment: {id}</h2>
      <div>
        <p>
          <b>Title:</b>
          {enrolment.title}
        </p>
        <p>
          <b>Description:</b> {enrolment.description}
        </p>
        <br />
        <Link to={`/enrolments/${id}/edit`}>Edit</Link>
        <DeleteButton id={enrolment.id} resource="enrolments" deleteCallback={() => navigate('/enrolments')} />
      </div>
    </>
  );
};

export default SingleEnrolment;
