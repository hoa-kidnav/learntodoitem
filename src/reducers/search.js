import * as types from '../constants/ActionTypes'

let initalState='' //close form

let myReducers=(state=initalState,action)=>{
    switch (action.type) {
        case types.SEARCH:
            return action.keyword
        default:return state
           
    }
}
export default myReducers