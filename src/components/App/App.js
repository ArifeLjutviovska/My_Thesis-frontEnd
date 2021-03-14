import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "../Header/header";
import AuthService from "../../services/auth.service";
import Register from '../Register/register.component';
import Login from "../Login/login.component";


class App extends Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined,
            authName:"",
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();


        if (user) {


            this.setState({
                currentUser: AuthService.getCurrentUser(),


            });
            AuthService.getLogedInUserName().then((data)=>{
                this.setState({
                    authName:data.data
                })
            });
        }

    }

    logOut() {
        AuthService.logout();
    }


    render() {

        return (
            <Router>
                    <Header currentUser={this.state.currentUser}  onLogOut={this.logOut}  />
                    <div className="App" >
                        <Switch>
                        <Route  exact  path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        </Switch>
                    </div>
            




            </Router>
        );
    }
}

export default App;
