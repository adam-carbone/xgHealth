mongodb://xghealth:D21JgVSWdYdo@ds057954.mongolab.com:57954/heroku_63lfnmml

var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://xghealth:D21JgVSWdYdo@ds057954.mongolab.com:57954/heroku_63lfnmml', ['patients']);

/* GET All Todos */
router.get('/patients', function(req, res, next) {
db.patients.find(function(err, patients) {
if (err) {
res.send(err);
} else {
res.json(patients);
}
});
});

/* GET One Todo with the provided ID */
router.get('/patient/:id', function(req, res, next) {
db.patients.findOne({
_id: mongojs.ObjectId(req.params.id)
}, function(err, patients) {
if (err) {
res.send(err);
} else {
res.json(patients);
}
});
});
/* POST/SAVE a Todo */
router.post('/patient', function(req, res, next) {
var patient = req.body;
if (!patient.text || !(patient.isCompleted + '')) {
res.status(400);
res.json({
"error": "Invalid Data"
});
} else {
db.patients.save(patient, function(err, result) {
if (err) {
res.send(err);
} else {
res.json(result);
}
})
}
});
/* PUT/UPDATE a Todo */
router.put('/patient/:id', function(req, res, next) {
var patient = req.body;
var updObj = {};
if (patient.isCompleted) {
updObj.isCompleted = patient.isCompleted;
}
if (patient.text) {
updObj.text = patient.text;
}
if (!updObj) {
res.status(400);
res.json({
"error": "Invalid Data"
});
} else {
db.patients.update({
_id: mongojs.ObjectId(req.params.id)
}, updObj, {}, function(err, result) {
if (err) {
res.send(err);
} else {
res.json(result);
}
});
}
});
/* DELETE a Todo */
router.delete('/patient/:id', function(req, res) {
db.patients.remove({
_id: mongojs.ObjectId(req.params.id)
}, '', function(err, result) {
if (err) {
res.send(err);
} else {
res.json(result);
}
});
});
module.exports = router;
