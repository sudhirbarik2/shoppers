const { Schema } = require('mongoose');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/shopCart"

const orders = Schema({
    orderId:{type:String},
    orders:[],
    totalPrice:{type:Number},
},{collection:"orders"})

const productData = Schema({
    pid: { type: String },
    pName: { type: String },
    pDescription: { type: String },
    pRating: { type: Number },
    pCategory: { type: String },
    price: { type: Number },
    color: [],
    image: { type: String },
    specification: String,
    dateFirstAvailable: {
        date: { type: Date, default: new Date().toISOString() }
    },
    dateLastAvailable: {
        date: { type: Date, default: new Date().toISOString() }
    },
    pSeller: {
        s_Id: { type: String },
        pDiscount: { type: Number, default: 0 },
        pQuantity: { type: Number },
        pShippingCharges: { type: Number }
    },
}, { collection: "productData" })
let connection = {}



connection.getProductCollection = () => {
    //establish connection and return model as promise
    return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(database => {
        return database.model('productData', productData)
    }).catch(error => {
        let err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    });
}
connection.getOrdersCollection=()=>{
    return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(database => {
        return database.model('orders', orders)
    }).catch(error => {
        let err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    });
}
module.exports = connection;