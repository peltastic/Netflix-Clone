import React from 'react'
import "./Profile.css"
import Nav from "../Nav"
import { selectUser } from '../features/userSlice'
import {useSelector} from 'react-redux'
import { auth } from '../firebase'
import PlanScreen from './PlanScreen'

function Profile() {
    const user =useSelector(selectUser)
    return (
        <div className="profileScreen">
         <Nav />
        <div className="profileScreen__body">
            <h1>Edit Profile</h1>
            <div className="profileScreen__info">
                <img src="https://www.flatpanelshd.com/pictures/m-netflixlogo2019.jpg" alt="" />
                <div className="profileScreen__details">
                    <h2>{user.email}</h2>
                    <div className="profileScreen__plans">
                        <h3>Plans</h3>
                        <PlanScreen />
                        <p></p>
                        <button 
                        onClick={() => {
                            auth.signOut()
                        }}
                        className="profileScreen__signout">Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Profile
