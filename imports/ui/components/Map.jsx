import React, {Component, PropTypes} from 'react';

export default class Map extends Component {
  openMap() {
    window.open('https://maps.google.de/maps?q=' + this.props.place.location.latitude + ',' + this.props.place.location.longitude, '_system');
  }
  render() {
    return (this.props.place.location)
      ? (
        <div className="card pintobottom">
          <div className="card-content">
            <adress>
              <strong>{this.props.place.name}</strong><br/> {this.props.place.location.street}, {this.props.place.location.city}
            </adress>
          </div>
          <a href='#' onClick={() => this.openMap()}>
            <div className="card-image">
              <img className="img-responsive" src={'https://maps.googleapis.com/maps/api/staticmap?markers=color:black%7C' + this.props.place.location.latitude + ',' + this.props.place.location.longitude + '&zoom=15&size=570x321&scale=2&maptype=terrain&key=AIzaSyA4rdUbYRhyyGlEBcMLlSB7aEVDppuYUM4'}/>
            </div>
          </a>
        </div>
      )
      : '';
  }
}

Map.propTypes = {
  place: PropTypes.object
}
