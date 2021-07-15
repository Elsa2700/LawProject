import React from 'react'
import HomePage from './page/HomePage'
import LawInfo from './page/LawInfo'
import MyNote from './page/MyNote'
import LawList from './components/LawList/LawList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { firestore } from './database/firebase-service';




class App extends React.Component {
    state = {laws:[]};
    
    render() {
        return (
            <Router basename='/'>
                <div>
                    <Switch>
                        <Route path='/' exact component={HomePage}></Route>
                        <Route path='/lawinfo' component={LawInfo}></Route>
                        <Route path='/mynote' component={MyNote}></Route>
                        <Route path='/LawList' component={LawList}></Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}



export default App;