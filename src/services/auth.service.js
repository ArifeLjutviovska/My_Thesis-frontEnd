import axios from "axios";

const API_URL = "http://localhost:8090/api/auth/";

class AuthService {
    studentLogin(email, password) {
        return axios
            .post(API_URL + "studentSignin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }
    companyLogin(email, password) {
        return axios
            .post(API_URL + "companySignin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    userType(email){
        return axios.get(API_URL+"userType",{
            params:{
                email
            }
        });
    }

    uploadFile(logo){
        return axios.post("http://localhost:8090/files/uploadFile",logo);
    }

    studentRegister(name, email, password) {
        return axios.post(API_URL + "studentSignup", {
            name,
            email,
            password
        });
    }
    companyRegister(name, email, password,phoneNumber,contactName,address,city,logo) {
        return axios.post(API_URL + "companySignup", {
            name,
            email,
            password,
            phoneNumber,
            contactName,
            address,
            city,
            logo
        });
    }
    getImage(id) {
        return axios.get( "http://localhost:8090/files/get/"+id);
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
    getLogedInUserName(){
        return axios.get(API_URL+"authName");
    }
}

export default new AuthService();