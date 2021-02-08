const dbLayer = require('../model/user');
const validator = require("../utilities/validator");
const Order = require('../model/beanClass/orderBean')
user = {}

user.setupDB = () => {
    return dbLayer.setupDB().then(response => {
        if (response) {
            return response;
        } else {
            let err = new Error('Insertion Failed');
            err.status = 500;
            throw err;
        }
    });
}


// user.RegisterUser = (registerData) => {
//     // validator.validateEmail(registerData.uEmail)
//     // validator.validatePassword(registeData.uPass)
//     // validator.validateDOB(registerData.uDOB)
//     // validator.validateName(registerData.uName)
//     return dbLayer.userRegister(registerData).then( response => {
//         return response
//     })
// }

user.getCategory = (category) => {
    return dbLayer.getCategory(category).then(response => {
        return response
    })
}
user.getProductByName = (name) => {
    return dbLayer.getByName(name).then(response => {
        return response
    })
}
user.getProductByPid = (id) => {
    return dbLayer.getById(id).then(response => {
        return response
    })
}
user.getOrders = () => {
    return dbLayer.getAllOrders().then(response => {
        return response
    })
}
user.getOrdersById = (id) => {
    return dbLayer.getOrdersById(id).then(response => {
        return response
    })
}
user.addOrders = (order,total) => {
    console.log(order);
    return dbLayer.generateId().then((id) => {
        let orderId = id;
        let orderDetails=new Order(
            {
                orderId:id,
                orders:order,
                totalPrice:total,
            }
        )
        

        return dbLayer.pushOrders(orderDetails).then((orderData) => {
            return orderData
        })
    })
}
module.exports = user