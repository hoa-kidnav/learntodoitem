import React, { Component } from 'react';
// import ContentEditable from 'react-contenteditable';
class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      id:'',
      name:'',
      status:false
    }
  }

   
  // componentDidMount(){
  //  if (this.props.task) {
  //   this.setState({
  //     id:this.props.task.id,
  //     name:this.props.task.name,
  //     status:this.props.task.status
  //   })
  //   console.log(this.state);
  //  }
  // }
  componentDidUpdate(prevProps) {
    if (prevProps.task !== this.props.task) {
      if (this.props.task) {
        this.setState({
          id: this.props.task.id,
          name: this.props.task.name,
          status: this.props.task.status
        });
      } else if(!prevProps.task) {
        this.setState({
          id: '',
          name: '',
          status: false
        });
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
  onSumbit=(event)=>{
    event.preventDefault()
// console.log(this.state);

    this.props.onSumbit(this.state)
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
        return (
          
            <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id!==''?'Cập nhật Công việc':'Thêm Công Việc'}
          <span className='fa fa-times-circle text-right' onClick={this.onCloseForm}></span>

          </h3>
         
        </div>
   
        <div className="panel-body">
          <form onSubmit={this.onSumbit}>
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

export default TaskForm;