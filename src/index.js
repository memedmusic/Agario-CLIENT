const express = require("express")
const app = express()
const fs = require('fs');
const formidable = require('express-formidable');
app.use(formidable())
app.use(express.static("src/client"))
app.get("/api/skin", function(req,res){
var skins = []
fs.readdirSync("./src/client/skins").forEach(file => {
  skins.push(file.replace(".png", ""));
});
res.send(skins)
})
app.post("/api/upload",function(req,res){
if(req.files.photo != undefined){
  if(req.files.photo.name.length < 16&&req.files.photo.name.includes(".png")){
if(!fs.existsSync(`./src/client/skins/${req.files.photo.name}`)){
fs.createReadStream(req.files.photo.path).pipe(fs.createWriteStream(`./src/client/skins/${req.files.photo.name}`))
res.sendStatus(200)
}
else{
  res.sendStatus(409)
}
}else{
  res.sendStatus(400)
}
} else{
  res.sendStatus(400)
}
})
app.listen(8000)


