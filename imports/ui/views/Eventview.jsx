import React, {Component, PropTypes} from 'react';
import {HTTP} from 'meteor/http';
import ReservationButton from '/imports/ui/components/ReservationButton.jsx';
import Map from '/imports/ui/components/Map.jsx';
const token = '&access_token=CAAAACZAVC6ygBAGrwdPokM2EKPlZBQUHRZCWQH8CubDAw9xV2R51s1XBqTcxQhZALXyZBltZA0oCTtFciywBANbrruAZBttf4aejWyETVXjHhqfJnt7UQhtijF3cWHZAwztEWZCbGyXw3ND2yRl6gwxHJQTFLy6TvFPwzsbUJZCONrBJ45VK0q7cZBXooqk0dfbgZBgZD';
import {IonContent, IonNavBar, IonNavBackButton, IonSpinner} from 'reactionic';

var backButton = (<IonNavBackButton icon="ion-android-arrow-back" color="" type="clear" customClasses="button-stage"/>);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bettercover: '',
      preloader: <div className="padding"><IonSpinner icon="ios" /></div>,
      displaytime: '',
      event: {
        cover: {},
        name: '...',
        place: {
          location: {},
          name: ''
        },
        start_time: ''
      }
    }
  }

  componentDidMount() {
    HTTP.get('https://graph.facebook.com/v2.6/' + this.props.params.eventId + "?fields=cover,place,name,start_time,description,attending_count,maybe_count" + token, (err, resp) => {
      this.setState({
        event: {
          name: resp.data.name.substring(0, 49),
          place: resp.data.place ,
          start_time: resp.data.start_time,
          description: resp.data.description
        },
        bettercover: resp.data.cover.source,
        displaytime: resp.data.start_time.slice(8, 10) + '.' + resp.data.start_time.slice(5, 7) + ' ' + resp.data.start_time.slice(11, 16),
        preloader: ''
      });
      const script = document.createElement("script");
      script.src = "/javascripts/eventsjquery.js";
      script.async = true;
      document.body.appendChild(script);
    });
  }

  render() {
    return (
      <div className="custombg">
        <IonNavBar customClasses="bar-dark" title={this.state.event.name} leftButton={backButton}/>
        <IonContent>
          <div className="container">
            <div className="eventcover" style={{
              backgroundImage: 'url(' + this.state.bettercover + ')'
            }}></div>
            {this.state.event.place !== undefined ? (<ReservationButton href={"/concierge/" + this.state.event.place.name + "/" + this.state.event.start_time.substring(0, 10)}/>) : ''}
            <div className="card notopmargin">
              <div className="card-content">
                <h5>time</h5>
                <span>{this.state.displaytime}</span>
                <h5>about</h5>
                <div className="read_more eventdescription">{this.state.event.description}</div>
              </div>
            </div>
            {this.state.event.place !== undefined ? (<Map place={this.state.event.place} name={this.state.event.place.name}/>) : ''}
          </div>
        </IonContent>
      </div>
    );
  }
};
