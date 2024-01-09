const mongoose = require("mongoose")
// mongoose.connect("mongodb://localhost:27017/youtubeRegistration")
mongoose.connect("mongodb+srv://harshal_050:Harshal%402772@cluster0.hchtgxj.mongodb.net/gwokdatabase?retryWrites=true&w=majority")

.then(()=>{
    console.log("Succes")
})
.catch((err)=>{
    console.log(err)
})


