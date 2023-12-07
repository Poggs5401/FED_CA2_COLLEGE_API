import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CreateEnrolment = () => {
  let token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    date: "",
    time: "",
    status: "",
    course_id: "",
    lecturer_id: "",
  });

  const errorStyle = {
    color: "red",
    fontStyle: "bold",
  };

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const isRequired = (fields) => {
    let included = true;
    setErrors({});

    fields.forEach((field) => {
      if (!form[field]) {
        included = false;
        setErrors((prevState) => ({
          ...prevState,
          [field]: {
            message: `${field} is required!`,
          },
        }));
        console.log(`${field} is required`);
      }
    });
    return included;
  };

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/lecturers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setLecturers(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCourses(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("submitted form");

    if (isRequired(["date", "time", "status", "course_id", "lecturer_id"])) {
      let token = localStorage.getItem("token");

      console.log(form);

      axios
        .post("https://college-api.vercel.app/api/enrolments", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate(`/enrolments`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const lecturerOptions = lecturers.map((lecturer) => {
    return (
      <option key={lecturer.id} value={lecturer.id}>
        {lecturer.name}
      </option>
    );
  });

  const courseOptions = courses.map((course) => {
    return (
      <option key={course.id} value={course.id}>
        {course.title}
      </option>
    );
  });

  return (
    <>
      <h2>Create Enrolment</h2>

      <form onSubmit={submitForm}>
        <div>
          {" "}
          Date:{" "}
          <input
            type="date"
            onChange={handleForm}
            value={form.date}
            name="date"
          />
          <span style={errorStyle}>{errors.date?.message}</span>
        </div>
        <div>
          {" "}
          Time:{" "}
          <input
            type="time"
            onChange={handleForm}
            value={form.time}
            name="time"
          />
          <span style={errorStyle}>{errors.time?.message}</span>
        </div>
        <div>
          {" "}
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" onChange={handleForm} >
            <option value="">Select a Status</option>
            <option value="career_break">Career Break</option>
            <option value="assigned">Assigned</option>
            <option value="interested">Interested</option>
            <option value="associate">Associate</option>
          </select>
        </div>
        <div>
          {" "}
          <label htmlFor={courses.id}>Course</label>
          <select id={courses.id} name="course_id" onChange={handleForm}>
          <option value="">Select a Course</option>
            {courseOptions}
          </select>
          <span style={errorStyle}>{errors.course_id?.message}</span>
        </div>
        <div>
          {" "}
          <label htmlFor={lecturers.id}>Lecturer</label>
          <select id={lecturers.id} name="lecturer_id" onChange={handleForm}>
          <option value="">Select a Lecturer</option>
            {lecturerOptions}
          </select>
          <span style={errorStyle}>{errors.lecturer_id?.message}</span>
        </div>

        <input type="submit" />
      </form>
    </>
  );
};

export default CreateEnrolment;
