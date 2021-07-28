
import React from 'react'
import HomePage from './page/HomePage'
import LawInfo from './page/LawInfo'
import MyNote from './page/MyNote'
import LawList from './components/LawList/LawList'
import MyBlank from './page/MyBlank'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { firestore } from './database/firebase-service';
import Signup from './components/Navbar/signup';
import { Container } from 'react-bootstrap'
import { AuthProvider } from './components/Navbar/contexts/AuthContext'




class App extends React.Component {
    state = { laws: [] };

    render() {
        return (
            <Router basename='/'>
                <Switch>
                    <AuthProvider>
                        <Container 
                        className='d-flex align-items-center justify-content-center'
                        style={{ minHeight: '100vh' }}
                        >
                            <Route path='/signup' component={Signup}>
                                <div className='w-100' style={{ maxWidth: '400px' }}>
                                    <Signup />
                                </div>
                            </Route>
                        </Container>
                    </AuthProvider>
                    <Route path='/' exact component={HomePage}></Route>
                    <Route path='/lawinfo' component={LawInfo}></Route>
                    <Route path='/mynote' component={MyNote}></Route>
                    <Route path='/LawList' component={LawList}></Route>
                </Switch>
            </Router>


        )
    }
}




export default App;