import React, {Component, PropTypes} from 'react';
import {HTTP} from 'meteor/http';
import Tile from '/imports/ui/components/Tile.jsx';
const token = '&access_token=233374643706343|70123ff84b31266934e8864cd06f784a';
import {IonContent, IonNavBar, IonNavBackButton, IonSpinner} from 'reactionic';
var backButton = (<IonNavBackButton icon="ion-android-arrow-back" color="" type="clear" customClasses="button-stage"/>);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [<div className="padding"><IonSpinner icon="ios" /></div>],
        title: ''
        };
  }

  componentDidMount() {
    HTTP.get('https://graph.facebook.com/' + this.props.params.clubId + "?fields=albums{id,name,cover_photo{source}},name" + token, (err, resp) => {
      this.setState({
        albums: resp.data.albums.data.filter(c => (c.name !== "Cover Photos" && c.name !== "Timeline Photos" && c.name !== "Mobile Uploads"))
        .map(c => <Tile key={c.id} image={c.cover_photo.source} caption={c.name} href={'/gallery/' + c.id}/>),
        title: resp.data.name
      })
    });
  }

  render() {
    return (
      <div className="custombg">
        <IonNavBar customClasses="bar-dark" title={this.state.title}
          leftButton={backButton}/>
        <IonContent>
          <div className="container">
            <div className="row text-center albumlist">
              {this.state.albums}
            </div>
          </div>
        </IonContent>
      </div>
    );
  }
}
