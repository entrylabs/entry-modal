import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    }

    getButtonClassName() {
        return `button ${this.props.className}`;
    }

    handleOnClick(e) {
        const { onClick } = this.props;
        if (onClick) {
            onClick(e);
        }
    }

    handleOnMouseDown(e) {
        const { onMouseDown } = this.props;
        if (onMouseDown) {
            onMouseDown(e);
        }
    }
    createButtonContent() {
        let content = null;
        if (this.props.children) {
            content = this.props.children;
        } else if (this.props.text) {
            content = this.props.text;
        }
        return content;
    }

    render() {
        const { style } = this.props;
        return (
            <div
                style={style}
                className={this.getButtonClassName()}
                onClick={this.handleOnClick}
                onMouseDown={this.handleOnMouseDown}
            >
                {this.createButtonContent()}
            </div>
        );
    }
}

export default Button;
