// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var router = express.Router();

//Load VOs
var Receipt = require('./receipt');
var ReceiptProduct = require('./receiptProduct');


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
    .post(function(req, res) {

        //Instantiate the new Recipe and new Product
        var receipt = new Receipt();
        var receiptProduct = new ReceiptProduct();

        //Fulfill the Recipe
        receipt.name = req.body.name;
        receipt.receiptProducts = [];
        receipt.receiptProducts.push(receiptProduct._id);
        //Fulfill the Product
        receiptProduct.design = req.body.design;
        receiptProduct._receiptid = receipt._id;

        // Save the recipe header
        receipt.save(function(err) {
            if (err)
                res.send(err);

            // Save the recipe product
            receiptProduct.save(function(err){
                if (err)
                    res.send(err);
                res.json({ message: 'Receipt created!' });
            });


        });

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Receipt.find({}).populate('receiptProducts').exec(function(err, receipts) {
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