import { useState, useEffect } from "react";
import AddCourseForm from "./adder/AddCourseForm";
import AdderHeader from "./adder/AdderHeader";
import CourseList from "./adder/CourseList";

export default function CourseAdder({ setLoggedIn }) {
  const [formOpen, setFormOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  function updateCourses() {
    fetch("/getCourses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }
  useEffect(updateCourses, []);

  function deleteCourse(CRN) {
    fetch("/removeCourse", {
      method: "POST",
      body: JSON.stringify({ CRN: CRN }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.value) {
          setCourses(courses.filter((course) => course.CRN !== CRN));
        }
      });
  }

  function addCourse(CRN, name) {
    if (courses.filter((course) => course.CRN === CRN).length !== 0) {
      return;
    }
    fetch("/addCourse", {
      method: "POST",
      body: JSON.stringify({ CRN: CRN, name: name }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.value) {
          setCourses(courses.concat([{ CRN: CRN, name: name }]));
        }
      });
  }

  function logout() {
    fetch("/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(() => setLoggedIn(false));
  }

  return (
    <div className="adderContainer">
      <AdderHeader formOpen={formOpen} setFormOpen={setFormOpen} />
      {formOpen ? <AddCourseForm addCourse={addCourse} /> : <></>}
      <CourseList courses={courses} deleteCourse={deleteCourse} />
      <button onClick={logout} className="btn">
        Logout
      </button>
    </div>
  );
}
