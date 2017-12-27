var express = require('express');
var router = express.Router();

var ctrlPatients = require('../controllers/patients');
var ctrlOrders = require('../controllers/orders');

router.get('/patient', ctrlPatients.getPatient);
router.post('/patient', ctrlPatients.createPatient);
router.get('/patients', ctrlPatients.getAllPatients);
router.get('/order', ctrlOrders.getOrder);
router.post('/order', ctrlOrders.createOrder);
router.get('/orders', ctrlOrders.getAllOrders);
module.exports = router;