import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useCookies } from "react-cookie";
function Login() {
    let nav = useNavigate();
    let [name, SetName] = useState()
    let [_, setCookies] = useCookies(["access_token"]);
    function signBack() {
        nav("/sign")


    }
    function send() {

        axios.post("https://chat-back-krto.onrender.com/login", { name }).then((res) => {
            if (res.data.mess === "exist") {
                setCookies("access_token", res.data.token)
                window.localStorage.setItem("id", res.data.id);
                window.localStorage.setItem("token", res.data.token)
                nav("/")
            }
            else {
                alert("wrong Creadintails")
            }
        })

    }


    return (
        <>
            <div className="card my-3 mx-3">
                <h2 className="text-center">Login From here </h2>

                <div className="my-3 mb-3 mx-3">
                    <div class="form-group">
                        <input style={{ marginTop: "30px" }} type="text" onChange={(e) => { SetName(e.target.value) }} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                    </div>
                   

                    <button onClick={send} style={{ marginTop: "30px" }} type="submit" class="btn btn-primary">Submit</button>
                    <p className="text-center my-3">I Dont have Account Yet <span onClick={signBack} class="btn btn-primary">Sign</span></p>
                </div>

            </div>





        </>
    )

}
export default Login;
