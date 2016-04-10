var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//Receipt Products VO - receipt child VO
var ReceiptProductSchema   = new Schema({
    name: String,
    design: String,
    _receiptid: {type: Schema.ObjectId, ref: 'Receipt'}

});

module.exports = mongoose.model('ReceiptProduct', ReceiptProductSchema);