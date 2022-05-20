import React from "react";
//import profilepic from './blank-profile-picture.png';
import profilepic from './profile_placeholder.png';
import './index.css';
import axios from 'axios';

class AnimalListing extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     animalArray: [{
        //         name: "cat1",
        //         id: 1,
        //         status: 0,
        //         species: "cat",
        //         breed: "Blah",
        //         profileURL: "null"
        //     },
        //     {
        //         name: "cat2",
        //         id: 2,
        //         status: 1,
        //         species: "cat",
        //         breed: "Blah",
        //         profileURL: "null"
        //     },
        //     {
        //         name: "dog1",
        //         id: 6,
        //         status: 3,
        //         species: "dog",
        //         breed: "Blah",
        //         profileURL: "null"
        //     },
        //     {
        //         name: "dog2",
        //         id: 10,
        //         status: 4,
        //         species: "dog",
        //         breed: "Blah",
        //         profileURL: "null"
        //     }
        //     ],
        //     profilePic: profilepic
        // }
    }

    // componentDidMount() {
    //     this.loadState();
    // }

    // loadState() {
    //     axios.get("http://localhost:8000/animal")
    //         .then((res) => {
    //             const response = res.data;
    //             console.log(response);
    //             this.setState({
    //                 animalArray: response
    //             });
    //         }).catch((err) => console.log(err));
    // }
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

    getRequestButton(permission, status, id) {
        if (permission == 4) {
            if (status == 0) {
                return <button className="button is-rounded is-success" onClick={() => this.requestAnimal(id)}>Request Animal</button>
            } else if (status == 1 || status == 2) {
                return <button className="button is-rounded is-danger" onClick={() => this.cancelRequest(id)}>Cancel Request</button>
            }
        }
        return null;
    }
    requestAnimal(id) {
        axios.put(this.props.endpoint + "/animal/" + id + "/lab-status", { id: id, status: 1, type:"Approve Animal for Lab"}).then((res) => {
            console.log(res)
        }).catch((err) => console.log(err));
        setTimeout(() => this.props.loadState(), 200);

    }
    cancelRequest(id) {
        axios.put(this.props.endpoint + "/animal/" + id + "/lab-status", { id: id, status: 0, type:"Approve Animal for Lab" }).then((res) => {
            console.log(res)
        }).catch((err) => console.log(err));
        setTimeout(() => this.props.loadState(), 200);
    }

    render() {
        return (
            <div className="column is-6 is-offset-3">
                <div className="tile is-ancestor">
                    <div className="tile is-vertical is-parent">
                        {this.props.animalArray.map((animal, index) => {
                            const { name, id, status, species, sex, colour, weight, breed, BirthDate, HealthStatus, microchip, tattoo, profileURL} = animal;
                            return (
                                <div className="tile is-child box" key={index}>
                                    <div className="media">
                                        <div className="media-left">
                                            <figure className="image is-48x48">
                                                <img src={this.props.profilePic} alt="Animal Picture" onClick={() => (this.props.setAnimal(id),this.props.setPage(8))}/> 
                                            </figure>
                                        </div>
                                        <div className="media-content">
                                            <ul>
                                                <li>
                                                    {"Name: " + name}
                                                </li>
                                                <li>
                                                    {"Species: " + species}
                                                </li>
                                                <li>
                                                    {"Breed: " + breed}
                                                </li>
                                                <li>
                                                    {"Colour: " + colour}
                                                </li>
                                                <li>
                                                    {"Sex: " + sex}
                                                </li>
                                                <li>
                                                    {"Health Status: " + HealthStatus}
                                                </li>
                                            </ul>
                                        </div>
                                        {this.getRequestButton(this.props.permission, status, id)}
                                        <div className="media-content has-text-right">
                                            {this.getStatusCircle(status)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        );
    }
}

export default AnimalListing;