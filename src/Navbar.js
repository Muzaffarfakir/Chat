import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import "./Navbar.css"
import { Link, BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom"
import Home from "./Home";
import Login from "./Login";
import Sign from "./Sign";
import Profile from "./Profile";
import { useCookies } from "react-cookie"
function Navbar() {
    let [cookies, setCookies] = useCookies(["access_token"])
    //let his=useHistory();
    function logout() {
        window.localStorage.removeItem('token')
        setCookies("access_token", "")
        window.localStorage.removeItem("id")
    }


    return (
        <>
            <BrowserRouter>
                <nav>
                    <h6>McHatM</h6>
                    <ul>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>

                        <li>
                            <Link to={'/Sign'}>Signup</Link>
                        </li>
                        <li>
                            {!cookies.access_token ? (<Link to={'/Login'}>Login</Link>
                            ) : (<Link onClick={logout}>Logout</Link>
                            )}
                        </li>








                    </ul>
                </nav>

                <Routes>
                    <Route
                        path="/"
                        element={<Home />} />



                    <Route
                        path="/Sign"
                        element={<Sign />}
                    />
                    <Route
                        path="/Login"
                        element={<Login />}
                    />

                </Routes>

            </BrowserRouter >

            <hr />


        </>
    )
}
export default Navbar