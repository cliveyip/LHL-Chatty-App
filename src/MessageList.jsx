import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {

    var map_message = this.props.messages.map((m) => {
      return <Message username={m.username} content={m.content} key={m.id} />
    });

    return (
      <div id="message-list">
        {map_message}
      </div>
    );
  }
}


export default MessageList;
