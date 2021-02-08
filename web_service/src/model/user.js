const collection = require('../utilities/connection');
const productDatabase = require('./ProductsDatabase.json');
const orderData = require('./orderData.json');
let user = {}


user.setupDB = () => {
    return collection.getProductCollection().then(prodColl => {
        return prodColl.deleteMany().then(() => {
            return prodColl.insertMany(productDatabase).then((data) => {
                return collection.getOrdersCollection().then( ( orders )=>{
                    return orders.deleteMany().then( ()=>{
                        return orders.insertMany( orderData ).then( ( result )=>{
                         if( result && result.length > 0 ) return data
                         else return null
                        } )
                    } )
                } )
            });
        });
    });
}

user.getCategory = (category) => {
    return collection.getProductCollection().then((model) => {
        return model.find({ "pCategory": category }, { _id: 0 }).then((data) => {
            if (data) {
                return data
            }
            else {
                return null;
            }
        })
    })
}

user.getByName = (name) => {
    console.log(name);
    return collection.getProductCollection().then((model) => {
        return model.find({ "pName": name }, { _id: 0 }).then((data) => {
            if (data) {
                return data
            }
            else {
                return null;
            }
        })
    })
}
user.getById = (id) => {
    return collection.getProductCollection().then((model) => {
        return model.find({ "pId": id }, { _id: 0 }).then((data) => {
            if (data) {
                return data
            }
            else {
                return null;
            }
        })
    })
}

user.getAllOrders = () => {
    return collection.getOrdersCollection().then((model) => {
        return model.find({}, { _id: 0}).then((data) => {
            if (data) {
                return data
            }
            else {
                return null;
            }
        })
    })
}
user.getOrdersById = (id) => {
    // console.log(id);
    return collection.getOrdersCollection().then((model) => {
        return model.find({orderId:id}, { _id: 0 }).then((data) => {
            if (data) {
                return data
            }
            else {
                return null;
            }
        })
    })
}
user.generateId = () => {
    let matches=[]
    return collection.getOrdersCollection().then((model) => {
        return model.distinct("orderId").then((ids) => {
            //console.log(ids);
            ids.map((id)=>{
                numId=parseInt(id.match(/(\d+)/))
                matches.push(numId);    
            })
            return("O-"+(Math.max(...matches)+1));           
        })
    })
}
//pushOrders
user.pushOrders=(order)=>{
    return collection.getOrdersCollection().then((collection) => {
        return collection.create(order).then((data) => {
            if (data)
                return data;
            else
                return null;
        })
    })
}
module.exports = user