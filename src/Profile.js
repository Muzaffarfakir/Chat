import React from "react";
import Login from "./Login";
import Navbar from "./Navbar";
import { useCookies } from "react-cookie";
function Profile() {
    let [cookies, setCookies] = useCookies(['access_token'])

    {
        cookies.access_token ? (<Navbar />) : (<Navbar />
        )
    }



}
export default Profile