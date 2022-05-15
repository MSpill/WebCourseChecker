import Course from "./Course";

export default function CourseList({ courses, deleteCourse }) {
  const courseList = courses.map((course) => (
    <Course
      name={course.name}
      CRN={course.CRN}
      key={course.CRN}
      onDelete={() => deleteCourse(course.CRN)}
    />
  ));

  return <div className="courseList">{courseList}</div>;
}
