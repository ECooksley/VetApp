import React from "react";
import "./index.css";
import axios from "axios";

class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
        }
    }
    componentDidMount() {
        this.loadState();
    }
    loadState() {
        axios.get(this.props.endpoint + "/user/" + this.props.permission + "/requests")
            .then((res) => {
                const response = res.data;
                this.setState({
                    requests: response
                });
            }).catch((err) => console.log(err));
    }

    cancelRequest(type, id) {
        console.log(this.state.requests)
        console.log("point 3")
        if (type == "Approve Animal for Lab") {
            axios.put(this.props.endpoint + "/animal/" + id + "/lab-status", { type: type, id: id, status: 0 }).then((res) => {
                console.log(res)
            }).catch((err) => console.log(err));
            setTimeout(() => this.loadState(), 200);
        }
        if (type == "Add User") {
            axios.delete(this.props.endpoint + "/users/" + id).then((res) => {console.log(res)}).catch((err) => console.log(err));
            setTimeout(() => this.loadState(), 200);
        }
        if (type == "Remove User") {
            axios.put(this.props.endpoint + "/users/requests", {type: type, id: id, status: 0}).then((res) => {
                console.log(res)
            }).catch((err) => console.log(err));
            setTimeout(() => this.loadState(), 200);
        }
    }
    approveRequest(type, id, status) {
        if (type == "Approve Animal for Lab") {
            axios.put(this.props.endpoint + "/animal/" + id + "/lab-status", {type: type, id: id, status: status + 1 }).then((res) => {
                console.log(res)
            }).catch((err) => console.log(err));
            setTimeout(() => this.loadState(), 200);
        }
        if (type == "Add User") {
            axios.put(this.props.endpoint + "/users/requests", {type: type, id: id, status: 0}).then((res) => {
                console.log(res)
            }).catch((err) => console.log(err));
            setTimeout(() => this.loadState(), 200);
        }
        if (type == "Remove User") {
            axios.delete(this.props.endpoint + "/users/" + id).then((res) => {console.log(res)}).catch((err) => console.log(err));
            setTimeout(() => this.loadState(), 200);
        }
    }
    denyRequest(type, id) {
        if (type == "Approve Animal for Lab") {
            axios.put(this.props.endpoint + "/animal/" + id + "/lab-status", {type: type, id: id, status: 4 }).then((res) => {
                console.log(res)
            }).catch((err) => console.log(err));
            setTimeout(() => this.loadState(), 200);
        }
        if (type == "Add User") {
            axios.delete(this.props.endpoint + "/users/" + id).then((res) => {console.log(res)}).catch((err) => console.log(err));
            setTimeout(() => this.loadState(), 200);
        }
        if (type == "Remove User") {
            axios.put(this.props.endpoint + "/users/requests", {type: type, id: id, status: 0}).then((res) => {
                console.log(res)
            }).catch((err) => console.log(err));
            setTimeout(() => this.loadState(), 200);
        }
    }
    getStatusCircle(status) {
        switch (status) {
            case 0:
                return <button className="button is-rounded is-black is-outlined non-interactive"></button>
            case 1:
                return <button className="button is-rounded is-warning non-interactive"></button>
            case 2:
                return <button className="button is-rounded is-warning non-interactive"></button>
            case 3:
                return <button className="button is-rounded is-success non-interactive"></button>
            case 4:
                return <button className="button is-rounded is-danger non-interactive"></button>
        }
    }
    requestButtons(type, status, id, role) {
        if (role == 4 && (status == 1 || status == 2)) {
            return <button className="button is-danger is-rounded" onClick={() => this.cancelRequest(type, id)}>Cancel Request</button>
        }
        if (role == 5 || role == 3) {
            return (
                <div>
                    <button className="button is-danger is-rounded" onClick={() => this.denyRequest(type, id)}>Deny</button>
                    <button className="button is-success is-rounded ml-3" onClick={() => this.approveRequest(type, id, status)}>Approve</button>
                </div>
            );
        }

    }



    render() {
        return (
            <body className="has-background-grey-lighter">
                <section className="columns">
                    <div className="column is-1 mt-4 ml-2">
                        <button type="button" className="button is-small is-link is-rounded" onClick={() => (this.props.setPage(1))}>Back</button>
                    </div>
                    <div className="column is-10">
                        <h1 className="title is-1">Requests</h1>
                    </div>
                    <div className="column is-1 mt-4">
                        <button type="button" className="button is-small is-link is-rounded" onClick={() => (this.loadState())}>Refresh</button>
                    </div>
                </section>
                <section className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="tile is-ancestor">
                            <div className="tile is-vertical is-parent">
                                {this.state.requests.map((request, index) => {
                                    const { type, status, name, id } = request;
                                    return (
                                        <div className="tile is-child box" key={index}>
                                            <div className="columns">
                                                <div className="column has-text-left">
                                                    <p className="is-size-3">
                                                        {type}
                                                    </p>
                                                </div>
                                                <div className="column">
                                                    <p className="is-size-3">
                                                        {name}
                                                    </p>
                                                </div>
                                                <div className="column">
                                                    {this.requestButtons(type, status, id, this.props.permission)}
                                                </div>
                                                <div className="column">
                                                    <div className="columns">
                                                        <div className="column has-text-right">
                                                            <p className="is-size-4">Status: </p>
                                                        </div>
                                                        <div className="column is-2 has-text-right">
                                                            {this.getStatusCircle(status)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </body>
        );
    }
}

export default Requests;