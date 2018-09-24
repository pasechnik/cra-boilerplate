import React from 'react'
import Helmet from 'react-helmet'
import ReactGA from 'react-ga'
import GLayout from './containers/GLayout'
import './style.css'

function Home() {
  ReactGA.pageview(window.location.pathname + window.location.search)
  return (
    <div id='home'>
      <Helmet title='GitHub UI' />
      <GLayout />
    </div>
  )
}

export default Home
