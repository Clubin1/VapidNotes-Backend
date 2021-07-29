const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Credit Calc
function creditScoreCalc(min, max) {
    var credArrat = ['300', '400', '500','600', '700', '800']; 
    var randcred = credArrat[(Math.random() * credArrat.length) | 0]
    return randcred
}

function getBank(){
    var myArray = ['Wells Fargo', 'Citigroup', 'Bank of America']; 
    var rand = myArray[(Math.random() * myArray.length) | 0]
    return rand
}

function getMoney(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    studentAcc: {
        type: Boolean,
        required: false,
        default: false
    },
    personalAcc: {
        type: Boolean,
        required: false,
        default: false
    },
    homeAcc: {
        type: Boolean,
        required: false,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    creditScore: {
        type: Number,
        default: creditScoreCalc(300, 800)
    },
    bankAccount: {
        type: String,
        default: getBank()
    },
    bankSum: {
        type: Number,
        default: getMoney(10000, 100000)
    },
    reasonVisit: {
        type: String,
        default: ""
    },
    levelExp: {
        type: Number,
        default: 1
    }
})

module.exports = User = mongoose.model('users', UserSchema);