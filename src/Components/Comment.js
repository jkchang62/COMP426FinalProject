import React from 'react';

/**
 * Component used to generate comments. 
 * Will eventually take the following props:
 * - text: string that represents the comment
 * 
 */


export default class Comment extends React.Component {
    render() {
        return (
            <div > {this.props.text} </div>
        );
    }
}