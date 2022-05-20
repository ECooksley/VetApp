import React from "react";
import default_profile from "./profile_placeholder.png"
class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <body className="has-background-grey-lighter">
                <section className="section">
                    <div className="container">
                        <h1 className="title is-1">Spy Hill Veterinary Campus System</h1>
                        <figure className="image is-64x64 is-pulled-right">
                            <img className="is-rounded is-clickable" src={default_profile} onClick={()=>this.props.setPage(2)}></img>
                            <p className="has-text-centered">Profile</p>
                            <div className="block"></div>
                            {<p className="has-text-centered">Role: {this.props.getRoleText(this.props.permission)}</p>}
                        </figure>
                    </div>
                </section>
                <div className="column is-one-third is-offset-one-third">
                    <section className="section is-medium">
                        <div className="container block">
                            <button type="button" className="button is-large is-primary is-rounded is-fullwidth" onClick={() => this.props.setPage(6)}>Animals</button>
                        </div>
                        <div className="container block">
                            {this.props.permission == 4 || this.props.permission == 5
                                ? <button type="button" className="button is-large is-primary is-rounded is-fullwidth" onClick={() => this.props.setPage(3)}>User Management</button>
                                : null
                            }
                        </div>
                        <div className="container block">
                            {this.props.permission > 2 
                                ? <button type="button" className="button is-large is-primary is-rounded is-fullwidth" onClick={() => this.props.setPage(7)}>Requests</button>
                                : null
                            }
                        </div>
                    </section>
                </div>
                <footer className="footer has-background-grey-lighter">
                    <div className="container block">
                        <button type="button" className= "button is-small is-link is-rounded" onClick={() => (this.props.setProfile(0,0), this.props.setPage(0))}>Log Out</button>
                    </div>
                </footer>
            </body>
        )
    }
}

export default Home;