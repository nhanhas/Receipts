var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReceiptSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Receipt', ReceiptSchema);