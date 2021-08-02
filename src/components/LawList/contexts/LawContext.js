import React, {Component} from 'react';
import Context from '../../../context';
import LawInfo from '../../../page/LawInfo';


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