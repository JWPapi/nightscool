import React, {Component, PropTypes} from 'react';

export default class Card extends Component {
    render() {
        return (
            <div className="card calendercard">
              <div className="card-image">
                <div className="eventcover" style={{
                  backgroundImage: 'url(' + this.props.image + ')'
                }}>
                  <i className="ion-ios-arrow-right calenderarrow" />
                </div>

                <div className="card-content calendercard-content"><h6 className="truncate">{this.props.caption}</h6>
                  <small>{this.props.subtitle}</small>
                </div>
              </div>
            </div>
        );
    }
}
Card.propTypes = {
    image: PropTypes.string.isRequired,
    caption: PropTypes.string,
    subtitle: PropTypes.string
}
