import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div>
        <div className="message">
          {/* <span className="username">Anonymous1</span>
          <span className="content">I won't be impressed with technology until I can download food.</span> */}
          <span className="username">{this.props.username}</span>
          <span className="content">{this.props.content}</span>
        </div>
        <div className="message system">
          {this.props.messageSystem}
        </div>
      </div>
    );
  }
}
export default Message;
