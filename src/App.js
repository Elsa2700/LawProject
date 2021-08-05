
import React from 'react';
import HomePage from './page/HomePage';
import LawInfo from './page/LawInfo';
import MyNote from './page/MyNote';
import LawList from './components/LawList/LawList';
import MynoteInfo from './page/MynoteInfo';
import MyBlank from './page/MyBlank';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Signup from './components/Navbar/signup';
import { Container } from 'react-bootstrap';
import Login from './components/Navbar/login';
import AuthContextProvider from './components/Navbar/contexts/AuthContext';


class App extends React.Component {
    render() {
        return (
            <Router basename='/'>
                <AuthContextProvider>
                    <Switch>
                        <Container
                            className='d-flex align-items-center justify-content-center'
                            style={{ minHeight: '100vh' }}
                        >
                            <Route path='/signup' component={Signup}>
                                <div className='w-100' style={{ maxWidth: '400px' }}>
                                    <Signup />
                                </div>
                            </Route>
                            <Route path='/login' component={Login}>
                                <div className='w-100' style={{ maxWidth: '400px' }}>
                                    <Login />
                                </div>
                            </Route>
                            <Route path='/' exact component={HomePage}>
                                <HomePage />
                            </Route>
                            <Route path='/lawinfo' component={LawInfo}>
                            </Route>
                            <Route path='/mynote' component={MyNote}>
                            </Route>
                            <Route path='/LawList' component={LawList}>
                                <LawList />
                            </Route>
                        </Container>
                    </Switch>
                </AuthContextProvider>
            </Router>
        )
    }
}




export default App;