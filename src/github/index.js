import React from 'react'
import Helmet from 'react-helmet'
import { Container } from 'reactstrap'
import ReactGA from 'react-ga'
import Users from './containers/Users'
import './style.css'

function Home() {
  ReactGA.pageview(window.location.pathname + window.location.search)
  return (
    <div id='home'>
      <Helmet title='Checking user repos' />
      <Container>
        <h2 className='text-center'>
          GitHub UI
        </h2>
        <Users />
      </Container>
    </div>
  )
}

export default Home
