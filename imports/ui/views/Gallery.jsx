import React, {Component, PropTypes} from 'react';
import Gallery from '/imports/ui/components/Gallery.jsx';
const token = '&access_token=233374643706343|70123ff84b31266934e8864cd06f784a';
import {IonContent, IonNavBar, IonNavBackButton, IonSpinner} from 'reactionic';

var backButton = (<IonNavBackButton icon="ion-android-arrow-back" color="" type="clear" customClasses="button-stage"/>);
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [<div className="padding"><IonSpinner icon="ios" /></div>],
      title: ""
    }
  }

  componentDidMount() {
    HTTP.get('https://graph.facebook.com/' + this.props.params.galleryId + '?fields=photos{source,id},name' + token, (err, resp) => {
      this.setState({
        images: resp.data.photos.data.map(c => <Gallery image={c.source} key={c.id} linkclass="swipebox" href={c.source}/>),
        title: resp.data.name
      });
    });
  }

  render() {
    return (
      <div className="custombg">
        <IonNavBar customClasses="bar-dark" title={this.state.title} leftButton={backButton}/>
        <IonContent>
          <div className='container'>
            <div className="row text-center">
              {this.state.images}
            </div>
          </div>
        </IonContent>
      </div>
    );
  }
};
