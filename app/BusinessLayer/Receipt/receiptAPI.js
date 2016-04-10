// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var Receipt = require('./receipt');
var router = express.Router();


// =============================================API ROUTES=====================================================
// more routes for our API will happen here

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Receipt API was Called ...');
    next(); // make sure we go to the next routes and don't stop here
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/receipts')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var receipt = new Receipt();      // create a new instance of the Bear model
        receipt.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        receipt.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Receipt created!' });
        });

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Receipt.find(function(err, receipts) {
            if (err)
                res.send(err);

            res.json(receipts);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/receipts/:receipt_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Receipt.findById(req.params.receipt_id, function(err, receipt) {
            if (err)
                res.send(err);
            res.json(receipt);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {
        // use our bear model to find the bear we want
        Receipt.findById(req.params.receipt_id, function(err, receipt) {

            if (err)
                res.send(err);

            receipt.name = req.body.name;  // update the bears info

            // save the bear
            receipt.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Receipt updated!' });
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Receipt.remove({
            _id: req.params.receipt_id
        }, function(err, receipt) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


// more routes for our API will happen here



module.exports = router;