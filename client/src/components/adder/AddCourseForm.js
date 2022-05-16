import { useEffect, useState } from "react";

export default function AddCourseForm({ addCourse, terms }) {
  const [term, setTerm] = useState(Object.entries(terms)[0][1]);
  const [CRN, setCRN] = useState("");
  const [name, setName] = useState("");

  function checkCRN(term, CRN) {
    setCRN(CRN);
    if (CRN.length === 5) {
      fetch("/getCourseName", {
        method: "POST",
        body: JSON.stringify({ term: term, CRN: CRN }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setName(data.value);
        });
    } else if (CRN.length > 0) {
      setName("");
    } else {
      setName(" "); // will not display an error because it is not an empty string
    }
  }

  return (
    <div className="addCourseForm">
      <form>
        <label>Term</label>
        <select
          className="form-input"
          onChange={(e) => {
            setTerm(e.target.value);
            checkCRN(e.target.value, CRN);
          }}
        >
          {Object.entries(terms).map(([name, code]) => (
            <option value={code} key={code}>
              {name}
            </option>
          ))}
        </select>
        <label>CRN</label>
        <input
          className="form-input"
          type="text"
          value={CRN}
          style={{ marginBottom: "0px" }}
          onChange={(e) => checkCRN(term, e.target.value)}
        />
        <label className="courseName">
          {name ? name : "No course is associated with this CRN."}
        </label>
        <button
          className="btn"
          style={{ backgroundColor: "green", maxWidth: "200px" }}
          onClick={(e) => {
            e.preventDefault();
            addCourse(term, CRN, name);
          }}
        >
          Add Course
        </button>
      </form>
    </div>
  );
}
