import { type } from '@testing-library/user-event/dist/type'
import * as types from './../constants/ActionTypes'


let s4=()=>{
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1)
  }
let guid=()=>{
    return s4()+s4()+'-'+s4()
    +'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()
  }
 let findIndex=(tasks,id)=>{

    let result=-1
    tasks.forEach((task,index)=>{
      if (task.id===id) {
        return result=index
      }
    })
    return result

  }
let data=JSON.parse(localStorage.getItem('tasks'))
let initalState=data?data:[]

let myReducers=(state=initalState,action)=>{
  let id =''
  let index=-1
    switch (action.type) {
        case types.LIST_ALL:
            return state
        case types.SAVE_TASK:
          let Task={
            id:action.task.id,
            name:action.task.name,
            status:(action.task.status==='true'||action.task.status===true)?true:false
          }
          if(!Task.id){
             Task.id=guid()
            state.push(Task)

          }else{
            index=findIndex(state,Task.id)
            state[index]=Task
          }
             localStorage.setItem('tasks',JSON.stringify(state))
             return[...state]
        case types.UPDATE_STATUS_TASK:
                 id =action.id
                 index=findIndex(state,id)
                    console.log(index);
                // state[index].status=!state[index].status
                let cloneTasks={...state[index]}
                cloneTasks.status=!cloneTasks.status
                state[index]={
                    ...state[index],
                    status:!state[index].status
                }
                localStorage.setItem('tasks',JSON.stringify(state))
                
            console.log(action);
            return [...state];
        case types.DELETE_TASK:
               id=action.id
              index=findIndex(state,id)
              state.splice(index,1)
              localStorage.setItem('tasks',JSON.stringify(state))

          return [...state]
        default:return state
           
    }
}


export default myReducers