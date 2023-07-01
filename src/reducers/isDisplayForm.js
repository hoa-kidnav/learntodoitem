import * as types from '../constants/ActionTypes'

let initalState=true //close form

let myReducers=(state=initalState,action)=>{
    switch (action.type) {
        case types.TOGGLE_FORM:
            return !state
        case types.OPEN_FORM:
            return true
        case types.CLOSE_FORM:
             return false
        
        default:return state
           
    }
}
export default myReducers