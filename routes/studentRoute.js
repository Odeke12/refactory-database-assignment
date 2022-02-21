const roleController = require('../controllers/studentControllers')

const router = require('express').Router()

router.get('/all', roleController.getAllStudents)
router.post('/add', roleController.addStudents)
router.post('/delete/:id', roleController.deleteStudent)
router.post('/update/:id', roleController.updateStudent)
router.get('/', roleController.homePage)

module.exports = router