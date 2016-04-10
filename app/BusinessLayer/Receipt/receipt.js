var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//Receipt Header VO
var ReceiptSchema   = new Schema({
    name: String,
    receiptProducts: [{type: Schema.ObjectId, ref: 'ReceiptProduct'}]
});




module.exports = mongoose.model('Receipt', ReceiptSchema);
