let initState={
    pid:[]
}
let prodReducer=(state=initState,action)=>{
    switch(action.type){
        case 'SET_CART':
            state={
                ...state,
                pid:[...state.pid,action.pid]
            };
            break;
        case 'REMOVE_CART':
            let arr=[...state.pid];
            state={
                ...state,
                pid:arr.filter(function(item){
                    return item.pid!==action.pid
                })
            }
            break;
        default:
            break;
    }
    return state
}
export default prodReducer;