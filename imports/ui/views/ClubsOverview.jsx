import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Link} from "react-router";
import {Clubs} from '/lib/clubs.js';
import Tile from '/imports/ui//components/Tile.jsx';
const PostSubs = new SubsManager();
import {IonContent, IonNavBar, IonNavBackButton, IonSpinner} from 'reactionic';


class ClubsOverview extends Component {
  render() {
    return (
      <div className="fullopabg">
        <IonNavBar customClasses="bar-dark" title="Venues" />
        <IonContent>
          <div className="tilecontainer">
            <div className="row text-center">
              {this.props.clubs
                ? this.props.clubs.map(c =><Tile href={'/clubs/' + c.fbid} image={c.img} caption={c.text} key={c.fbid}/>)
                  : <div className="padding"><IonSpinner icon="ios" /></div>}
            </div>
          </div>
        </IonContent>
      </div>
    );
  }
}

ClubsOverview.propTypes = {
  clubs: PropTypes.array.isRequired
};

export default createContainer(() => {
  PostSubs.subscribe('clubs');
  return {clubs: Clubs.find({}).fetch()}
}, ClubsOverview);
