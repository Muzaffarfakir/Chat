import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios"
import { useNavigate } from "react-router-dom";
function Sign() {
    ///functions
    let [email, SetEmail] = useState();
    let [pass, SetPass] = useState();
    let [name, SetName] = useState();
    let nav = useNavigate();


    function send() {
        if (email === undefined || pass === undefined || name === undefined) {
            alert("You Enter a Invalid Creadintails")

        }
        else {
            axios.post("https://chat-back-krto.onrender.com/signData", { email, pass, name });
            nav("/login")
        }

    }
    function LoginBack() {
        nav("/Login")
    }



    return (
        <>
            <div className="card my-3 mx-3">
                <h2 className="text-center">Sign Up From here </h2>

                <form className="my-3 mb-3 mx-3">
                    <div class="form-group">
                        <input style={{ marginTop: "30px" }} type="text" onChange={(e) => { SetName(e.target.value) }} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                    </div>
                    <div class="form-group">
                        <input style={{ marginTop: "30px" }} type="email" onChange={(e) => { SetEmail(e.target.value) }} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div class="form-group">
                        <input style={{ marginTop: "30px" }} type="password" onChange={(e) => { SetPass(e.target.value) }} class="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>

                    <button onClick={send} style={{ marginTop: "30px" }} type="submit" class="btn btn-primary">Submit</button>
                </form>
                <p className="text-center my-3">I  have Account  <span onClick={LoginBack} class="btn btn-primary">Login</span></p>

            </div>


        </>
    )

}
export default Sign;
