var express = require('express');
var router = express.Router();

var ctrlPatients = require('../controllers/patients');

router.get('/patients', ctrlPatients.getPatient);
router.post('/patients', ctrlPatients.createPatient);
router.get('/patients', ctrlPatients.getAllPatients);

module.exports = router;