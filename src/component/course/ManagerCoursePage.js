import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadCourse } from "../../redux/action/courseAction";
import { loadAuthors } from "../../redux/action/authorAction";
import PropTypes from "prop-types";

function ManagerCoursePage({ courses, author, loadCourse, loadAuthors }) {
  useEffect(() => {
    if (courses.length === 0) {
      this.props.loadCourse().catch(err => {
        alert("Loading fail" + err);
      });
    }

    if (author.length === 0) {
      this.props.loadAuthor().catch(err => {
        alert("Loading fail" + err);
      });
    }
  }, []);

  return (
    <>
      <h2>Manage Course</h2>
    </>
  );
}

ManagerCoursePage.propTypes = {
  loadCourse: PropTypes.func.isRequired,
  loadAuthor: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  author: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    courses: state.course,
    author: state.author
  };
};

const mapDispatchToProps = {
  loadCourse,
  loadAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerCoursePage);
