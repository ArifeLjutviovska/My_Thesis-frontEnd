import {Link} from "react-router-dom";
import React from "react";
import FormSearch from "../FormSearch/FormSearch";
import "./header.css";


const Header=(props)=>{



return(
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
            IT Career
        </Link>
        <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={"/jobs"} className="nav-link">
                    Огласи
                </Link>
            </li>
            <li className="nav-item">
                <Link to={"/companies"} className="nav-link">
                   Компании
                </Link>
            </li>
            <li className="nav-item">
                <Link to={"/students"} className="nav-link">
                    Студенти
                </Link>
            </li>


        </div>


        {props.currentUser ? (

            <div className="navbar-nav ml-auto">
                <FormSearch className="nav-item"  onSearch={props.onSearch}/>
                <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                        {props.currentUser.name}
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={props.onLogOut}>
                        Одјави се
                    </a>
                </li>
            </div>
        ) : (
            <div className="navbar-nav ml-auto">
                <FormSearch className="nav-item"  onSearch={props.onSearch}/>
                <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                        Најави се
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                       Зачлени се
                    </Link>
                </li>
            </div>
        )}

    </nav>
);
};

export default Header;
