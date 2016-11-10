import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
// var uuid = require('node-uuid');

var ws = new WebSocket("ws://localhost:5000");
var username;

class App extends Component {

  constructor(props) {
    super(props);
    //this.state = {loading: false};
    this.state = {
        currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
        currentMessage: "",
        messages: [],
        messageSystem: [],
        userCount: 0
      };
      this.newMessage = this.newMessage.bind(this);
  }

  newMessage(event) {
    //this.setState({value: event.target.value});
    if (event.charCode == 13) {
      console.log('enter is pressed');
      console.log(event.target.value);
      const newMessage = {username: this.state.currentUser.name, content: event.target.value, type: "postMessage"};
      const message = this.state.messages.concat(newMessage);
      // this.setState({messages: message});
      ws.send(JSON.stringify(newMessage));
    }
  }

  newUserName = (event) => {
    if (event.charCode == 13) {
      var newUser = {name: "Anonymous"};
      if (event.target.value) {
        newUser = {name: event.target.value};
      }
      this.setState({currentUser: newUser});
      console.log('New username is now: ', newUser);
      // client sends
      // {"type": "postNotification", "content": "UserA has changed their name to UserB."}
      const newMessage = {type: "postNotification", content: this.state.currentUser.name + ' has changed their name to ' + newUser.name};
      const message = this.state.messages.concat(newMessage);
      ws.send(JSON.stringify(newMessage));
    }
  };

  componentDidMount() {
    console.log("componentDidMount <App />");

    ws.onopen = function (event) {
      console.log('App.jsx: ws.onopen event called');
    };

    ws.onmessage = (event) => {


      const incomingData = JSON.parse(event.data);

      // server receives message above and then broadcasts this to all clients
      // {"type": "incomingNotification", "content": "UserA changed their name to UserB."}
      if (incomingData.type == 'postMessage') {
        console.log('postMessage event received from server.');
        incomingData.type = "incomingMessage";
        this.setState({messages: this.state.messages.concat(incomingData)})
      }
      if (incomingData.type == 'postNotification') {
        console.log('postNotification event received from server.');
        this.setState({messageSystem: this.state.messageSystem.concat(incomingData)})
      }
      if (incomingData.type == 'incomingUserCount') {
        console.log('incomingUserCount event received from server.');
        this.setState({userCount: incomingData.count});
      }


    }
  }

  render() {
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <span id="user-counter">{this.state.userCount} users Online</span>
        </nav>
        <MessageList messages={this.state.messages} messageSystem={this.state.messageSystem} />
        {/* <Chatbar /> */}
        <Chatbar currentUser={this.state.currentUser} newMessage={this.newMessage} newUserName={this.newUserName}/>
        {/* <Button color={this.props.color}>Delete</Button> */}
      </div>
    );
  }

}

export default App;
