var express = require('express'),
    router = express.Router();

var { getQuotations, getProcessMeachne, processStatusUpdate,
    processSave, getProcessid, processUpdate,
    addProcessrecord, getProcessRecord, getProcessRecordByid,
    updateProcessrecord, getCustomers } = require("../controller/queries/process");


router.post('/api/updatePrcoessStatus', processStatusUpdate);
router.post('/api/processSave', processSave);
router.post('/api/processUpdate', processUpdate);
router.get('/api/getProcessByid/:id', getProcessid);
router.post('/api/addProcessrecord', addProcessrecord);
router.get('/api/getProcessRecord/:id', getProcessRecord);
router.get('/api/getProcessRecordByid/:id', getProcessRecordByid);
router.post('/api/updateProcessrecord', updateProcessrecord);
router.get('/api/getProcessMeachne', getProcessMeachne);
router.get('/api/getQuotations/:code/:quentity/:positions?', getQuotations);
router.get('/api/getCustomer/:customerId', getCustomers);
module.exports = router;
