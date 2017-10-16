import React from 'react'
import { Link } from 'react-router-dom'

import Layout from '../Layout'

const Home = () =>
  <section className="container">
    <h3>Welcome to the event creator</h3>
    <Link to="/new">Create Your Event</Link>
  </section>

export default Home
