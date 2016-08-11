import React, {Component, PropTypes} from 'react';

export default class Gallery extends Component {
    render() {
        return (
              <div className="col s4 onepaddingtiles">
                <a href={this.props.href} className={this.props.linkclass}>
                    <div className='square z-depth-1' style={{
                        backgroundImage: 'url(' + this.props.image + ')'
                    }}></div>
                    {(this.props.caption)
                        ? (
                                <button type="button" className="btn btn-block truncate opacitybutton">
                                    {this.props.caption}
                                </button>
                        )
                        : ''}
                </a>
            </div>
        );
    }
}
Gallery.propTypes = {
    image: PropTypes.string.isRequired,
    href: PropTypes.string,
    caption: PropTypes.string,
    linkclass: PropTypes.string
}
