import * as types from '../constants/ActionTypes'

let initalState={
  
    name:'',
    status:-1
} //close form

let myReducers=(state=initalState,action)=>{
    switch (action.type) {
        case types.FILTER_TABLE:
            
            return{
                name:action.filter.name,
                status:parseInt(action.filter.status,10)
            }
        default:return state
           
    }
}
export default myReducers