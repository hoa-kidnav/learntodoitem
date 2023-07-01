import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import './App.css'
import TaskForm from './component/taskForm';
import Control from './component/control';
import TaskList from './component/taskList';
import { connect } from 'react-redux';
import * as actions from'./actions/index' 

class App extends Component {



  onToggleForm=()=>{
    // if (this.state.isDisplayForm&&this.state.taskEditing!==null) {
    //   this.setState({
    //     isDisplayForm:true,
    //     taskEditing:null
    //   })
    // }else{
    //   this.setState({
    //     isDisplayForm:!this.state.isDisplayForm,
    //     taskEditing:null
    //   })
    // }
    let {itemEditing}=this.props
    if (itemEditing&&itemEditing.id!=='') {
      this.props.onOpenForm()
    }else
    {
      this.props.onToggleForm()
      
    }
    this.props.onClearTask({
      id:'',
      name:'',
      status:false
    })
  }


  // console.log(this.state);

  render() {

    let {isDisplayForm}=this.props

    // console.log(filter);
 
  //   }
  
  //  if (sortBy==='name') {
  //   tasks.sort((a, b)=>{
  //       if (a.name>b.name)return sortValue
  //      else if (a.name<b.name)return -sortValue
  //       else return 0
  //   })
  //  }else{
  //   tasks.sort((a, b)=>{
  //     if (a.status>b.status)return -sortValue
  //    else if (a.status<b.status)return sortValue
  //     else return 0
  // })
  //  }
    return (
      <div className="container">
  <div className="text-center">
    <h1>Quản Lý Công Việc</h1>
    <hr />
  </div>
  <div className="row">
    <div className={isDisplayForm?"col-xs-4 col-sm-4 col-md-4 col-lg-4":''}>
    <TaskForm
     
     />
    </div>
    <div className={isDisplayForm?"col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
      <button type="button"
       className="btn btn-primary"
       onClick={this.onToggleForm}
       >
        <span className="fa fa-plus mr-5" />
        Thêm Công Việc
      </button>

      <Control />
      <br/>
     <TaskList  />
    </div>
  </div>
</div>

    );
  }
}
const mapSateToDrops=state=>{
  return {
    isDisplayForm:state.isDisplayForm,
    itemEditing:state.itemEditing
    
    
  }

  }
  const mapDispatchToDrops=(dispatch,props)=>{
    return {
      onToggleForm:()=>{
        dispatch(actions.toggleForm())
      },  
        onClearTask:(task)=>{
        dispatch(actions.editTask(task))
      } ,  
      onOpenForm:()=>{
       dispatch(actions.openForm())
     }
    }
   
  }
export default connect(mapSateToDrops,mapDispatchToDrops)(App);
