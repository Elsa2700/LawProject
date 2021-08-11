import React, {Component} from 'react';
import Context from '../../../context';
import PropTypes from "prop-types";
import auth from '../../../database/firebase-service';

LawContextProvider.propTypes = {
    children: PropTypes.string.isRequired,
  };
class LawContextProvider extends Component{
    state = {law: []}
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

export default LawContextProvider;