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
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        currentMessage: "",
        messages: [
          {
            id: 1,
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            id: 2,
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ],
      };
      this.newMessage = this.newMessage.bind(this);
  }

  newMessage(event) {
    //this.setState({value: event.target.value});
    if (event.charCode == 13) {
      console.log('enter is pressed');
      console.log(event.target.value);
      const newMessage = {username: this.state.currentUser.name, content: event.target.value};
      const message = this.state.messages.concat(newMessage);
      // this.setState({messages: message});
      ws.send(JSON.stringify(newMessage));
      ws.onmessage = (event) => {
        console.log('broadcast event received from server.');
        console.log(event.data);

        this.setState({messages: this.state.messages.concat(JSON.parse(event.data))})
      }
    }
  }

  newUserName = (event) => {
    if (event.charCode == 13) {
      var newUser = {name: event.target.value};
      this.setState({currentUser: newUser});
      console.log('New username is now: ', newUser);
    }
  };

  componentDidMount() {
    console.log("componentDidMount <App />");

    ws.onopen = function (event) {
      console.log('App.jsx: ws.onopen event called');
    };

  }

  render() {
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages} />
        {/* <Chatbar /> */}
        <Chatbar currentUser={this.state.currentUser} newMessage={this.newMessage} newUserName={this.newUserName}/>
        {/* <Button color={this.props.color}>Delete</Button> */}
      </div>
    );
  }

}

export default App;
