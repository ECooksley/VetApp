import AnimalProfileHeader from "./AnimalProfileHeader";
import Profile from "./AnimalProfileInfo";
import Reminders from "./Reminders";
import Comments from "./Comments";
import Images from "./Images";
import StudentComments from "./StudentComments";
import DistFeatures from "./DistFeatures";
import 'bulma/css/bulma.min.css';
import React from "react";


class AnimalProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 0
    }
    this.displayContent = this.displayContent.bind(this);
  }

  displayContent(i) {
    if (i === 0) {
      return <DistFeatures permission = {this.props.permission} animalId = {this.props.animalId} endpoint = {this.props.endpoint}/>
    } else if (i === 1) {
      return <Reminders id = {this.props.id} name = {this.props.userName} permission = {this.props.permission} animalId = {this.props.animalId} endpoint = {this.props.endpoint}/>
    } else if (i === 2) {
      return <Comments id = {this.props.id} name = {this.props.userName} permission = {this.props.permission} animalId = {this.props.animalId} endpoint = {this.props.endpoint}/>
    } else if (i === 3) {
      return <StudentComments id = {this.props.id} name = {this.props.userName} permission = {this.props.permission} animalId = {this.props.animalId} endpoint = {this.props.endpoint}/>
    } else if (i === 4) {
      return <Images permission = {this.props.permission} animalId = {this.props.animalId} endpoint = {this.props.endpoint}/>
    } else {
      return;
    }
  }

  changePage = i => {
    this.setState({pageState: i})
  }

  render() {
    const pageState = this.state.pageState;
    let page;
    return (
      <>
        <AnimalProfileHeader state={pageState} onClick={this.changePage} setPage={this.props.setPage} setAnimal={this.props.setAnimal} animalId = {this.props.animalId} endpoint = {this.props.endpoint}/>
        <section className="hero is-fullheight is-default is-bold has-background-grey-lighter">
          <div className="hero-head"></div>
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="columns is-vcentered">
                <div className="column is-5">
                  <Profile setAnimal = {this.props.setAnimal} permission = {this.props.permission} animalId = {this.props.animalId} endpoint = {this.props.endpoint}/>
                </div>
                <div className="column is-6 is-offset-1">
                  {page = this.displayContent(pageState)}
                </div>
              </div>
            </div>
          </div>
        </section>

      </>
    );
  }
}

export default AnimalProfile;
