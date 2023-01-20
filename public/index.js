let socket=io("https://chat-i73z.onrender.com")
let btn=document.getElementById("btn")
let inp=document.getElementById("inp")
let con=document.getElementById("con")
let name=prompt("Enter name Plzz to Join");
btn.addEventListener("click",(e)=>{
  e.preventDefault();
  let mess=inp.value;
  append(`${mess}`,"right");
  socket.emit("send",mess);
  inp.value="";
})
let append(message,pos)=>{
  let mesEl=document.createElement("div");
  mesEl.innerText=message;
  mesEl.classList.add("message")
  mesEl.classList.add(pos)
  con.append(mesEl)
  
}
socket.emit("new-user-join",name)
socket.on("user-join",(name)=>{
  append(`${name} is join the chat`,'right')
  socket.on("receive",(data)=>{
    append(`${data.message} ${data.user}`,"left")
  })
})

 
