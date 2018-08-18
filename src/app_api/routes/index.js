var express = require('express');
var jwt = require('express-jwt');
var invalidSignature = require('../utils/verifyJwt').invalidJwtSignature;
var router = express.Router();

var ctrlPatients = require('../controllers/patients');
var ctrlOrders = require('../controllers/orders');
var ctrlAuth = require('../controllers/authentication');
//TODO: Make restful
router.get('/patient', jwt({secret: 'secret'}), ctrlPatients.getPatient, invalidSignature);
router.post('/patient/create', jwt({secret: 'secret'}), ctrlPatients.createPatient, invalidSignature);
router.get('/patients/all', jwt({ secret: 'secret' }), ctrlPatients.getAllPatients, invalidSignature)
router.patch('/patient', jwt({secret: 'secret'}), ctrlPatients.updatePatient, invalidSignature);

router.get('/order', jwt({secret: 'secret'}), ctrlOrders.getOrder, invalidSignature);
router.post('/order', jwt({secret: 'secret'}), ctrlOrders.createOrder, invalidSignature);
router.post('/order/update', jwt({secret: 'secret'}), ctrlOrders.updateOrder, invalidSignature);
router.get('/orders/all', jwt({ secret: 'secret' }), ctrlOrders.getAllOrders, invalidSignature);
router.get('/orders/patient/all', jwt({secret: 'secret'}), ctrlOrders.getAllOrdersSpecificPatient, invalidSignature);
router.post('/authenticate', ctrlAuth.authenticate);
router.post('/register', ctrlAuth.register);
router.get('/orderOptions', jwt({secret: 'secret'}), ctrlOrders.orderOptions, invalidSignature);
module.exports = router;