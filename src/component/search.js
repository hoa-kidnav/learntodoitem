import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../actions/index";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }
  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  };
  render() {
    let { keyword } = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            name="keyword"
            value={keyword}
            onChange={this.onChange}
            placeholder="Nhập từ khóa..."
          />
          <span className="input-group-btn">
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.onSearch}
            >
              <span className="fa fa-search mr-5" />
              Tìm
            </button>
          </span>
        </div>
      </div>
    );
  }
}
const mapSateToDrops = (state) => {
  return {};
};
const mapDispatchToDrops = (dispatch, props) => {
  return {
    onSearch: (keyword) => {
      dispatch(actions.searchTask(keyword));
    },
  };
};
export default connect(mapSateToDrops, mapDispatchToDrops)(Search);
