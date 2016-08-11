import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Clubs} from '/lib/clubs.js';
import Tile from '/imports/ui/components/Tile.jsx';
import Map from '/imports/ui/components/Map.jsx';
import ReservationButton from '/imports/ui/components/ReservationButton.jsx';
const PostSubs = new SubsManager();
import {IonContent, IonNavBar, IonNavBackButton,IonSpinner } from 'reactionic';
var backButton = (<IonNavBackButton icon="ion-android-arrow-back" color="" type="clear" customClasses="button-stage"/>);

class App extends Component {

  render() {
    return (
      <div className="custombg">
        <IonNavBar customClasses="bar-dark" title={this.props.club
          ? this.props.club.text
        : "..."} leftButton={backButton}/>
        <IonContent>
          {this.props.club
            ? <div>
              <div className="container innercontainer">
                <div className="clubcover" style={{
                  backgroundImage: 'url(' + this.props.club.customcover + ')'
                }}></div>
                <div className="clubview-cluboverlay">
                  <h6>{this.props.club.text}</h6>
                  <small>{this.props.club.fbData.location.street}, {this.props.club.fbData.location.city}</small>
                </div>
                <ReservationButton href={"/concierge/" + this.props.club.text}/>
                <div className="tilecontainer row">
                  <Tile image="/images/IconPics/Gallerien.png" caption="Gallerys" href={"/albums/" + this.props.club.fbid}/>
                  <Tile image="/images/IconPics/Bottles.png" customClasses="inactive" caption="Bottles" href="#"/>
                </div>
                <div className="tilecontainer row">
                  <Tile image="/images/IconPics/DJ.png"  caption="Events" href={"/calendar/" + this.props.club.text}/>
                  <Tile image="/images/IconPics/Club.png" customClasses="inactive" caption="About"  href="#" />
                </div>
              </div>
              <Map place={this.props.club.fbData}/>
            </div>
              : <div className="padding"><IonSpinner icon="ios" /></div>
          }
        </IonContent>
      </div>
    );
  }
}

App.propTypes = {
  club: PropTypes.object
};

export default createContainer((params) => {
  PostSubs.subscribe('clubs');
  return {
    club: Clubs.findOne({fbid: params.params.clubId})
  };
}, App);
