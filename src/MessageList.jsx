import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {

    var map_message = this.props.messages.map((m) => {
      if (m.type === 'incomingMessage') {
        return <Message username={m.username} content={m.content} key={m.id} />
      } else if (m.type === 'incomingNotification') {
        return <Message messageSystem={m.content}/>
      }

    });

    // var map_messageSystem = this.props.messageSystem.map((m) => {
    //   return <Message messageSystem={m.content} />
    // });

    return (
      <div id="message-list">
        {map_message}
        {/* {map_messageSystem} */}
      </div>
    );
  }
}


export default MessageList;
