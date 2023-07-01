import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ContentEditable from 'react-contenteditable';
import * as actions from'../../src/actions/index' 
class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      id:'',
      name:'',
      status:false
     }
  }
  componentDidMount(){
    console.log('sds');
   if (this.props.itemEditing&& this.props.itemEditing.id!==null) {
    this.setState({
      id:this.props.itemEditing.id,
      name:this.props.itemEditing.name,
      status:this.props.itemEditing.status
    })
   }else{
    this.onClear()
   }
  }
  componentDidUpdate(prevProps) {
  

    if (prevProps.itemEditing !== this.props.itemEditing) {
      if (this.props.itemEditing) {
        this.setState({
          id: this.props.itemEditing.id,
          name: this.props.itemEditing.name,
          status: this.props.itemEditing.status
        });
       
      } else {
        this.onClear();
      }
    }
  }

  // Phương thức  getRangeAt()
  handleSelect = (event) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    console.log(range);
  }
  onCloseForm=()=>{
      this.props.onCloseForm()
  }
  onChange=(event)=>{
    let target=event.target
    let name =target.name
    let value= target.value
    if (name==='status'){
      value=target.value==='true'?true:false
    }
    this.setState({
      [name]:value
    })

  }
  onSave=(event)=>{
    event.preventDefault()
    this.props.onSaveTask(this.state)
    this.onClear()
    this.onCloseForm()
  }
  onClear=()=>{
    this.setState({
  
      name:'',
      status:false
    })
  }
    render() {
      let {id} =this.state
      if(!this.props.isDisplayForm) return null
        return (
          
            <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id!==''?'Cập nhật Công việc':'Thêm Công Việc'}
          <span className='fa fa-times-circle text-right' onClick={this.onCloseForm}></span>

          </h3>
         
        </div>
   
        <div className="panel-body">
          <form onSubmit={this.onSave}>
            <div className="form-group">
              <label>Tên :</label>
              <input type="text" 
              className="form-control" 
              name='name' 
              value={this.state.name}
              onChange={this.onChange}
              />
            </div>
            <label>Trạng Thái :</label>
            <select 
            className="form-control"
             required="required"
             name='status'
             value={this.state.status}
             onChange={this.onChange}
             >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                <span className='fa fa-plus mr-5'/>
                Thêm
              </button>
              &nbsp;
              <button type="button" 
              className="btn btn-danger"
              onClick={this.onClear}
           
              >
              <span className='fa fa-close mr-5'/>
                Hủy Bỏ
              </button>
            </div>
          </form>
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
    onSaveTask:(task)=>{
      dispatch(actions.SaveTask(task))
    },

    onCloseForm:()=>{
      dispatch(actions.closeForm())
    }
  
  }
}
export default connect(mapSateToDrops,mapDispatchToDrops)(TaskForm);