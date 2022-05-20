import React from 'react';
import axios from 'axios';

const AnimalProfileHeader = (props) => {
    const [isActive, setisActive] = React.useState(false)
    const [name, setName] = React.useState('')

    React.useEffect(() => {
        axios.get(props.endpoint + "/animal/" + props.animalId + "/profile")
            .then((res) => {
                console.log(res.data.name)
                setName(res.data.name)
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <nav className="navbar has-background-grey-dark" role='navigation' aria-label='main navigation'>
            <div className="navbar-brand">
                <button className='navbar-item has-background-white' onClick={() => (props.setAnimal(0), props.setPage(6))}>Back</button>
                <div className='navbar-item'>
                    <p className="title has-text-white is-1 has-text-weight-light ">{name}</p>
                </div>
                <a
                    onClick={() => {
                        setisActive(!isActive)
                    }}
                    role='button'
                    className={`navbar-burger burger has-text-white ${isActive ? 'is-active' : ''}`}
                    aria-label='menu'
                    aria-expanded='false'
                    data-target='navbarBasicExample'
                >
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                </a>
            </div>
            <div id="navbarMenu" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                <div className="navbar-end">
                    <div className='navbar-item'>
                        <a role='button'
                            onClick={() => props.onClick(0)}
                            className={`navbar-item mr-1 ${props.state === 0 ? 'has-background-primary' : 'has-background-white'}`}>
                            Features
                        </a>
                        <a role='button'
                            onClick={() => props.onClick(1)}
                            className={`navbar-item mr-1 ${props.state === 1 ? 'has-background-primary' : 'has-background-white'}`}>
                            Treatments
                        </a>
                        <a role='button'
                            onClick={() => props.onClick(2)}
                            className={`navbar-item mr-1 ${props.state === 2 ? 'has-background-primary' : 'has-background-white'}`}>
                            Comments
                        </a>
                        <a role='button'
                            onClick={() => props.onClick(3)}
                            className={`navbar-item mr-1 ${props.state === 3 ? 'has-background-primary' : 'has-background-white'}`}>
                            Student Comments
                        </a>
                        <a role='button'
                            onClick={() => props.onClick(4)}
                            className={`navbar-item ${props.state === 4 ? 'has-background-primary' : 'has-background-white'}`}>
                            Images
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AnimalProfileHeader;