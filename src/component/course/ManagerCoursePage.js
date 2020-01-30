import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourse, saveCourse } from "../../redux/action/courseAction";
import { loadAuthors } from "../../redux/action/authorAction";
import { newCourse } from "../../../tools/mockData";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import CourseForm from "./CourseForm";
import Spinner from "../common/Spinner";

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourse,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourse().catch(error => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) {
      errors.title = "Title is required";
    }
    if (!authorId) {
      errors.authorId = "Author is required";
    }
    if (!title) {
      errors.category = "Category is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) {
      return;
    }
    saveCourse(course)
      .then(() => {
        toast.success("Course saved");
        history.push("/courses");
      })
      .catch(err => {
        setSaving(false);
        setErrors({ onSave: err.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.course.length > 0
      ? getCourseBySlug(state.course, slug)
      : newCourse;
  return {
    course,
    courses: state.course,
    authors: state.author
  };
}

const mapDispatchToProps = {
  loadCourse,
  loadAuthors,
  saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
