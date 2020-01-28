import React from "react";
import { connect } from "react-redux";
import * as courseAction from "../../redux/action/courseAction";
import PropTypes from "prop-types";
//import { bindActionCreators } from "redux";

class CoursePage extends React.Component {
  state = {
    course: {
      title: ""
    }
  };

  handleChange = e => {
    const course = { ...this.state.course, title: e.target.value };
    this.setState({ course });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Course</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursePage.propTypes = {
  createCourse: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    courses: state.course
  };
};

const mapDispatchToProps = {
  createCourse: courseAction.createCourse
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
const mapDispatchToProps = dispatch => {
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
