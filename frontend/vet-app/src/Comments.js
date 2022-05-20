import React from 'react';
import Table from './CommentTable';
import axios from 'axios';
import Modal from './Modal';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: false,
            showState: false,
            com: '',
            date: null,
            deleteId: -1,
            deleteIndex: -1,
            comments: []
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.setDeleteId = this.setDeleteId.bind(this)
    }

    loadState() {
        axios.get(this.props.endpoint + "/animal/" + this.props.animalId + "/comments")
            .then((res) => {
                const comments = res.data
                console.log(comments)
                this.setState({ comments: comments })
            })
            .catch((err) => console.log(err));
        this.setState({date: null})
    }

    setisEditable = i => {
        this.loadState()
        this.setState({ isEditable: i })
    }

    handleClick() {
        axios.post(this.props.endpoint + "/comments", {
            animalId: this.props.animalId, userId: this.props.id,
            commentDate: this.state.date, commentText: this.state.com
        }).then((res) => {
            console.log(res);
        }).catch((err) => console.log(err));
        this.setState({
            com: '',
            date: ''
        })
        setTimeout(() => this.loadState(), 100)
    }

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleDeleteClick() {
        let newComments = [...this.state.comments]
        newComments.splice(this.state.deleteIndex, 1)
        this.setState({
            comments: newComments
        })

        axios.delete(this.props.endpoint + "/comments/" + this.state.deleteId).then((res) => { console.log(res) }).catch((err) => console.log(err));
        this.toggleModal()
    }

    toggleModal() {
        this.setState((prevState, props) => {
            const newState = !prevState.showState
            return { showState: newState }
        })
    }

    componentDidMount() {
        this.loadState()
    }

    setDeleteId(i, j) {
        this.setState({ deleteId: i, deleteIndex: j })
    }

    render() {
        return (
            <div>
                <div className='card'>
                    <div className='card-title'>
                        <h1 className="title is-3">Comments</h1>
                    </div>
                    <div className='card-content'>
                        <Table comments={this.state.comments} isEditable={this.state.isEditable} toggleModal={() => this.toggleModal()} setDeleteId={this.setDeleteId} permission={this.props.permission} />
                        {this.state.isEditable && this.props.permission >= 2 ?

                            <div className='columns is-vcentered mt-2'>
                                <div className='column is-half'>
                                    <p className='control'>
                                        <input className='input' name='com' onChange={this.handleChange} type='text' placeholder='Comment' value={this.state.com}></input>
                                        <input className='input' name='date' onChange={this.handleChange} type='date' placeholder='Date' value={this.state.date}></input>
                                    </p>
                                </div>
                                <div className='column is-half'>
                                    <button onClick={this.handleClick} className='button is-success is-medium'>Add</button>
                                </div>
                            </div>
                            : ''}
                    </div>
                    {this.props.permission >= 2 ?
                        <footer className='card-footer'>
                            <button onClick={() => { this.setisEditable(!this.state.isEditable) }} className={`card-footer-item button ${this.state.isEditable ? 'is-success' : 'is-info'}`}>
                                {this.state.isEditable ? 'Save' : 'Edit'}
                            </button>
                        </footer>
                        : null}
                </div>
                <Modal closeModal={this.toggleModal} modalState={this.state.showState} title='Confirm delete?'>
                    <div className='container'>
                        <button onClick={this.handleDeleteClick} className='button is-success'>Confirm</button>
                    </div>
                </Modal>
            </div>
        );
    }


}

export default Comments;