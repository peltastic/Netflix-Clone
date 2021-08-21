import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false)
    const history = useHistory()

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true)
        } else {
            handleShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar)
        return () => window.removeEventListener("scroll", transitionNavBar)
    }, [])

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents">
                <img className="nav__logo"
                   onClick={() => history.push("/")}
                    src="https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png" alt="" />

                <img className="nav__avatar"
                    onClick={() => history.push("/profile")}
                    src="https://www.flatpanelshd.com/pictures/m-netflixlogo2019.jpg" alt="" />

            </div>

        </div>
    )
}

export default Nav
