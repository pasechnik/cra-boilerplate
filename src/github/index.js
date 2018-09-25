import React from 'react'
import Helmet from 'react-helmet'
import GLayout from './containers/GLayout'
import './style.css'

const Home = () => (
  <div id='home'>
    <Helmet title='GitHub UI' />
    <GLayout />
  </div>
)

export default Home
