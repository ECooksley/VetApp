import React from "react";
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invalidUsername: false,
            invalidPassword: false
        }
    }
    render() {
        return (
            <body className="has-background-grey-lighter">
                <section className="section">
                    <div className="container">
                        <figure className="image is-128x128">
                            <img src="https://www.ucalgary.ca/themes/ucalgary/ucws_theme/images/UCalgary.svg"></img>
                        </figure>
                        <div className="field">
                            <label className="label is-pulled-left">Username</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Username" id="Username"></input>
                                {this.state.invalidUsername ? <p>Invalid Username</p> : null}
                            </div>
                        </div>
                        <div className="field">
                            <label className="label is-pulled-left">Password</label>
                            <div className="control">
                                <input className="input" type="password" placeholder="Password" id="Password"></input>
                                {this.state.invalidPassword ? <p>Invalid Password</p> : null}
                            </div>
                        </div>
                        <div className="buttons">
                            <button type="button" className="button is-medium is-link is-rounded"
                                onClick={() => (
                                    this.getAuth()
                                )}
                            >Login</button>
                        </div>
                    </div>
                </section>
            </body>
        );
    }

    tryAuth(user, pass) {
        axios.get(this.props.endpoint + "/login/" + user + "/" + pass)
            .then((res) => {
                if (res.data == "Invalid username.") {
                    this.setState({ invalidUsername: true })
                } else if (res.data == "Invalid password.") {
                    this.setState({
                        invalidUsername: false,
                        invalidPassword: true
                    })
                } else {
                    const response = res.data;
                    this.props.setProfile(response.userID, response.role, response.name)
                    this.props.setPage(1)
                }
            }).catch((err) => console.log(err));
    }

    getAuth() {
        let username = document.getElementById("Username").value;
        let password = document.getElementById("Password").value;
        // console.log("Username: " + username)
        // console.log("Password: " + password) //GET RID OF THIS LATER
        if (username != "" && password != "") {
            this.tryAuth(username, password)
        }
        // Login bypass for testing purposes
        // if (username == "" && password == "") {
        //     this.props.setProfile(10098642,5,"David Cooksley")
        //     // this.props.setProfile(9876543,4,"Dr. Emily Marasco")
        //     this.props.setPage(1)
        // }
        return;
    }
}



export default Login;