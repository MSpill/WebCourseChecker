import { useState } from "react";

export default function AddCourseForm({ addCourse }) {
  const [CRN, setCRN] = useState("");
  const [name, setName] = useState("");

  function checkCRN(e) {
    setCRN(e.target.value);
    if (e.target.value.length === 5) {
      fetch("/getCourseName", {
        method: "POST",
        body: JSON.stringify({ CRN: e.target.value }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setName(data.value);
        });
    } else if (e.target.value.length > 0) {
      setName("No course associated with this CRN.");
    } else {
      setName("");
    }
  }

  return (
    <div className="addCourseForm">
      <form>
        <label>CRN</label>
        <input
          className="form-input"
          type="text"
          value={CRN}
          style={{ marginBottom: "0px" }}
          onChange={checkCRN}
        />
        <label className="courseName">{name}</label>
        <button
          className="btn"
          style={{ backgroundColor: "green", maxWidth: "200px" }}
          onClick={(e) => {
            e.preventDefault();
            addCourse(CRN, name);
          }}
        >
          Add Course
        </button>
      </form>
    </div>
  );
}
