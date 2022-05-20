import React from 'react';
import Modal from './Modal';
import axios from 'axios';
import placeholderImg from './profile_placeholder.png';

class Images extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [{}],
            imgNum: 0,
            numImages: 0,
            isEditable: false,
            showState: false,
            editedDescription: false,
            imgurl: '',
            addMessage: ''
        }

        this.handleRightClick = this.handleRightClick.bind(this)
        this.handleLeftClick = this.handleLeftClick.bind(this)
        this.handleAddClick = this.handleAddClick.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getImage = this.getImage.bind(this)
        this.handleConfirmClick = this.handleConfirmClick.bind(this)
    }

    loadState() {
        axios.get(this.props.endpoint + "/animal/" + this.props.animalId + "/images")
            .then((res) => {
                const images = res.data
                if (images.length === 0) {
                    const placeholderImages = [{ "imageId": 0, "animalId": 0, "url": placeholderImg, "imageDescription": "Placeholder Image" }]
                    console.log(placeholderImages)
                    this.setState({
                        images: placeholderImages,
                        numImages: 1,
                    })
                } else {
                    this.setState({
                        images: images,
                        numImages: images.length,
                        editedDescription: false
                    })
                }

            })
            .catch((err) => console.log(err));

    }

    setisEditable = i => {
        this.loadState()
        this.setState({ isEditable: i })
    }

    getImage(i) {
        return this.state.images[i].url;
    }

    handleRightClick() {
        let imgNum = this.state.imgNum
        let numImages = this.state.numImages
        imgNum === numImages - 1 ? imgNum = 0 : imgNum++;
        this.setState({
            imgNum: imgNum
        })
    }

    handleLeftClick() {
        let imgNum = this.state.imgNum
        let numImages = this.state.numImages
        imgNum === 0 ? imgNum = numImages - 1 : imgNum--;

        this.setState({
            imgNum: imgNum
        })
    }

    handleAddClick() {
        axios.post(this.props.endpoint + "/images", {
            animalId: this.props.animalId, url: this.state.imgurl,
            imageDescription: ''
        }).then((res) => {
            console.log(res);
        }).catch((err) => console.log(err));
        this.setState({
            imgurl: '',
            addMessage: 'Added!'
        })

        setTimeout(() => this.loadState(), 100)
    }

    toggleModal() {
        if (this.state.addMessage === 'Added!') {
            this.setState({
                imgNum: this.state.numImages - 1
            })
        }

        this.setState({
            addMessage: '',
            imgurl: ''
        })
        this.setState((prev, props) => {
            const newState = !prev.showState;

            return { showState: newState }
        })
    }

    handleDeleteClick(i) {
        const index = i;
        const imageId = this.state.images[i].imageId
        let newImages = [...this.state.images]
        newImages.splice(index, 1)
        this.setState({
            images: newImages,
            numImages: this.state.numImages - 1,
            imgNum: 0
        })
        axios.delete(this.props.endpoint + "/images/" + imageId)
            .then((res) => { console.log(res) })
            .catch((err) => console.log(err));
    }

    handleInputChange(i) {
        return e => {
            this.setState({
                editedDescription: true
            })
            const newDescription = { ...this.state.images[i], imageDescription: e.target.value }
            let images = this.state.images
            images[i] = newDescription
            this.setState({
                images: images
            })
        }
    }

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleConfirmClick() {
        const imageId = this.state.images[this.state.imgNum].imageId
        const imageDescr = this.state.images[this.state.imgNum].imageDescription
        axios.put(this.props.endpoint + "/images", { imageId: imageId, imageDescription: imageDescr })
            .then((res) => {
                console.log(res)
            }).catch((err) => console.log(err));
        setTimeout(() => this.loadState(), 100)
    }

    componentDidMount() {
        this.loadState()
    }

    render() {
        return (
            <div className='card'>
                {this.state.isEditable ?
                    (
                        this.props.permission > 2 ?
                            (
                                <div className='card-header'>
                                    <button onClick={() => this.handleDeleteClick(this.state.imgNum)} className='button is-danger is-fullwidth'>Delete</button>
                                    <button onClick={this.toggleModal} className='button is-success is-fullwidth'>Add</button>
                                </div>
                            ) :
                            (
                                <div className='card-header'>
                                    <button onClick={this.toggleModal} className='button is-success is-fullwidth'>Add</button>
                                </div>
                            )) : ''

                }
                <div className='card-image'>
                    <figure className='image is-4by3'>
                        <img src={this.getImage(this.state.imgNum)} alt="Placeholder"></img>
                    </figure>
                </div>
                <div className='card-content'>
                    <div className='control'>
                        {this.state.isEditable ?
                            (this.state.editedDescription ?
                                (
                                    <div className='container'>
                                        <textarea onChange={this.handleInputChange(this.state.imgNum)} className='textarea is-small has-fixed-size' placeholder='Photo Description' value={this.state.images[this.state.imgNum].imageDescription}></textarea>
                                        <button onClick={this.handleConfirmClick} className='button is-success is-fullwidth'>Confirm</button>
                                    </div>
                                ) :
                                (
                                    <div className='container'>
                                        <textarea onChange={this.handleInputChange(this.state.imgNum)} className='textarea is-small has-fixed-size' placeholder='Photo Description' value={this.state.images[this.state.imgNum].imageDescription}></textarea>
                                    </div>
                                )
                            )



                            :
                            (<textarea readOnly className='textarea is-small has-fixed-size' placeholder='Photo Description' value={this.state.images[this.state.imgNum].imageDescription}></textarea>)
                        }
                    </div>
                </div>
                {this.props.permission > 1 ?
                    (
                        <footer className='card-footer'>
                            <button onClick={() => this.handleLeftClick()} className='card-footer-item button is-warning is-medium'>Previous</button>
                            <button onClick={() => { this.setisEditable(!this.state.isEditable) }} className={`card-footer-item button is-medium ${this.state.isEditable ? 'is-success' : 'is-info'}`}>
                                {this.state.isEditable ? 'Save' : 'Edit'}
                            </button>
                            <button onClick={() => this.handleRightClick()} className='card-footer-item button is-medium is-link'>Next</button>
                        </footer>
                    ) :
                    (
                        <footer className='card-footer'>
                            <button onClick={() => this.handleLeftClick()} className='card-footer-item button is-warning is-medium'>Previous</button>
                            <button onClick={() => this.handleRightClick()} className='card-footer-item button is-medium is-link'>Next</button>
                        </footer>
                    )}

                <Modal closeModal={this.toggleModal} modalState={this.state.showState} title='Enter location of photo to add'>
                    <div className='container'>
                        <div className='columns is-centered'>
                            <div className='column is-three-quarters'>
                                <div className='field has-addons has-addons-fullwidth'>
                                    <div className='control'>
                                        <input className='input' onChange={this.handleChange} type='text' name='imgurl' value={this.state.imgurl} placeholder='https://image.location'></input>
                                    </div>
                                    <div className='control'>
                                        <button onClick={this.handleAddClick} className='button is-fullwidth is-success'>Add</button>
                                    </div>
                                </div>
                                <div>
                                    <p className='help is-success'>{this.state.addMessage}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default Images;