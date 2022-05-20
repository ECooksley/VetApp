import React from "react";
import default_profile from "./profile_placeholder.png"
import axios from "axios";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: false,
            name: "noname",
            email: "noemail",

        }
    }

    componentDidMount() {
        this.loadState();
    }

    getRoleText = (n) => {
        switch (n) {
            case 1:
                return "Student";
            case 2:
                return "Care Attendant";
            case 3:
                return "Health Technician";
            case 4:
                return "Teaching Technician";
            case 5:
                return "Admin";
            default:
                return "Unknown";
        }
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
        axios.put(this.props.endpoint + "/users/" + this.props.idNo, { userID: this.props.idNo, name: this.state.name, email: this.state.email, role: this.props.permission }).then((res) => {
            console.log(res)
        }).catch((err) => console.log(err));
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

    render() {
        return (
            <body className="has-background-grey-lighter">
                <section className="columns">
                    <div className="column is 1 mt-2">
                        <button type="button" className="button is-small is-link is-rounded" onClick={() => (this.props.setPage(1))}>Back</button>
                    </div>
                    <div className="column is-10">
                        <h1 className="title is-1">My Profile</h1>
                    </div>
                    <div className="column is-1 mt-2">
                        {this.state.isEditable
                            ? 
                            <div>
                                <button type="button" className="button is-small is-danger is-rounded is-pulled-right" onClick={() => (this.toggleEdit(), this.loadState())}>Cancel</button>
                                <button type="button" className="button is-small is-success is-rounded is-pulled-right" onClick={() => (this.toggleEdit(), this.saveState())}>Save</button>
                            </div>
                            : 
                            <button type="button" className="button is-small is-link is-rounded" onClick={() => this.toggleEdit()}>Edit</button>
                        }
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
                                <p>{this.getRoleText(this.props.permission)}</p>
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

                    </div>
                </section>
            </body>
        );
    }
}


export default Profile;
