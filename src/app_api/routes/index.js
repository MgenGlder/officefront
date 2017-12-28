var express = require('express');
var router = express.Router();

var ctrlPatients = require('../controllers/patients');
var ctrlOrders = require('../controllers/orders');

router.get('/patient', ctrlPatients.getPatient);
router.post('/patient', ctrlPatients.createPatient);
router.get('/patients/all', ctrlPatients.getAllPatients);
router.patch('/patient', ctrlPatients.updatePatient);

router.get('/order', ctrlOrders.getOrder);
router.post('/order', ctrlOrders.createOrder);
router.post('/order/update', ctrlOrders.updateOrder);
router.get('/orders/all', ctrlOrders.getAllOrders);
router.get('/orders/patient/all', ctrlOrders.getAllOrdersSpecificPatient);

module.exports = router;