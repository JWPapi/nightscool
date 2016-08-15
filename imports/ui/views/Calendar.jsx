import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import SearchInput, {createFilter} from 'react-search-input';
import {Events} from '/lib/events.js';
import Card from '/imports/ui/components/Card.jsx';
const PostSubs = new SubsManager();
import {
  IonContent,
  IonNavBar,
  IonNavBackButton,
  IonView,
  IonNavView,
  IonPopoverButton,
  IonSpinner,
  IonButton
} from 'reactionic';
var backButton = (<IonNavBackButton icon="ion-android-arrow-back"/>);
const KEYS_TO_FILTERS = ['place.name', 'name'];
import {getPlatform} from '/client/utils/helpers.jsx';
import {DemoPopover} from './popover';

function whichDay(dateString) {
  const daysOfWeek = new Array('Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag');
  return daysOfWeek[new Date(dateString).getUTCDay()];
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchField: ''
    }
  }

  searchUpdated(term) {
    this.setState({searchTerm: term})
  }

  displaySearchfield() {
    this.setState({
      searchField: <div className="list list-inset">
          <label className="item item-input">
            <i className="icon ion-android-search placeholder-icon"></i>
            <SearchInput onChange={this.searchUpdated.bind(this)}/>
          </label>
        </div>
    })
  }

  render() {

    var rightHeaderButton = <IonPopoverButton type="clear" icon='ion-android-calendar' onClick={() => {
      this.context.ionShowPopover(demoPopover)
    }}/>
    var searchButton = (
      <IonButton icon="button icon ion-android-search" color="" type="clear" customClasses="button-stage" onClick={this.displaySearchfield.bind(this)}></IonButton>
    )
    var filteredeventlist = this.props.events.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    const days = _.groupBy(filteredeventlist, eventobj => {
      let starttime = new Date(eventobj.start_time);
      return whichDay(eventobj.start_time) + " " + starttime.getUTCDate() + '.' + (starttime.getUTCMonth() + 1)
    });
    let demoPopover = <DemoPopover dropdown={Object.keys(days)}/>
    return (
      <div className="custombg">
        <IonNavBar customClasses="bar-dark" title={<img src="/images/logo.gif" className="logo" />} leftButton={this.props.params.club ? backButton : searchButton} rightButton={rightHeaderButton} />
        <IonContent>
          {this.state.searchField}
          {days
            ? Object.keys(days).map(day => {
              return <div key={day}>
                <a id={day} className="calenderday">{day}</a>
                {days[day].map(event => <a href={"/events/" + event.id} key={event._id}><Card image={event.cover.source} caption={event.name} subtitle={event.place.name}/></a>)}
              </div>;
            })
            : <div className="padding"><IonSpinner icon="ios"/></div>}
        </IonContent>
      </div>
    );
  }
}

Calendar.propTypes = {
  events: PropTypes.array.isRequired
};
Calendar.contextTypes = {
  ionPlatform: React.PropTypes.object,
  ionShowPopover: React.PropTypes.func
};

export default createContainer((params) => {
  PostSubs.subscribe('events');
  const eventlist = Events.find({}, {
    sort: {
      start_time: 1
    }
  }).fetch().map(c => Object.assign(c,{start_time : c.start_time.substring(0,19)})).filter(event => {
    let location = params.params.club;
    let timediff = Date.parse(event.start_time) - Date.now();
    return (location === undefined || location === event.place.name) && timediff >= -6 * 60 * 60 * 1000 && timediff <= 30 * 24 * 60 * 60 * 1000;
  });
  return {events: eventlist};
}, Calendar);
