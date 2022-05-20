import React from "react";
import default_profile from "./profile_placeholder.png"
import axios from "axios";

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: true,
            name: "noname",
            email: "noemail",
            role: "role",
            deleteDialogue: false
        }
    }

    componentDidMount() {
        this.loadState();
    }

    handleNameChange = () => {
        return e => {
            this.setState({
                name: e.target.value
            })
        }
    }
    handleEmailChange = () => {
        return e => {
            this.setState({
                email: e.target.value
            })
        }
    }


    toggleEdit = () => {
        this.setState({
            isEditable: !this.state.isEditable
        });
    }
    saveState = () => {
        const roleText = document.getElementById("role").value;
        const roleNo = this.props.getRoleNumber(roleText);
        if (roleNo !== 0) {
            axios.put(this.props.endpoint + "/users/" + this.props.idNo, { userID: this.props.idNo, name: this.state.name, email: this.state.email, role: roleNo }).then((res) => {
                console.log(res)
            }).catch((err) => console.log(err));
        } else {
            axios.put(this.props.endpoint + "/users/" + this.props.idNo, { userID: this.props.idNo, name: this.state.name, email: this.state.email, role: this.state.role }).then((res) => {
                console.log(res)
            }).catch((err) => console.log(err));
        }

    }
    loadState = () => {
        axios.get(this.props.endpoint + "/users/" + this.props.idNo)
            .then((res) => {
                const response = res.data;
                this.setState({
                    name: response.name,
                    email: response.email,
                    role: response.role
                })
            }).catch((err) => console.log(err));
    }

    toggleDelete = () => {
        this.setState({ deleteDialogue: !this.state.deleteDialogue })
    }
    confirmDelete = () => {
        axios.delete(this.props.endpoint + "/users/" + this.props.idNo).then((res) => { console.log(res) }).catch((err) => console.log(err));
        setTimeout(() => this.props.setPage(3), 200);
    }

    render() {
        return (
            <body className="has-background-grey-lighter">
                <section className="columns">
                    <div className="column is 1 mt-2">
                        <button type="button" className="button is-small is-link is-rounded" onClick={() => (this.props.setPage(3))}>Back</button>
                    </div>
                    <div className="column is-10">
                        <h1 className="title is-1">Edit Profile</h1>
                    </div>
                    <div className="column is-1 mt-2">
                        <div>
                            <button type="button" className="button is-small is-danger is-rounded is-pulled-right" onClick={() => (this.props.setPage(3))}>Cancel</button>
                            <button type="button" className="button is-small is-success is-rounded is-pulled-right" onClick={() => (this.saveState(), setTimeout(() => this.props.setPage(3), 200))}>Save</button>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <figure className="image is-128x128 is-inline-block">
                            <img className="" src={default_profile}></img>
                        </figure>
                    </div>
                </section>
                <section className="columns">
                    <div className="column is-3 is-offset-5">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label is-pulled-left">Id</label>
                            </div>
                            <div className="field-body">
                                <p>{this.props.idNo}</p>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label is-pulled-left">Role</label>
                            </div>
                            <div className="field-body">
                                <div className="select">
                                    <select id="role">
                                        <option>Current Role: {this.props.getRoleText(this.state.role)}</option>
                                        <option>Student</option>
                                        <option>Care Attendant</option>
                                        <option>Health Technician</option>
                                        <option>Teaching Technician</option>
                                        <option>Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label is-pulled-left">Name</label>
                            </div>
                            <div className="field-body">
                                {this.state.isEditable
                                    ? <div className="control">
                                        <input className="input" type="text"
                                            onChange={this.handleNameChange()}
                                            value={this.state.name}
                                        ></input>
                                    </div>
                                    : <p>{this.state.name}</p>
                                }
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label is-pulled-left">Email</label>
                            </div>
                            <div className="field-body">
                                {this.state.isEditable
                                    ?
                                    <div className="control">
                                        <input className="input" type="text"
                                            onChange={this.handleEmailChange()}
                                            value={this.state.email}
                                        ></input>
                                    </div>
                                    :
                                    <p>{this.state.email}</p>
                                }
                            </div>
                        </div>
                        <button className="button is-fullwidth is-danger is-rounded" onClick={() => this.toggleDelete()}>Delete User</button>
                        <div className={this.state.deleteDialogue ? "modal is-active" : "modal"} id="deleteModal">
                            <div className="modal-background"></div>
                            <div className="modal-card">
                                <header className="modal-card-head">
                                    <p className="modal-card-title">Confirm Delete</p>
                                </header>
                                <section className="modal-card-body">
                                    Are you sure you want to remove {this.state.name}?
                                </section>
                                <footer className="modal-card-foot">
                                    <button className="button is-success" onClick={() => this.confirmDelete()}>Yes</button>
                                    <button className="button is-danger" onClick={() => this.toggleDelete()}>No</button>
                                </footer>
                            </div>
                        </div>
                    </div>
                </section>
            </body>
        );
    }
}


export default EditUser;
