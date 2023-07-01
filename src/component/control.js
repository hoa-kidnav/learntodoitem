import React, { Component } from 'react';
import Search from './search';
import Sort from './sort';
class Control extends Component {
    render() {
        return (
            <div className="row mt-15">
                <br/>
                <Search />
                <Sort />
             
            </div>
        );
    }
}

export default Control;