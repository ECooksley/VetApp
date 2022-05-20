import React from "react";
import axios from "axios";



class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userArray: [["id", "name", "email", "activationdate", "role"], ["id2", "name2", "email2", "activationdate2", "role2"]],
            deleteDialogue: false,
            deleteId: -1
        }
    }

    componentDidMount() {
        this.loadState()
    }

    loadState = () => {
        axios.get(this.props.endpoint + "/users")
            .then((res) => {
                const response = res.data;
                this.setState({ userArray: response })
            }).catch((err) => console.log(err));
    }

    editButton = (id) => {
        this.props.setEditID(id);
        this.props.setPage(5);
    }

    deleteButton = (id) => {
        this.setState({ deleteId: id });
        this.toggleDelete();
    }

    toggleDelete = () => {
        this.setState({ deleteDialogue: !this.state.deleteDialogue });
    }
    confirmDelete = () => {
        const idToDelete = this.state.deleteId;
        if (this.props.permission == 5) {
            axios.delete(this.props.endpoint + "/users/" + idToDelete).then((res) => { console.log(res) }).catch((err) => console.log(err));
        } else {
            axios.put(this.props.endpoint + "/users/requests", { type: "Remove User", id: idToDelete, status: 2 }).then((res) => {
                console.log(res);
            }).catch((err) => console.log(err));
        }
        this.toggleDelete();
        setTimeout(() => this.loadState(), 200);
    }
    render() {
        return (
            <body className="has-background-grey-lighter">
                <section className="section">
                    <div className="columns">
                        <div className="column is-1">
                            <button type="button" className="button is-small is-link is-rounded is-pulled-left" onClick={() => (this.props.setPage(1))}>Back</button>
                        </div>
                        <div className="column">
                            <h1 className="title is-1">User List</h1>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="table-container">
                        <table className="table is-bordered is-striped is-fullwidth">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Activation Date</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.userArray.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.userID}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.activationDate}</td>
                                                <td>{this.props.getRoleText(item.role)}</td>
                                                {this.props.permission == 5
                                                    ? <td><button type="button" className="button is-small is-link is-rounded" onClick={() => this.editButton(item.userID)}>Edit</button></td>
                                                    : null}
                                                {this.props.permission == 5 || item.role == 1
                                                    ? <td><button type="button" className="button is-small is-danger is-rounded" onClick={() => this.deleteButton(item.userID)}>Remove</button></td>
                                                    : null}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="container is-pulled-left">
                        <button className="button is-success is-rounded" onClick={() => this.props.setPage(4)}>Add User</button>
                    </div>
                    <div className={this.state.deleteDialogue ? "modal is-active" : "modal"} id="deleteModal">
                        <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">Confirm Delete</p>
                            </header>
                            <section className="modal-card-body">
                                Are you sure you want to remove user {this.state.deleteId}?
                            </section>
                            <footer className="modal-card-foot">
                                <button className="button is-success" onClick={() => this.confirmDelete()}>Yes</button>
                                <button className="button is-danger" onClick={() => this.toggleDelete()}>No</button>
                            </footer>
                        </div>
                    </div>
                </section>
            </body>
        )
    }
}

export default UserList;