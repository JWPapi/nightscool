import React, {Component, PropTypes} from 'react';

export default class Tile extends Component {
    render() {
        return (
            <div className={this.props.customClasses ? 'col col-50 tiles inactive' : 'col col-50 tiles'}>
              <a href={this.props.href}>
                <div className='square z-depth-1' style={{
                  backgroundImage: 'url(' + this.props.image + ')'
                }}></div>
                {(this.props.caption)
                  ? (
                    <button type="button" className="truncate opacitybutton">
                      {this.props.caption}
                    </button>
                  )
                : ''}
              </a>
            </div>
        );
    }
}
Tile.propTypes = {
    image: PropTypes.string.isRequired,
    href: PropTypes.string,
    caption: PropTypes.string,
    customClasses: PropTypes.string
}
