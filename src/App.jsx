import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

var ws = new WebSocket("ws://localhost:5000");

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
      this.setState({messages: message});
      ws.send(JSON.stringify(newMessage));
      // ws.send(newMessage);
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    ws.onopen = function (event) {
      console.log('App.jsx: ws.onopen event called');
    };

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages} />
        {/* <Chatbar /> */}
        <Chatbar currentUser={this.state.currentUser} newMessage={this.newMessage}/>
        {/* <Button color={this.props.color}>Delete</Button> */}
      </div>
    );
  }

}

export default App;
