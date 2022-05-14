import Course from "./Course";

export default function CourseList({ courses }) {
  const courseList = courses.map((course) => (
    <Course name={course.name} CRN={course.CRN} />
  ));

  return <div className="courseList">{courseList}</div>;
}
