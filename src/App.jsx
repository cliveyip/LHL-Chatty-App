import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    return (
      <div class="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList />
        <Chatbar />
      </div>
    );
  }
}
export default App;
