import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./Home.css"
import axios from "axios";
import { io } from "socket.io-client"
import { useCookies } from "react-cookie"
import Login from "./Login";
function Home() {
    let [names, Setnames] = useState([]);
    let [mess, SetMess] = useState('');
    let [M, SetM] = useState([]);
    let [d, Setd] = useState();

    let [cookies, SetCookies] = useCookies(["access_token"])
    let t = useRef();
    let socket = io.connect("http://localhost:8000/", { transports: ["websocket", "polling"] });



    function getdata() {
        fetch("http://localhost:8000/allusers").then((res) => res.json()).then((data) => {
            console.log(data)
            Setnames(data)
        })
    }

    function send(e) {
        socket.emit("join", mess)
        t.current.value = ""
        let date = new Date();
        Setd(`${date.getHours()}:${date.getMinutes()}`);
        console.log(e)


    }
    function user(id) {
        axios.post('http://localhost:8000/usersMessageaddToArray', { id, mess })


    }
    useEffect(() => {
        getdata();





    }, []);
    useEffect(() => {
        socket.on("mess", (data) => {
            SetM([...M, data])
        });

    }, [socket])


    return (
        <>

            {!cookies.access_token ? (<Login />) : (
                <>
                    <div className="d-flex">

                        <div style={{ border: "1px" }} id="side">
                            <h5>Freind List</h5>

                            {names.map((el) => {
                                return <div  className="d-flex mx-3 my-3" >
                                    <h4>{el.name}</h4>
                                    <hr></hr>
                                    <div className="d-flex  mx-3">
                                    </div>
                                </div>
                            })}


                        </div>

                        <div style={{ border: "1px solid black", height: "90vh", width: "70vw",  overflow:"scroll"}}>
                            {M.map((el) => {
                                return <div > <p className="bg-primary text-white mx-3 my-3 mb-3 p-3">{el} </p></div>
                            })}

                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" ref={t} placeholder="Enter a Message" onChange={(e) => { SetMess(e.target.value) }} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div class="input-group-append">
                            <button onClick={send} className="btn btn-primary mx-3 ">Send</button>

                        </div>
                    </div>

                </>

            )}
        </>

    )

}
export default Home