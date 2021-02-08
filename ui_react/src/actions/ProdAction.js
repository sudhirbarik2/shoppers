let prodObj={}
prodObj.setForm=(pid)=>{
    return {
        type:'SET_CART',
        pid:pid
    }
}
prodObj.removeForm=(pid)=>{
    return {
        type:'REMOVE_CART',
        pid:pid
    }
}
export default prodObj;