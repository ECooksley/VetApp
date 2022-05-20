import React from 'react';
import axios from 'axios';


class DistFeatures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            features: [],
            isEditable: false,
            newFeature: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
    }

    loadState() {
        axios.get(this.props.endpoint + "/animal/" + this.props.animalId + "/features")
            .then((res) => {
                const features = res.data
                console.log(features)
                this.setState({ features: features })
            })
            .catch((err) => console.log(err));
    }

    setisEditable = i => {
        if (!i) {
            console.log(this.state.features)
            setTimeout(() => this.loadState(), 100)
        }
        this.setState({ isEditable: i })
    }

    handleCancel = i => {
        this.loadState()
        this.setState({ isEditable: i })
    }

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleAdd() {
        axios.post(this.props.endpoint + "/animal/" + this.props.animalId + "/features", this.state.newFeature)
            .then((res) => {
                console.log(res);
            }).catch((err) => console.log(err));
        this.setState({
            newFeature: ''
        })
        setTimeout(() => this.loadState(), 100)
    }

    handleDelete(key) {
        const feature = this.state.features[key]
        axios.put(this.props.endpoint + "/animal/" + this.props.animalId + "/features", feature)
            .then((res) => {
                console.log(res);
            }).catch((err) => console.log(err));
        setTimeout(() => this.loadState(), 100)
    }

    componentDidMount() {
        this.loadState()
    }

    render() {
        return (
            <div className='card'>
                <div className='card-title'>
                    <h1 className="title is-3">Distinguishing Features</h1>
                </div>
                <div className='card-content-scrollable'>
                    <div className='content'>
                        <ul>
                            {
                                Object.entries(this.state.features).map(([key, value]) => (
                                    <div key={key} className='field has-addons'>
                                        {this.state.isEditable && this.props.permission > 2 ? <div onClick={() => this.handleDelete(key)} className='delete button is-danger mr-3 mt-2'></div> : ''}
                                        <div className='control'>
                                            <p className='is-family-code is-size-5'>{value}</p>
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                this.state.isEditable ?
                                    (
                                        <div key={this.state.features.length} className='field has-addons mb-1'>
                                            <div className='control'>
                                                <input onChange={this.handleChange} name='newFeature' className='input' type='text' value={this.state.newFeature}></input>
                                            </div>
                                            <div onClick={this.handleAdd} className='button is-success ml-6'>Add</div>
                                        </div>
                                    ) : ''
                            }
                        </ul>
                    </div>
                </div>
                {this.props.permission >= 2 ?
                        <footer className='card-footer'>
                            <button onClick={() => { this.setisEditable(!this.state.isEditable) }} className={`card-footer-item button ${this.state.isEditable ? 'is-success' : 'is-info'}`}>
                                {this.state.isEditable ? 'Save' : 'Edit'}
                            </button>
                        </footer>
                        : null}
            </div>
        );
    }
}

export default DistFeatures;