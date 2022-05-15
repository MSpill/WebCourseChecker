import { useState } from "react";
import AddCourseForm from "./adder/AddCourseForm";
import AdderHeader from "./adder/AdderHeader";
import CourseList from "./adder/CourseList";

export default function CourseAdder({ setLoggedIn }) {
  const [formOpen, setFormOpen] = useState(false);

  const courses = [
    {
      name: "Computer Org & Program - Sec A01 Plus some other stuff",
      CRN: 123,
    },
    {
      name: "MAMA",
      CRN: 145,
    },
  ];

  function logout() {
    fetch("/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(() => setLoggedIn(false));
  }

  return (
    <div className="adderContainer">
      <AdderHeader formOpen={formOpen} setFormOpen={setFormOpen} />
      {formOpen ? <AddCourseForm /> : <></>}
      <CourseList courses={courses} />
      <button onClick={logout} className="btn">
        Logout
      </button>
    </div>
  );
}
