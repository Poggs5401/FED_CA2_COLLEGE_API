// import { Navbar } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useState, useEffect } from "react";
import './CourseCard.css'


//Import Courses
import AllCourses from "./courses/AllCourses.js";
import SingleCourse from "./courses/SingleCourse.js";
import CreateCourse from "./courses/CreateCourse.js";
import EditCourse from "./courses/EditCourse.js";

//Import Lecturers
import AllLecturers from "./lecturers/AllLecturers.js";
import SingleLecturer from "./lecturers/SingleLecturer.js";
import CreateLecturer from "./lecturers/CreateLecturer.js";
import EditLecturer from "./lecturers/EditLecturer.js";

//Import Enrolments
import AllEnrolments from "./enrolments/AllEnrolments";
import SingleEnrolment from "./enrolments/SingleEnrolment.js";


import Login from "./components/Login.js";
import Register from "./user/Register.js";
import User from "./user/User.js";
import PageNotFound from "./PageNotFound.js";
import Home from "./Home.js";
import NavBar from "./components/NavBar.js";



function App() {
  const [authenticated, setAuthenticated] = useState(false);

  // let protectedRoutes;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true);
    }
  }, []);

  const onAuthenticated = (auth, token) => {
    setAuthenticated(auth);

    if (auth) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  // if (authenticated) {
    // protectedRoutes = (
    //   <>
    //     <Route path="/create" element={<Create />} />
    //     <Route path="/:id/edit" element={<Edit />} />
    //     <Route path="/show/:id" element={<Show />} />
    //   </>
    // );


  // } else {
  //   protectedRoutes = (
  //     <>
  //       <Route path="/create" element={<Navigate to={'/'} />} />
  //       <Route path="/:id/edit" element={<Navigate to={'/'} />} />
  //       <Route path="/show/:id" element={<Navigate to={'/'} />} />
  //     </>
  //   );
  // }

  return (
    <>
      <Router>
        <NavBar
          authenticated={authenticated}
          onAuthenticated={onAuthenticated}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                authenticated={authenticated}
                onAuthenticated={onAuthenticated}
              />
            }
          />

          //Courses
          <Route path="/courses" element={<AllCourses authenticated={authenticated} />} />
          <Route path="/courses/:id" element={<SingleCourse authenticated={authenticated} />} />
          <Route path="/courses/create" element={<CreateCourse authenticated={authenticated} />} />
          <Route path="/courses/:id/edit" element={<EditCourse authenticated={authenticated} />} />

          //Lecturers
          <Route path="/lecturers" element={<AllLecturers authenticated={authenticated} />} />
          <Route path="/lecturers/:id" element={<SingleLecturer authenticated={authenticated} />} />
          <Route path="/lecturers/create" element={<CreateLecturer authenticated={authenticated} />} />
          <Route path="/lecturers/:id/edit" element={<EditLecturer authenticated={authenticated} />} />

          //Enrolments
          <Route path="/enrolments" element={<AllEnrolments authenticated={authenticated} />} />
          <Route path="/enrolments/:id" element={<SingleEnrolment authenticated={authenticated} />} />




          {/* <Route path="/create" element={(authenticated) ? (<Create />) : (<Navigate to={'/'} />) } />
          <Route path="/:id/edit" element={(authenticated) ? (<Edit />) : (<Navigate to={'/'} />) } />
          <Route path="/show/:id" element={(authenticated) ? (<Show />) : (<Navigate to={'/'} />) } /> */}

          {/* {protectedRoutes} */}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
// }
}

export default App;
