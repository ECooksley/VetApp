import axios from "axios";
import React from "react";



class NewUser extends React.Component {
    constructor(props) {
        super(props);
    }

    submitForm() {
        let id = document.getElementById("id").value
        let name = document.getElementById("name").value
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value
        let role = this.props.getRoleNumber(document.getElementById("role").value);

        console.log("id: " + id)
        console.log("name: " + name)
        console.log("email: " + email)
        console.log("password: " + password)
        console.log("role: " + role)


        axios.post(this.props.endpoint + "/users", { userID: id, name: name, email: email, role: role, password: password }).then((res) => {
            console.log(res);
        }).catch((err) => console.log(err));

        if (this.props.permission == 4) {
            setTimeout(() =>
                axios.put(this.props.endpoint + "/users/requests", { type: "Add User", id: id, status: 1 }).then((res) => {
                    console.log(res);
                }).catch((err) => console.log(err)), 200);
        }

        setTimeout(() => this.props.setPage(3), 500);


    }

    render() {
        return (
            <body className="has-background-grey-lighter">
                <section className="section">
                    <div className="container">
                        <button type="button" className="button is-small is-link is-rounded is-pulled-left" onClick={() => (this.props.setPage(3))}>Back</button>
                        <h1 className="title is-1 has-text-centered">Add User</h1>
                    </div>
                </section>
                <section className="column is-one-third is-offset-one-third">
                    <div className="control">
                        <div className="field-label is-normal">
                            <label className="label">Id</label>
                        </div>
                        <div className="field-body">
                            <input className="input" id="id"></input>
                        </div>
                        <div className="field-label is-normal">
                            <label className="label">Name</label>
                        </div>
                        <div className="field-body">
                            <input className="input" id="name"></input>
                        </div>
                        <div className="field-label is-normal">
                            <label className="label">Email</label>
                        </div>
                        <div className="field-body">
                            <input className="input" id="email"></input>
                        </div>
                        <div className="field-label is-normal">
                            <label className="label">Password</label>
                        </div>
                        <div className="field-body">
                            <input className="input" type="password" id="password"></input>
                        </div>
                        <div className="field-label is-normal">
                            <label className="label">Role</label>
                        </div>
                        <div className="control">
                            <div className="select">
                                <select id="role">
                                    <option>Choose Role</option>
                                    <option>Student</option>
                                    <option>Care Attendant</option>
                                    <option>Health Technician</option>
                                    <option>Teaching Technician</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="buttons is-centered mt-4">
                        <button className="button is-success" onClick={() => this.submitForm()}>Save</button>
                        <button className="button is-danger" onClick={() => this.props.setPage(3)}>Cancel</button>
                    </div>
                </section>
            </body>
        )

    }
}


export default NewUser;