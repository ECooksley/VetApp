import React from 'react';
import axios from 'axios';
import Table from './ReminderTable';
import './Comments.css';
import Modal from './Modal';

class Reminders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: false,
            showState: false,
            date: null,
            type: '',
            descr: '',
            notifyDate: null,
            deleteId: -1,
            deleteIndex: -1,
            reminders: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.setDeleteId = this.setDeleteId.bind(this)
    }

    loadState() {
        axios.get(this.props.endpoint + "/animal/" + this.props.animalId + "/treatments")
            .then((res) => {
                const reminders = res.data
                console.log(reminders)
                this.setState({ reminders: reminders })
            })
            .catch((err) => console.log(err));
        this.setState({date: null, notifyDate: null})
    }

    setisEditable = i => {
        this.loadState()
        this.setState({ isEditable: i })
    }

    handleClick() {
        axios.post(this.props.endpoint + "/treatments", {
            animalId: this.props.animalId, userId: this.props.id, prescribedDate: this.state.date,
            treatmentType: this.state.type, treatmentDescription: this.state.descr, name: this.props.name, notifyDate: this.state.notifyDate
        }).then((res) => {
            console.log(res);
        }).catch((err) => console.log(err));
        this.setState({
            date: '',
            type: '',
            descr: '',
            notifyDate: ''
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
        let newReminders = [...this.state.reminders]
        newReminders.splice(this.state.deleteIndex, 1)
        this.setState({
            reminders: newReminders
        })
        axios.delete(this.props.endpoint + "/treatments/" + this.state.deleteId).then((res) => { console.log(res) }).catch((err) => console.log(err));
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
                        <h1 className="title is-3">Treatments</h1>
                    </div>
                    <div className='card-content'>
                        <Table reminders={this.state.reminders} isEditable={this.state.isEditable} toggleModal={() => this.toggleModal()} setDeleteId={this.setDeleteId} permission={this.props.permission} />
                        {this.state.isEditable && this.props.permission >= 2 ?

                            <div className='columns is-vcentered mt-2'>
                                <div className='column is-half'>
                                    <p className='control'>
                                        <input className='input' name='date' onChange={this.handleChange} type='date' placeholder='Date' value={this.state.date}></input>
                                        <input className='input' name='type' onChange={this.handleChange} type='text' placeholder='Type' value={this.state.type}></input>
                                        <input className='input' name='descr' onChange={this.handleChange} type='text' placeholder='Description' value={this.state.descr}></input>
                                        <input className='input' name='notifyDate' onChange={this.handleChange} type='date' placeholder='Notification Date' value={this.state.notifyDate}></input>
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


export default Reminders;