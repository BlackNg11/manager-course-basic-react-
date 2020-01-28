import React from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'

const HomePage = (props) => {
  return (
    <div className='jumbotron'>
      <h1>Hello Word</h1>
      <p>React,Redux and React Router</p>
      <Link to='about' className='btn btn-primary btn-lg'>
        Learn more
      </Link>
    </div>
  )
}

export default HomePage
