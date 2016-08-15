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
    HTTP.get('https://graph.facebook.com/?ids=' + this.props.params.clubId + "&fields=albums.limit(50){id,name,cover_photo{source},created_time},name" + token, (err, resp) => {
      this.setState({
        albums: Object.keys(resp.data).map(c => resp.data[c]).reduce((p,c) => p.concat(c.albums.data.filter(c => (c.name !== "Cover Photos" && c.name !== "Timeline Photos" && c.name !== "Mobile Uploads"))), [])
        .sort((a,b) =>  Date.parse(a.created_time.substring(0,19)) > Date.parse(b.created_time.substring(0,19)) ? -1 : 1)
        .map(c => <Tile key={c.id} image={c.cover_photo.source} caption={c.name} href={'/gallery/' + c.id}/>),
        title: Object.keys(resp.data).map(c => resp.data[c])[0].name
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
