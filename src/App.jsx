import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    //this.state = {loading: false};
    this.state = {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
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
        ]
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
        <Chatbar currentUser={this.state.currentUser} />
        {/* <Button color={this.props.color}>Delete</Button> */}
      </div>
    );
  }

}

export default App;
