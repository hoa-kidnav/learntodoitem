import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from'./../actions/index'

class Taskitem extends Component {
  onUpdateStatus=()=>{
  this.props.onUpdateStatus(this.props.task.id)
  }
  onDelete=()=>{
    this.props.onDeleteTask(this.props.task.id)
    this.props.onCloseForm()
  }
  onEditTask=()=>{
    this.props.onOpenForm()
    this.props.onEditTask(this.props.task)

  }
    render() {
  let {task,index}=this.props

        return (
            <tr>
            <td>{index+1}</td>
            <td>{task.name}</td>
            <td className="text-center">
              <span 
              className={task.status===true ? "label label-danger" :"label label-success"}
              onClick={   this.onUpdateStatus}
              >
                {task.status===true?'Kích Hoạt':'Ẩn'}
             
              </span>
            </td>
            <td className="text-center">
              <button type="button" 
              className="btn btn-warning"
              onClick={this.onEditTask}
              >
                <span className="fa fa-pencil mr-5" /> &nbsp;
                Sửa
              </button>
              &nbsp;
              <button type="button" className="btn btn-danger"
              onClick={this.onDelete}
              >
                <span className="fa fa-trash mr-5" ></span> &nbsp;
                Xóa
              </button>
            </td>
          </tr>
        );
    }
}

const mapSateToDrops=state=>{
  return {}
  }
  const mapDispatchToDrops=(dispatch,props)=>{
    return {
      onUpdateStatus:(id)=>{
        dispatch(actions.onUpdateStatus(id))
      },
      onDeleteTask:(id)=>{
        dispatch(actions.deleteTask(id))
      },
      onCloseForm:()=>{
        dispatch(actions.closeForm())
      }  ,  
       onOpenForm:()=>{
        dispatch(actions.openForm())
      },
      onEditTask:(task)=>{
        dispatch(actions.editTask(task))
      }
    }
    
   
  }
export default connect(mapSateToDrops,mapDispatchToDrops) (Taskitem)