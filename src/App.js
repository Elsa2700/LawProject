
import React from 'react';
import HomePage from './page/HomePage';
import LawInfo from './page/LawInfo';
import MyNote from './page/MyNote';
import LawList from './components/LawList/LawList';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signup from './components/Navbar/signup';
import { Container } from 'react-bootstrap';
import LogIn from './components/Navbar/login';
import AuthContextProvider from './components/Navbar/contexts/AuthContext';


class App extends React.Component {
    render() {
        return (
            <Router basename="/build/index.html">
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
                            <Route path='/login' component={LogIn}>
                                <div className='w-100' style={{ maxWidth: '400px' }}>
                                    <LogIn/>
                                </div>
                            </Route>
                            <Route path='/' exact component={HomePage}>
                            </Route>
                            <Route path='/lawinfo' component={LawInfo}>
                            </Route>
                            <Route path='/mynote' component={MyNote}>
                            </Route>
                            <Route path='/LawList' component={LawList}>
                            </Route>
                        </Container>
                    </Switch>
                </AuthContextProvider>
            </Router>
        )
    }
}

export default App;