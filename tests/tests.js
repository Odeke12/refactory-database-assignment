const app = require('../server')
var assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const res = require('express/lib/response');
//Assertion type
chai.should()

chai.use(chaiHttp);

describe('GET', () => {
    it('Should have a list of students ', (done) => {
        chai
        .request(app)
        .get('/api/students/all')
        .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            // response.body.should.be.eq(3);
        // this.timeout(500);
        done();
        })
    });

    it('Should not get all the students', (done) => {
        chai
        .request(app)
        .get('/studenasdf')
        .end((err, response) => {
            response.should.have.status(404);

        done();
        })
    });

})

describe('POST ', () => {
    it('Should post a new student', (done) => {
        const student = {
            '_method': 'post',
            first_name : "Tayebwa",
            last_name : "Crispus",
            reg_no : "18/U/21109/PS",
            age: 12,
            stclass: "P6"
        }
        chai
        .request(app)
        .post('/api/students/add')
        .send(student)
        .type('form')
        .end((err, response) => {

            student.should.have.property('first_name')
            student.should.have.property('last_name')
            student.should.have.property('reg_no')
            student.should.have.property('age')
            console.log(response.body)
            // response.body.should.have.property('message').eql('Student successfully added!');
            response.should.have.status(200);

        done();
        })
    });

})

// describe('DELETE STUDENT ', () => {
//     it('Should delete a student', (done) => {

//         chai
//         .request(app)
//         .post('/api/students/delete/2')
//         // .type('form')
//         .end((err, response) => {
//             // response.body.should.have.property('message').eql('Student successfully added!');
//             response.should.have.status(400);

//         done();
//         })
//     });

// })

