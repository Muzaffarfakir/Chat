const express = require('express');
const app = express();
const fs=require("fs");
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server)
let d=require("dotenv").config();
let p=process.env.P;
console.log(p)
let port=process.env.PORT || 3000
let path=require("path");
app.use(express.static("./public"))
let users={};
///////// io part fro. here
io.on("connection",(socket)=>{
  console.log("connected")
  socket.on("new-user-join",(name)=>{
    console.log(name)
    users[socket.id]=name;
    socket.broadcast.emit("user-join",name)
  })
  socket.on("send",(message)=>{
    socket.broadcast.emit("receive",{message:message,name:users[socket.id]})
  })
});
//io.attach(server)
server.listen(port);

