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

app.use(express.urlencoded({ extended: true }));
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

	console.log(req.body);
	const sql1 = `SELECT * FROM students WHERE reg_no = "${req.body.reg_no}"`;
	db.query(sql1, product, (err, result) => {
		if(err) throw err;
		console.log(result);
		if(result.length > 0){
			console.log("Exists");
			exists = true;
			console.log(exists);
			msg = "Registration number exists";
		}else{
			const sql = "INSERT INTO students SET ?";
			db.query(sql, product, (err, result) => {
				if(err) throw err;
				console.log(result);
				
			});
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
	if(err) throw err;
	console.log(result);
	res.render("students", {
		students: result,
		check: false
	});
	});
});

app.listen("3000", () =>{
	console.log("Server running on port 3000");
});