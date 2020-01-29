import React from "react";
import { connect } from "react-redux";
import * as courseAction from "../../redux/action/courseAction";
import * as authorAction from "../../redux/action/authorAction";
import PropTypes from "prop-types";

import CourseList from "./CourseList";
//import { bindActionCreators } from "redux";

class CoursePage extends React.Component {
  componentDidMount() {
    if (this.props.courses.length === 0) {
      this.props.loadCourse().catch(err => {
        alert("Loading fail" + err);
      });
    }

    if (this.props.author.length === 0) {
      this.props.loadAuthor().catch(err => {
        alert("Loading fail" + err);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Course</h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursePage.propTypes = {
  loadCourse: PropTypes.func.isRequired,
  loadAuthor: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  author: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    courses:
      state.author.length === 0
        ? []
        : state.course.map(course => {
            return {
              ...course,
              authorName: state.author.find(
                author => author.id === course.authorId
              ).name
            };
          }),
    author: state.author
  };
};

const mapDispatchToProps = {
  createCourse: courseAction.createCourse,
  loadCourse: courseAction.loadCourse,
  loadAuthor: authorAction.loadAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursePage);

/*Truyen action vao reducer gom 4 cach
C1: goi thang vao func
this.props.dispatch(courseAction.createCourse(this.state.course));

C2:Su dung objcet mapDispatchToProps
const mapDispatchToProps = dispatch => {
  return {
    createCourse: course => dispatch(courseAction.createCourse(course))
  };
};
this.props.createCourse(this.state.course);

C3:Goi ham ho tro trong redux
import { bindActionCreators } from "redux";
function mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(courseAction, dispatch)
  };
};
this.props.createCourse(this.state.course);

C4: mapDispatchToProps RETURN OBJECT (THONG DUNG NHAT)
const mapDispatchToProps = {
  createCourse: courseAction.createCourse
};
*/
