/** @jsxImportSource @emotion/react */
// import React from "react";
// import {css} from '@emotion/core';
import { css } from '@emotion/react'
import React from 'react';
import AddAnimals from "./AddAnimals";
import Modal from './Modal';
import axios from "axios";

class AnimalListingHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showState: false,
            // searchQuery: ''
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    toggleModal() {
        // this.setState({
        //     addMessage: ''
        // })
        this.setState((prev, props) => {
            const newState = !prev.showState;

            return { showState: newState }
        })
    };

    // onInput = (e) => this.setState({
    //     searchQuery: e.target.value
    // });

    onSubmit = (e) => {
        e.preventDefault();
        let a = this.searchQ.value;
        console.log(a)
        this.props.searchHandler(a);
        // console.log(this.searchQ.value);
        console.log("clicked");
        // console.log(this.state.searchQuery);
        // this.props.onSubmit(this.state.searchQuery);
    }

    // onSearch = event => {
    //     event.preventDefault();
    //     let searchQuery = this.searchQuery.value;

    //     axios.get("http://localhost:8000/animal/search/" + searchQuery)
    //         .then((res) => {
    //             const response = res.data;
    //             console.log(response);
    //             this.setState({
    //                 animalArray: response
    //             });
    //         }).catch((err) => console.log(err));
    // };

    // onChangeInput(searchQ){
    //     this.setState({searchQuery: searchQ});
    // }

    render() {
        return (
            <>
                <header
                    className="columns is-mobile"
                    css={css`
                        border-bottom: 0.5px solid silver;
                        background: #efefef;
                        padding: 10px 10px 0 10px;
                    `}
                >
                    <div className="column is-1">
                        <div>
                            <button className="button is-small is-link" onClick={() => this.props.setPage(1)}>Back</button>
                        </div>
                    </div>
                    <div className="column"
                        css={css
                            `display: flex; 
                        align-itmes: center;
                        `}
                    >
                        <h1 class='title is-4'>Animals</h1>
                    </div>

                    <div className="column has-text-right">
                        <form onSubmit={this.onSubmit}>
                            <input
                                css={css`
                                margin-right: 6px;
                            `}
                                type="text" id="animalsearch" name="animalsearch"
                                ref={input => this.searchQ = input} />
                            <button className="button is-small is-link">Search</button>
                        </form>

                        {/* <Modal show={this.state.show} handleClose={this.toggleModal}>
                            <AddAnimals/>
                        </Modal> */}
                        <button
                            css={css`
                        margin-top: 6px;
                        `}
                            className="button is-small is-link modal-button" onClick={this.toggleModal}>Add Animal</button>
                        <Modal closeModal={this.toggleModal} modalState={this.state.showState} title='Add animal'>
                            <div className='container'>
                                <AddAnimals endpoint={this.state.endpoint} loadState={this.props.loadState}/>
                            </div>
                        </Modal>
                    </div>
                </header>
            </>
        );
    }

}


export default AnimalListingHeader;