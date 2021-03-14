import React, { useEffect, useState,Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import "./register.css";




import AuthService from "../../services/auth.service";
import {form} from "react-validation/build/main";


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vname = value => {
    if (value.length < 3 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                The name must be between 3 and 30 characters.
            </div>
        );
    }
};


const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};
class StudentRegister extends Component{
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleCompanyRegister = this.handleCompanyRegister.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeContactName= this.onChangeContactName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.studentRegister=this.studentRegister.bind(this);
        this.companyRegister=this.companyRegister.bind(this);
        this.onFileChangeHandler=this.onFileChangeHandler.bind(this);






        this.state = {
            type:"Student",
            name: "",
            email: "",
            password: "",
            successful: false,
            message: "",
            phoneNumber:"",
            contactName:"",
            address:"",
            city:"",
            logo:{}

        };
    }





    onChangeName(e){
        this.setState({
            name:e.target.value
        });

    }
   onChangeContactName(e) {
        this.setState({
            contactName:e.target.value
        });

    }
   onChangeAddress(e){
        this.setState({
            address:e.target.value
        });
    }
    onChangePhoneNumber(e) {
       this.setState({
           phoneNumber:e.target.value
       });
    }
    onChangeCity(e) {
        this.setState({
            city:e.target.value
        });

    }

    onChangeEmail(e){
        this.setState({
            email:e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password:e.target.value
        });
    }

   studentRegister(e){
        this.setState({
            type:"Student"
        });
    }
    companyRegister(e){
        this.setState({
            type:"Company"
        });
    }
    onFileChangeHandler = (e) => {


        const formData = new FormData();
       formData.append('file',e.target.files[0]);
       console.log(formData);
       AuthService.uploadFile(formData).then((response)=>{
           this.setState({
               logo:response.data
           });
       });








    };

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();


        if (this.checkBtn.context._errors.length === 0) {
            AuthService.studentRegister(
                this.state.name,
                this.state.email,
                this.state.password
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    handleCompanyRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();



        if (this.checkBtn.context._errors.length === 0) {

            AuthService.companyRegister(
                this.state.name,
                this.state.email,
                this.state.password,
                this.state.phoneNumber,
                this.state.contactName,
                this.state.address,
                this.state.city,
                this.state.logo
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }
    render()
{


    return (
        <div className="register">


            <div className="crd-reg">
                <div className="col-md-12">
                    <div className="card card-container ">
                        <div className="logo mb-3">
                        <div className="col-md-12 text-center">
                            <h1 className="signup"><i>Sign Up</i></h1>
                        </div>

                    </div>

                        <div className="btns">
                            <button className="btn-success btn1" onClick={this.companyRegister}>Компанија</button>
                            <button className="btn-success btn2" onClick={this.studentRegister}>Студент</button>
                        </div>

                        {this.state.type === "Student" ? (




                            <Form
                                onSubmit={this.handleRegister}
                                ref={c => {
                                    this.form = c;
                                }}
                            >
                                {!this.state.successful && (
                                    <div>

                                        <div className="form-group">
                                            <label htmlFor="username">Име и презиме</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                validations={[required, vname]}
                                            />
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="email">Емаил</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.onChangeEmail}
                                                validations={[required, email]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Лозинка</label>
                                            <Input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.onChangePassword}
                                                validations={[required, vpassword]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block">Регистрирај се</button>
                                        </div>
                                    </div>
                                )}

                                {this.state.message && (
                                    <div className="form-group msg">
                                        <div
                                            className={
                                                this.state.successful
                                                    ? "alert alert-success"
                                                    : "alert alert-danger"
                                            }
                                            role="alert"
                                        >
                                            {this.state.message}
                                        </div>
                                    </div>

                                )}
                                <CheckButton
                                    style={{display: "none"}}
                                    ref={c => {
                                        this.checkBtn = c;
                                    }}
                                />
                            </Form>


                        ) : (
                            <Form
                                onSubmit={this.handleCompanyRegister}
                                ref={c => {
                                    this.form = c;
                                }}
                            >
                                {!this.state.successful && (
                                    <div>

                                        <div className="form-group">
                                            <label htmlFor="username">Име на компанија</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                validations={[required, vname]}
                                            />
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="email">Eмаил</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.onChangeEmail}
                                                validations={[required, email]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Лозинка</label>
                                            <Input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.onChangePassword}
                                                validations={[required, vpassword]}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="username">Име на контакт</label>
                                        <Input
                                            type="text"
                                                className="form-control"
                                                name="contactName"
                                                value={this.state.contactName}
                                                onChange={this.onChangeContactName}

                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="username">Контакт број</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="phoneNumber"
                                                value={this.state.phoneNumber}
                                                onChange={this.onChangePhoneNumber}

                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="username">Град</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="city"
                                                value={this.state.city}
                                                onChange={this.onChangeCity}

                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="username">Адреса</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="address"
                                                value={this.state.address}
                                                onChange={this.onChangeAddress}

                                            />
                                        </div>
                                        <input type="file" id="logo" name="logo"  onChange={this.onFileChangeHandler}/><br/>

                                        <div className="mrg-botom">

                                        </div>



                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block">Регистрирај се</button>
                                        </div>
                                    </div>
                                )}

                                {this.state.message && (
                                    <div className="form-group msg">
                                        <div
                                            className={
                                                this.state.successful
                                                    ? "alert alert-success"
                                                    : "alert alert-danger"
                                            }
                                            role="alert"
                                        >
                                            {this.state.message}
                                        </div>
                                    </div>
                                )}
                                <CheckButton
                                    style={{display: "none"}}
                                    ref={c => {
                                        this.checkBtn = c;
                                    }}
                                />
                            </Form>
                        )

                        }


                    </div>
                </div>
            </div>


        </div>
    );
}

}
export default StudentRegister;