import React, { Component } from 'react';
import Button from './Button';

class Title extends Component {
    createCloseButton() {
        let button = null;

        if (this.props.isClose !== false) {
            button = <Button className="entry-modal-entryLmsClose" onClick={this.props.onClose} />;
        }

        return button;
    }

    render() {
        return (
            <div className={this.props.className || 'entry-modal-entryLmsTitle'}>
                <div className="entry-modal-entryLmsText">{this.props.children}</div>
                {this.createCloseButton()}
            </div>
        );
    }
}

export default Title;
