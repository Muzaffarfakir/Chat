////////////////reuire all libs here
let express = require("express");
let app = express();
let cors = require("cors");
let port = process.env.PORT || 8000;
let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let server = require("http").createServer(app);
let io = require("socket.io")(server);

/////////////////////////////////
///////////////// global variables init here //////
let url = "mongodb://fakirmuzaffar771:Muzaffar@ac-mevcrfn-shard-00-00.wypay9b.mongodb.net:27017,ac-mevcrfn-shard-00-01.wypay9b.mongodb.net:27017,ac-mevcrfn-shard-00-02.wypay9b.mongodb.net:27017/?ssl=true&replicaSet=atlas-10fnmw-shard-0&authSource=admin&retryWrites=true"
let par = {
    useNewUrlparser: true,
    useUnifiedTopology: true
}
//////////////////////////////////////////
//////connect with databse ///////
mongoose.connect(url, par).then((res) => {
    console.log("eastablish ")
}).catch((er) => {
    console.log(er)
})
////////////////////////////////
//////// Schemas Or Models here ??
let userSC = new mongoose.Schema({
    name: String,
    email: String,
    pass: String,
    mess: [{ text: String }]

})
let User = new mongoose.model("Users", userSC)
////////////////midlearews////////////////
app.use(cors());
app.use(express.json());

/////////////////////////////////////////
////////routings here////////
app.post("/signData", (req, res) => {
    console.log(req.body)
    let data = new User({
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass
    })
    data.save();

})
app.post("/login", async (req, res) => {
    let data = await User.findOne({ name: req.body.name });


    if (data) {
        let token = jwt.sign({ id: data._id }, "muju")

        res.json({ mess: "exist", id: data._id, token: token });


    }
    else {
        res.send("not")

    }

})
app.get("/allusers", async (req, res) => {
    let data = await User.find();
    res.send(data)

})


app.post("/usersMessageaddToArray", async (req, res) => {
    let id = req.body.id;
    let mess = req.body.mess;
    console.log(id, mess)
    await User.findOneAndUpdate({ _id: id }, { $push: { mess: { text: mess } } })





})
//////////////////io coonection////
io.on("connection", (socket) => {
    socket.on('join', (data) => {
        io.emit("mess", [data])
    })
})



/////////////////////

//////listen /////
server.listen(port)
//////////////////
