const db = require('../models')

const Student = db.students

var msg = ""
var exists = false

const homePage = async(req,res) => {
    res.render("form", {
        check: exists,
        msg: msg
    });
}

const getAllStudents = async (req, res) => {
    await Student.findAll().then(result => {
        console.log(result)
        res.render("students", {
            msg:msg, 
            students: result,
            check: exists
        });
        return(result)
    }).catch(err => {
        console.log(err)
    })
}

const addStudents = async(req,res) => {
    const {first_name,last_name,reg_no,stclass,age} = req.body;
    const regno = await Student.findOne({where:{reg_no:req.body.reg_no}});
    if(regno){
    msg = "Registration number exists"
    exists = true
    res.redirect('/api/students/')
    return(msg)
    }else{
        const newStudent = await Student.create({
            first_name,last_name,reg_no,stclass,age
        });
        res.redirect('/api/students/all')
    }
}

const deleteStudent = async (req, res) => {
    const regno = await Student.findOne({where:{reg_no:req.body.reg_no}});
    if(regno){
    let id = req.params.id
    await Student.destroy( { where: { id: id } })
    res.redirect('/api/students/all')
    }else{
        return("Null")
    }
}

const updateStudent = async (req, res) => {
    const regno = await Student.findOne({where:{reg_no:req.body.reg_no}});
    let id = req.params.id
    await Student.update(req.body, { where: { id: id } })
    res.redirect('/api/students/all')
}

module.exports = {
    getAllStudents,
    addStudents,
    homePage,
    deleteStudent,
    updateStudent
}