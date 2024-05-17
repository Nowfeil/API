const express = require('express')
const fs = require('fs')
const studentFile = require("./index.json")
const app = express()
const PORT = 2000;

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Welcome to the server")
})


app.get('/students',(req,res)=>{
    res.send(studentFile)
})

app.post('/students', (req, res) => {
    let obj = req.body;
    let stdObj = {
        "id": parseInt(obj.id),
        "name": obj.name
    };
    studentFile.students.push(stdObj);
    let objs = {
        "students": studentFile.students
    };
    fs.writeFile("index.json", JSON.stringify(objs), (err) => {
        if (err) {
            res.status(500).send("Error occurred");
        } else {
            res.send("added");
        }
    });
});

app.put('/students/:id',(req,res)=>{
    let uid = parseInt(req.params.id)
    var stdObj = studentFile.students;
    var find = stdObj.find((std)=>std.id==uid)
    var bodyObj = req.body;
    find.id = parseInt(bodyObj.id)
    find.name = bodyObj.name;
    const updatedStudents = JSON.stringify(studentFile)
    fs.writeFile("index.json",updatedStudents, (err) => {
        if (err) {
            res.status(500).send("Error occurred");
        }
    });
    res.send("Updated Successfully")
})

app.delete('/students/:id',(req,res)=>{
    let uid = parseInt(req.params.id)
    var stdObj = studentFile.students;
    var find = stdObj.find((std)=>std.id==uid)
    var idx = stdObj.indexOf(find)
    stdObj.splice(idx,1)
    const updatedStudents = JSON.stringify(studentFile)
    fs.writeFile("index.json",updatedStudents, (err) => {
        if (err) {
            res.status(500).send("Error occurred");
        }
    });
    res.send("Deleted Successfully")
})

app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})
