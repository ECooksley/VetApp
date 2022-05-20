import { css } from "@emotion/react";
import React from "react";
import profilepic from './profile_placeholder.png';
import AnimalListingHeader from './AnimalListingHeader';
import Modal from './Modal';
import axios from "axios";


class AddAnimals extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            addMessage: ""
        };
    };

    onSubmit = event => {
        event.preventDefault();
        let AnimalName = this.AnimalName.value;
        let Species = this.Species.value;
        let Breed = this.Breed.value;
        let Colour = this.Colour.value;
        let Sex = this.Sex.value;
        let Weight = parseFloat(this.Weight.value);
        let BirthDate = parseInt(Date.parse(this.BirthDate.value)) + 86400000; // Date.parse returns 1 day behind correct date. Add offset of 1 day in milliseconds to fix. 
        let TattooNum = this.TattooNum.value;
        // let picURL = this.picURL.value;
        console.log("Name " + AnimalName);
        console.log("Species " + Species);
        console.log("Weight " + Weight);
        console.log("BirthDate " + BirthDate);
        console.log("TattooNum " + TattooNum);
        // console.log("picURL " + picURL);


        axios.post("http://localhost:8000/animal", {name: AnimalName, species: Species, breed: Breed, colour: Colour, sex: Sex, weight: Weight, BirthDateMS: BirthDate, tattoo: TattooNum}).then((res) => {
            console.log(res);
        }).catch((err) => console.log(err));

        this.setState({
            addMessage: "Animal Added!"
        });

        // CLEAR THE INPUT FIELDS
        this.AnimalName.value = "";
        this.Species.value = "";
        this.Breed.value = "";
        this.Colour.value = "";
        this.Sex.value = "";
        this.Weight.value = "";
        this.BirthDate.value = "";
        this.TattooNum.value = "";
        // this.picURL.value = "";
        setTimeout(() => this.props.loadState(), 200);
        
    };

    
    render() {
        return (
            <body>
                <section class="container">
                <div class="columns is-multiline">
                    <div class="column register">
                    <div class="columns">
                        <div class="column">
                            <h2 class="subtitle colored is-4">Please enter details below</h2>
                            <form onSubmit ={this.onSubmit}>
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-medium" type="text" placeholder="Animal Name"
                                        ref={input => this.AnimalName = input}/>
                                    </div>
                                </div>
        
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-medium" type="text" placeholder="Species"
                                        ref={input => this.Species = input}/>
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="control">
                                        <input class="input is-medium" type="text" placeholder="Breed"
                                        ref={input => this.Breed = input}/>
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="control">
                                        <input class="input is-medium" type="text" placeholder="Colour"
                                        ref={input => this.Colour = input}/>
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="control">
                                        <input class="input is-medium" type="text" placeholder="Sex (M/F)"
                                        ref={input => this.Sex = input}/>
                                    </div>
                                </div>
        
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-medium" type="text" placeholder="Weight (kg)"
                                        ref={input => this.Weight = input}/>
                                    </div>
                                </div>
        
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-medium" type="text" placeholder="Date of Birth (YYYY-MM-DD)"
                                        ref={input => this.BirthDate = input}/>
                                    </div>
                                </div>
        
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-medium" type="text" placeholder="Tattoo #"
                                        ref={input => this.TattooNum = input}/>
                                    </div>
                                </div>
        
                                {/* <div class="field">
                                    <div class="control">
                                        <input class="input is-medium" type="text" placeholder="Profile Picture URL"
                                        ref={input => this.picURL = input}/>
                                    </div>
                                </div> */}
        
        
                                <button class="button is-block is-primary is-fullwidth is-medium" type = "submit">Submit</button>
                                <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                                    <p className='help is-success'>{this.state.addMessage}</p>
                                </div>
                            </form>
                        </div>
                        {/* <div class="column right">
                            <p class="description">Upload Photo</p>
                            <form>
                                <div class="media">
                                    <div class="media">
                                    <figure class="image">
                                        <img src={profilepic} alt="Animal Picture"/>
                                    </figure>
                                    </div>
                                </div>
                                <button class="button is-block is-primary is-fullwidth is-medium">Upload Photo</button>
                                <br />
                            </form>
                        </div> */}
                    </div>
                    </div>
                </div>
                </section>
            </body>
    
        );
    };
}

export default AddAnimals;
