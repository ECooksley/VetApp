import React from 'react';
import AnimalListingHeader from './AnimalListingHeader';
import AnimalListing from './AnimalListing';
import axios from 'axios';
import profilepic from './profile_placeholder.png';

class AnimalWrapper extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            searchQuery: '',
            animalArray: [{
                name: "cat1",
                id: 1,
                status: 0,
                species: "cat",
                breed: "Blah",
                profileURL: "null"
            },
            {
                name: "cat2",
                id: 2,
                status: 1,
                species: "cat",
                breed: "Blah",
                profileURL: "null"
            },
            {
                name: "dog1",
                id: 6,
                status: 3,
                species: "dog",
                breed: "Blah",
                profileURL: "null"
            },
            {
                name: "dog2",
                id: 10,
                status: 4,
                species: "dog",
                breed: "Blah",
                profileURL: "null"
            }
            ],
            profilePic: profilepic
        };

        this.loadState = this.loadState.bind(this);
        this.onSearch = this.onSearch.bind(this);
    };

    componentDidMount() {
        this.loadState();
    }

    loadState() {
        axios.get("http://localhost:8000/animal")
            .then((res) => {
                const response = res.data;
                console.log(response);
                this.setState({
                    animalArray: response
                });
            }).catch((err) => console.log(err));
    }

    onSearch(searchQ) {
        // this.setState({
        //     searchQuery: searchQ
        // });
        this.state = {
            searchQuery: searchQ
        };
        // console.log(searchQ);
        // console.log("HERE");
        // console.log(this.state.searchQuery);

        axios.get("http://localhost:8000/animal/search/" + this.state.searchQuery)
            .then((res) => {
                const response = res.data;
                console.log(response);
                this.setState({
                    animalArray: response
                });
            }).catch((err) => console.log(err));
    }



    render() {
        return(
            <>
                <AnimalListingHeader searchHandler={this.onSearch } endpoint={this.props.endpoint} setPage={this.props.setPage } loadState={this.loadState}></AnimalListingHeader>
                {/* <AnimalListingHeader onSearch={this.onSearch} searchQuery={this.state.searchQuery} onSubmit={this.onSearch}></AnimalListingHeader> */}
                <AnimalListing endpoint={this.props.endpoint} loadState={this.loadState} animalArray={this.state.animalArray} profilePic={this.state.profilePic} setAnimal={this.props.setAnimal} permission={this.props.permission} setPage={this.props.setPage}/>
            </>
        )
    }
}

export default AnimalWrapper;