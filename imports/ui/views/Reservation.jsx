import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Clubs} from '/lib/clubs.js';
import ReactDOM from 'react-dom';
import {Email} from 'meteor/email';
import {Reservations} from '/lib/reservations.js';
import ReservationButton from '/imports/ui/components/ReservationButton.jsx';
const PostSubs = new SubsManager();
import {
  IonContent,
  IonNavBar,
  IonNavBackButton,
  IonItem,
  IonIcon,
  IonSpinner,
  IonButton,
  IonView
} from 'reactionic';

var backButton = (<IonNavBackButton icon="ion-android-arrow-back" color="" type="clear" customClasses="button-stage"/>);

class App extends Component {

  componentDidMount() {
      const script = document.createElement("script");
      script.src = "/javascripts/reservationjquery.js";
      script.async = true;
      document.body.appendChild(script);
    }


  handleSubmit(event) {
    var ionUpdatePopup = this.context.ionUpdatePopup;
    event.preventDefault();

    //Validation
    if (this.refs.reservationDate.value == '') {
      alert("When do you want to Party?");
      return false;
    } else if (this.refs.Name.value == '') {
      alert("We need your Name!");
      return false;
    } else if (this.refs.Persons.value == '') {
      alert("About how many people will you be?");
      return false;
    } else if (this.refs.Contact.value.length < 7) {
      alert("We need your correct Phone Number!");
      return false;
    } else {

      const reservation = Object.keys(this.refs).map(c => ({[c]: this.refs[c].value}));
      Meteor.call('sendEmail', 'juliantosun@gmail.com,timm.eilmann@apps-unlimited.de,lesley.p.schilling@apps-unlimited.de', 'juliantosun@gmail.com', 'New Reservation from ' + this.refs.Name.value, JSON.stringify(reservation, null, '\t'));
      Meteor.call('reservation.insert', reservation);

      ionUpdatePopup({
        popupType: 'show',
        title: 'Thanks for your reservation',
        template: 'We will contact the club now and come back to you as soon as possible!',
        buttons: [
          {
            text: 'Close',
            type: 'button-dark'
          }
        ]
      })

      this.refs.Club.value = 'Tell me!';
      this.refs.Persons.value = '';
      this.refs.reservationDate.value = '';
      this.refs.Wishes.value = '';
    }
  }

  render() {
    return (
      <div className="custombg">
        {this.props.params.location || this.props.params.time
          ? <IonNavBar customClasses="bar-dark" title="Your Personal Concierge" leftButton={backButton}/>
            : <IonNavBar customClasses="bar-dark" title="Your Personal Concierge"/>}
        <IonContent {...this.props}>
          {this.props.clubs
            ? <div className="container" onSubmit={this.handleSubmit.bind(this)}>
              <form className="form-group" method="POST">
                <div className="card-content reservationcard-content">
                  <div className="row reservationintro">
                    <p className="intro col s9">Reserve your table at one of our venues with your personal concierge!</p>
                    <img src="/images/vip.png" className="img-responsive col s3"/></div>
                  <IonItem divider>Where do you want to Party?</IonItem>
                  <label>
                    {this.props.club
                      ? <select ref="Club" disabled>
                        <option value={this.props.club}>{this.props.club}</option>
                      </select>
                        : <select ref="Club" onBlur={() => this.refs.reservationDate.focus()}>
                          <option key='tellme' value='Tell me!'>Not sure, Tell me!</option>
                          {this.props.clubs.map(c => <option key={c.fbid} value={c.text}>{c.text}</option>)}
                        </select>}
                  </label>
                  <IonItem divider>When?</IonItem>
                  {this.props.time
                    ? <label className="item item-input label-disabled"><input type="date" disabled ref="reservationDate" value={this.props.time}/></label>
                      : <label className="item item-input"><input type="date" ref="reservationDate" autoFocus={this.props.params.location ? true : false} /></label>}
                  <IonItem divider>Whats your Name?</IonItem>
                  <label className="item item-input"><input type="text" ref="Name" onBlur={() => this.refs.Persons.focus()} autoFocus={this.props.time ? true : false} /></label>
                    <IonItem divider>About how many people will you be?</IonItem>
                  <label className="item item-input"><input type="number" ref="Persons" min="2" max="20" onBlur={() => this.refs.Contact.focus()}/></label>
                  <IonItem divider>Your Phone number?</IonItem>
                  <label className="item item-input"><input type="tel" ref="Contact"/></label>
                  <IonItem divider>Any special wishes?</IonItem>
                  <label className="item item-input"><input type="text" ref="Wishes" placeholder="optional"/></label>
                  <input type="submit" className="button button-dark button button-block" value="Book a Table"/>
                </div>
              </form>
            </div>
              : <div className="padding"><IonSpinner icon="ios"/>
              </div>}
        </IonContent>
      </div>
    );
  }
}

App.propTypes = {
  clubs: PropTypes.array.isRequired
};
App.contextTypes = {
  ionUpdatePopup: React.PropTypes.func
};

export default createContainer((params) => {
  PostSubs.subscribe('clubs');
  return {clubs: Clubs.find({}).fetch(), club: params.params.location, time: params.params.time};
}, App);
