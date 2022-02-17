const express = require("express");
const mysql = require("mysql");
const path = require("path");

const app = express();

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "nodemysql"
});
var exists = false;
var msg = "";

//Connect
db.connect((error) => {
	if(error){
		throw error;
	}else{
		console.log("Mysql connected");
	}
});

app.use(express.json());                                     
app.use(express.urlencoded({extended: true}));               
app.use(express.text());                                    
app.use(express.json({ type: 'application/json'}));  
// app.use(express.json)
app.set("view engine", "ejs");

//configurations or settings 
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req,res) => {
	// var exists = false;
	res.render("form", {
	check: false
	});
	
}); 

app.post("/", (req,res)=>{
	let product = req.body;

	// console.log(req.body);
	const sql1 = `SELECT * FROM students WHERE reg_no = "${req.body.reg_no}"`;
	db.query(sql1, product, (err, result) => {
		if(err) throw err;
		console.log(result);
		if(req.body.first_name == undefined && req.body.last_name == undefined && req.body.reg_no == undefined && req.body.age == undefined && req.body.class == undefined){
			return("Please provide valid arguments")
		}
		if(result.length > 0){
			// return("Exists");
			exists = true;
			console.log(exists);
			msg = "Registration number exists";
		}else{
			const sql = "INSERT INTO students SET ?";
			db.query(sql, product, (err, result) => {
				if(err) throw err;
				// console.log(result);
				
			});
			// res.json({message: "Student added!", student });
		}
		res.render("form", {
			check: exists,
			msg: msg
		});
		
	});
	

});

app.get("/students", (req,res) => {
	const sql1 = "SELECT * FROM students";
	db.query(sql1, (err, result) => {
	// console.log(result)
	if(err) throw err;
	console.log(result);
	res.render("students", {
		msg:msg,
		students: result,
		check: exists
	});
	// res.status(200).send(result)
	 return (result);
	});
	
});

app.get('*', (req, res) => {

    res.status(404).send("Page not found")
});

app.post('/students/:id', (req,res) => {
	console.log(req.params.id)
	const sql1 = `SELECT * FROM students WHERE reg_no = "${req.body.reg_no}"`;
	db.query(sql1, (err, result) => {
		if(err) throw err;
		console.log(result);
		if(req.body.first_name == undefined && req.body.last_name == undefined && req.body.reg_no == undefined && req.body.age == undefined && req.body.class == undefined){
			return("Please provide valid arguments")
		}
		if(result.length > 0){

			exists = true;
			console.log(exists);
			msg = "Registration number exists";
		}else{
			const sql = `UPDATE students SET first_name="${req.body.fname}", last_name="${req.body.lname}", reg_no="${req.body.regno}", class="${req.body.class}", age =${req.body.age}  WHERE id=${req.params.id}`;
			db.query(sql, (err, result) => {
				if(err) throw err;
	
				msg = "Student successfully updated"
			});
			res.redirect('/students')
		}
		
		
	});
})

app.post('/delstudent/:id', (req,res) => {
	const sql = `DELETE FROM students WHERE id= ${req.params.id}`
	db.query(sql, (err, result) => {
		console.log(result)
		exists = true
		msg = "Student successfully deleted"
		res.redirect('/students')
	})
})

const port = process.env.port || 3000

app.listen(port, () =>{
	console.log("Server running on port 3000");
});

module.exports = app