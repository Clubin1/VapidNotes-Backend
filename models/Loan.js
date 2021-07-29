const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const LoanSchema = new Schema({
    loanName: {
        type: String,
        required: true
    },
   loanType: {
       type: String,
       required: true
   }
})

module.exports = Loan = mongoose.model('loans', LoanSchema);