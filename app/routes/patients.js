mongodb://xghealth:D21JgVSWdYdo@ds057954.mongolab.com:57954/heroku_63lfnmml

var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://xghealth:D21JgVSWdYdo@ds057954.mongolab.com:57954/heroku_63lfnmml', ['patients'], {authMechanism: 'ScramSHA1'});

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

/* GET Medications for Patient with the provided ID */
router.get('/patientMedications/:id', function(req, res, next) {
    db.patients.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, patient) {
        if (err) {
            res.send(err);
        } else {
            res.json(patient.Medications);
        }
    });
});

/* GET Medications for Patient with the provided ID */
router.get('/patientVitals/:id', function(req, res, next) {
    db.patients.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, patient) {
        if (err) {
            res.send(err);
        } else {
            res.json(patient.Vitals);
        }
    });
});

/* GET One Patient with the provided ID */
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
router.post('/patientVitals', function(req, res, next) {
    var patient = req.body;
    if (!patient.text) {
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

/* PUT/UPDATE a Vital */
router.put('/patientVitals/:id', function(req, res, next) {
    var vital = req.body;
    var updObj = {};
    db.patients.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, patient) {
        if (err) {
            res.send(err);
        } else {
            updObj = patient;
        }
    });

    updObj.vital = vital;

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

module.exports = router;
