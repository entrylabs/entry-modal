import React, { Component } from 'react';
import Button from './Button';

class Title extends Component {
    createCloseButton() {
        let button = null;

        if (this.props.isClose !== false) {
            button = <Button className="entryLmsClose" onClick={this.props.onClose} />;
        }

        return button;
    }

    render() {
        return (
            <div className={this.props.className || 'entryLmsTitle'}>
                <div className="entryLmsText">{this.props.children}</div>
                {this.createCloseButton()}
            </div>
        );
    }
}

export default Title;
