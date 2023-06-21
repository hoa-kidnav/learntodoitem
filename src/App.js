import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import './App.css'
import TaskForm from './component/taskForm';
import Control from './component/control';
import TaskList from './component/taskList';
import {findIndex} from 'lodash';
class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      tasks:[] ,// id :unique ,name ,status
      isDisplayForm:true,
      taskEditing :null,
      filter:{
          name:'',
          status:-1
      },
      keyword:''
      ,
      sortBy:'name',
      sortValue:1
    }
  }
componentDidMount(){
 if(localStorage&&localStorage.getItem('tasks')){
  let tasks=JSON.parse(localStorage.getItem('tasks'))
  this.setState({
    tasks:tasks
  })
 }
}

  s4(){
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1)
  }
  genreateID(){
    return this.s4()+this.s4()+'-'+this.s4()
    +'-'+this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()
  }
  onToggleForm=()=>{
    if (this.state.isDisplayForm&&this.state.taskEditing!==null) {
      this.setState({
        isDisplayForm:true,
        taskEditing:null
      })
    }else{
      this.setState({
        isDisplayForm:!this.state.isDisplayForm,
        taskEditing:null
      })
    }

  }
  onCloseForm=()=>{
    this.setState({
      isDisplayForm:false
    })
  }
  onShowForm=()=>{
    this.setState({
      isDisplayForm:true
    })
  }
  onSumbit=(data)=>{
    let{tasks}=this.state
    if (data.id==='') {
      data.id=this.genreateID()
      tasks.push(data)
    }else{
      let index=this.findIndex(data.id)
      tasks[index]=data
    }
 
    this.setState({
      tasks:tasks,
      taskEditing:null
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
    // console.log(data);
  }
  onUpdateStatus=(id)=>{
    // console.log(id);
   
    let tasks=this.state.tasks
    // let index=this.findIndex(id)
    let index = findIndex(
      tasks, (task) => {
        return task.id === id;
      }
    );
       tasks[index].status=!tasks[index].status 
       this.setState({
        tasks:tasks
      })
      localStorage.setItem('tasks',JSON.stringify(tasks))
    
  }
  findIndex=(id)=>{
    let result=-1
    let {tasks}=this.state
    tasks.forEach((task,index)=>{
      if (task.id===id) {
        return result=index
      }
    })
    return result

  }
  onDelete=(id)=>{
    let {tasks}=this.state
    let index=this.findIndex(id)
    if (index!==-1) {
       tasks.splice(index,1)
       this.setState({
        tasks:tasks
      })
      localStorage.setItem('tasks',JSON.stringify(tasks))
    }
    this.onCloseForm()
  }
  onUpdate=(id)=>{
   
    
    let {tasks}=this.state
    let index=this.findIndex(id)
    let taskEditing=tasks[index]
    this.setState({
      taskEditing:taskEditing
    })
    this.onShowForm()
  }
  onFilter=(filterName,filterStatus)=>{
    // console.log(filterName,'-',filterStatus);
    // console.log(typeof filterStatus );
    filterStatus=parseInt(filterStatus,10)
    this.setState({
      filter:{
        name:filterName.toLowerCase(),
        status:filterStatus
    }
    })
  }
  onSearch=(keyword)=>{
    this.setState({
      keyword:keyword
    })
  }
  onSort=(sortBy,sortValue)=>{
    // console.log(sortBy,sortValue);
    this.setState({
      sortBy:sortBy,sortValue:sortValue
  })
  // console.log(this.state);
  }
  render() {
    let {tasks,
      isDisplayForm,
      taskEditing,
      filter,keyword,
      sortBy,
      sortValue
    }=this.state
    // console.log(filter);
    if (filter) {
      if (filter.name) {
       tasks= tasks.filter((tasks)=>{
            return tasks.name.toLowerCase().indexOf(filter.name)!==-1
        })
      }
      tasks= tasks.filter((tasks)=>{
        if (filter.status===-1) {
         return tasks
        } else{
         return tasks.status===(filter.status?true:false)
        }
    })

    }
    if (keyword) {
      console.log(keyword);
      tasks= tasks.filter((task)=>{
        console.log( task.name.toLowerCase().indexOf(keyword) !==-1);
          return task.name.toLowerCase().indexOf(keyword) !==-1;
      });
   
      }
   if (sortBy==='name') {
    tasks.sort((a, b)=>{
        if (a.name>b.name)return sortValue
       else if (a.name<b.name)return -sortValue
        else return 0
    })
   }else{
    tasks.sort((a, b)=>{
      if (a.status>b.status)return -sortValue
     else if (a.status<b.status)return sortValue
      else return 0
  })
   }
    let elmTaskForm=isDisplayForm ?
    <TaskForm onSumbit={this.onSumbit} 
     onCloseForm={this.onCloseForm}
     task={taskEditing}
     />:''
    return (
      <div className="container">
  <div className="text-center">
    <h1>Quản Lý Công Việc</h1>
    <hr />
  </div>
  <div className="row">
    <div className={isDisplayForm?"col-xs-4 col-sm-4 col-md-4 col-lg-4":''}>
     {elmTaskForm}
    </div>
    <div className={isDisplayForm?"col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
      <button type="button"
       className="btn btn-primary"
       onClick={this.onToggleForm}
       >
        <span className="fa fa-plus mr-5" />
        Thêm Công Việc
      </button>
   
 
      <Control 
      onSearch={this.onSearch}
      onSort={this.onSort}
      sortBy={sortBy}
      sortValue={sortValue}
      />
      <br/>
     <TaskList tasks={tasks}
      onUpdateStatus={this.onUpdateStatus}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      onFilter={this.onFilter}
     />
    </div>
  </div>
</div>

    );
  }
}

export default App;
