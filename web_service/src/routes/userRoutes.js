const express = require("express");
const userRouting = express.Router();
const userService = require('../service/user');
const Order = require('../model/beanClass/orderBean')

//Setup the database
userRouting.get('/setupDB', (req, res, next) => {
    userService.setupDB().then( response =>{
        if(response) res.json({message:"Database cleared and loaded..."})
    }).catch( error =>{
       next(error);
    })
})

userRouting.get('/:category', (req, res, next) => {
    let category=req.params.category;
    userService.getCategory(category).then( response =>{
        if(response) res.json(response)
    }).catch( error =>{
       next(error);
    })
})

userRouting.get('/search/:pName', (req, res, next) => {
    let pName=req.params.pName;
    userService.getProductByName(pName).then( response =>{
        if(response) res.json(response)
    }).catch( error =>{
       next(error);
    })
})

userRouting.get('/item/:pId', (req, res, next) => {
    let pId=req.params.pId;
    userService.getProductByPid(pId).then( response =>{
        if(response) res.json(response)
    }).catch( error =>{
       next(error);
    })
})
userRouting.get('/orders/getAll',(req,res,next)=>{
    userService.getOrders().then( response =>{
        if(response) res.json(response)
    }).catch( error =>{
       next(error);
    })
})
userRouting.get('/orders/getById/:id',(req,res,next)=>{
    let orderId=req.params.id;
    userService.getOrdersById(orderId).then( response =>{
        if(response) res.json(response)
    }).catch( error =>{
       next(error);
    })
})
userRouting.post('/addOrder/:total', function (req, res, next) {    
    const order=req.body;
    const total=req.params.total;
    userService.addOrders(order,total).then(function (userDetails) {
        res.json(userDetails);
        res.status=200;
    }).catch(err => next(err));
})
module.exports = userRouting