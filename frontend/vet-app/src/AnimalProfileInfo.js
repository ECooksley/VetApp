import React from 'react';
import axios from 'axios';
import './Profile.css';
import placeholderimg from './profile_placeholder.png';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            isEditable: false,
            conversion: '',
            img: placeholderimg
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    loadState() {
        axios.get(this.props.endpoint + "/animal/" + this.props.animalId + "/profile")
            .then((res) => {
                const profile = res.data
                this.setState({ profile: profile })
            })
            .catch((err) => console.log(err));
        this.setState({ conversion: 'kg' })
    }

    handleCancel = i => {
        this.loadState()
        this.setState({ isEditable: i })
    }

    setisEditable = i => {
        if (!i) {
            let newProfile = this.state.profile
            if (this.state.conversion === 'lb') {
                const weight = this.state.profile.weight
                let kgWeight = weight / 2.205
                kgWeight = kgWeight.toFixed(2)
                newProfile = { ...this.state.profile, weight: kgWeight }
            }
            
            axios.put(this.props.endpoint + "/animal/" + this.props.animalId + "/profile", newProfile)
                .then((res) => {
                    console.log(res)
                }).catch((err) => console.log(err));
            setTimeout(() => this.loadState(), 100)
        }
        this.setState({ isEditable: i })
    }

    handleChange(event) {
        this.weightConversion()
        this.setState({ conversion: event.target.value })
    }

    handleInputChange(property) {
        return e => {
            const newProfile = { ...this.state.profile, [property]: e.target.value }
            this.setState({
                profile: newProfile
            })
        }
    }

    weightConversion() {
        const weight = this.state.profile.weight
        let newWeight = this.state.conversion === 'kg' ? weight * 2.205 : weight / 2.205
        newWeight = newWeight.toFixed(2)
        const newProfile = { ...this.state.profile, weight: newWeight }

        this.setState({
            profile: newProfile
        })
    }

    componentDidMount() {
        this.loadState()
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    replaceNull(value) {
        if (value === null) {
            return ""
        }
        else {
            return value;
        }
    }


    render() {
        return (
            <div className='card'>
                <div className='card-image'>
                    <figure className="image is-square">
                    {this.state.profile.profileURL === null ? 
                    (<img src={this.state.img} alt="Description"></img>)
                    :
                    (<img src={this.state.profile.profileURL} alt={this.state.profile.profileURL}></img>)
                    }
                    </figure>
                </div>
                <div className='card-content-scrollable'>
                    <div className='content has-text-left'>
                        <ul>
                            {
                                Object.entries(this.state.profile).map(([key, value]) => (
                                    key !== 'weight' ? (
                                        key == 'id' || key == 'status' || key == 'profileURL' ? '' :
                                            <div key={key} className='field'>
                                                <label className='label'>{this.capitalize(key)}</label>
                                                <div className='control'>
                                                    {this.state.isEditable
                                                        ?
                                                        (<input onChange={this.handleInputChange(key)} className='input' type='text' value={this.replaceNull(value)}></input>)
                                                        :
                                                        (<p className='is-family-code is-size-5'>{this.replaceNull(value)}</p>)
                                                    }
                                                </div>
                                            </div>
                                    ) :
                                        (<div key={key} className='field'>
                                            <label className='label'>{this.capitalize(key)}</label>
                                            {this.state.isEditable
                                                ?
                                                (
                                                    <div className='field has-addons'>
                                                        <div className='control pt-1'>
                                                            <input onChange={this.handleInputChange(key)} className='input' type='text' value={this.replaceNull(value)}></input>
                                                        </div>
                                                        <div className='select ml-6'>
                                                            <select value={this.state.conversion} onChange={this.handleChange}>
                                                                <option value='kg'>kg</option>
                                                                <option value='lb'>lb</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                (<div className='field has-addons'>
                                                    <div className='control pt-1'>
                                                        <p className='is-family-code is-size-5'>{value}</p>
                                                    </div>
                                                    <div className='select ml-6'>
                                                        <select value={this.state.conversion} onChange={this.handleChange}>
                                                            <option value='kg'>kg</option>
                                                            <option value='lb'>lb</option>
                                                        </select>
                                                    </div>
                                                </div>)
                                            }
                                        </div>
                                        )
                                ))
                            }
                        </ul>
                    </div>
                </div>
                {this.props.permission >= 3 ?
                    (this.state.isEditable ?
                    <footer className='card-footer'>
                        <button onClick={() => { this.handleCancel(!this.state.isEditable) }} className='card-footer-item button is-danger'>Cancel</button>
                        <button onClick={() => { this.setisEditable(!this.state.isEditable) }} className='card-footer-item button is-success'>
                            Save
                        </button>
                    </footer>
                    :
                    <footer className='card-footer'>
                        <button onClick={() => { this.setisEditable(!this.state.isEditable) }} className='card-footer-item button is-info'>
                            Edit
                        </button>
                    </footer>) :
                    ''
                }
            </div>


        );
    }
}


export default Profile;