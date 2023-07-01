import React, { Component } from 'react';
import Taskitem from './taskitem';
import { connect } from 'react-redux';
import * as actions from'../actions/index'


class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state={
      filterName:'',
      filterStatus:-1
    }
  }
  onChange=(event)=>{
    let target=event.target
    let name= target.name
    let value = target.value
    let filter= {
      name: name==="filterName" ? value : this.state.filterName,
      status: name==='filterStatus' ? value : this.state.filterStatus
    }
    this.props.onFilterTable(filter )
    console.log(this.state);
    this.setState({
      [name]:value
    })
  }
    render() {
      // console.log(this.props.todos);
  let {tasks,filterTable,keyword,sort}=this.props
  console.log(sort);
  // filter on table 
   //   if (filter) {
      if (filterTable.name) {
       tasks= tasks.filter((tasks)=>{
            return tasks.name.toLowerCase().indexOf(filterTable.name)!==-1
        })
      }
      tasks= tasks.filter((tasks)=>{
        if (filterTable.status===-1) {
         return tasks
        } else{
         return tasks.status===(filterTable.status===1?true:false)
        }
    })
  let {filterName,filterStatus}=this.state
// search

tasks= tasks.filter((task)=>{

    return task.name.toLowerCase().indexOf(keyword) !==-1;
});
  // sort
     if (sort.by==='name') {
    tasks.sort((a, b)=>{
        if (a.name>b.name)return sort.value
       else if (a.name<b.name)return -sort.value
        else return 0
    })
   }else{
    tasks.sort((a, b)=>{
      if (a.status>b.status)return -sort.value
     else if (a.status<b.status)return sort.value
      else return 0
  })
   }
  let elmtasks=tasks.map((task,index)=>{
    return <Taskitem 
    key={task.id} 
    index={index} 
    task={task}

    onUpdate={this.props.onUpdate}
    />
  })



        return (
            <div className="row mt-15">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td>
                      <input
                       type="text"
                       className="form-control"
                       name='filterName'
                       value={filterName}
                       onChange={this.onChange}
                       />
                    </td>
                    <td>
                      <select 
                      className="form-control"
                      name='filterStatus'
                      value={filterStatus}
                      onChange={this.onChange}
                      >
                        <option value={-1}>Tất Cả</option>
                        <option value={0}>Ẩn</option>
                        <option value={1}>Kích Hoạt</option>
                      </select>
                    </td>
                    <td />
                  </tr>
                    {elmtasks}
                </tbody>
              </table>
            </div>
          </div>
        );
    }
}
const mapSateToDrops=(state)=>{
return{
  tasks:state.tasks,
  filterTable:state.filterTable,
  keyword:state.search,
  sort:state.sort

}
}
const mapDispatchToDrops=(dispatch,props)=>{
  return {
    onFilterTable:(filter)=>{
      dispatch(actions.filterTask(filter))
    },  
 
  }
 
}
export default connect(mapSateToDrops,mapDispatchToDrops) (TaskList);