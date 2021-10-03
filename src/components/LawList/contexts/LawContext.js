import React, { Component } from 'react';
import { auth } from '../../../database/firebase-service';
import Context from './context';
import PropTypes from "prop-types";


class LawContextProvider extends Component{
    state = {law: []}
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user.email === this.state.email) {
                return
            } else {
                this.setState({ user: user })
            }
        });
    }
    render(){
        return(
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}
LawContextProvider.propTypes = {
    children: PropTypes.string.isRequired,
  };

export default LawContextProvider;