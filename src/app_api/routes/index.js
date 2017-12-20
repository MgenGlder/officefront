var express = require('express');
var router = express.Router();

var ctrlPatients = require('../controllers/patients');
var ctrlOrders = require('../controllers/orders');

router.get('/patient', ctrlPatients.getPatient);
router.post('/patients', ctrlPatients.createPatient);
router.get('/patients', ctrlPatients.getAllPatients);
router.get('/orders', ctrlOrders.getOrder);
router.post('/oders', ctrlOrders.createOrder);
module.exports = router;