import React, {Component} from 'react';
import {auth}  from '../../../database/firebase-service';
import Context from '../../../context';
import PropTypes from "prop-types";


class AuthContextProvider extends Component{
    state = {user: []}
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user.email === this.state.email) {
                return
            } else {
                this.setState({ user: user })
            }
            console.log('登入',this.state.user)
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
AuthContextProvider.propTypes = {
    children: PropTypes.array.isRequired,
  };
export default AuthContextProvider;