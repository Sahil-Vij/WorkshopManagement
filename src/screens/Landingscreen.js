import React from 'react'
import { Link } from 'react-router-dom'

function Landingscreen() {
  return (
    <div className='row landing justify-content-center'>
        <div className='col-md-9 my-auto text-center' style={{borderRight:'8px solid white'}}>
            <h2 style={{color:'white',fontSize:'120px'}}>Craft It Yourself</h2>
            <h1 style={{color:'white'}}>"There is only one boss the Customer</h1>
            <Link to='/home'>
                <button className='btn' style={{color:'black',backgroundColor:'white',marginTop:'20px'}}>Get Started</button>
            </Link>
        </div>
    </div>
  )
}

export default Landingscreen