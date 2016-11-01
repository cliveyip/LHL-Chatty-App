import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    return (
      <footer>
        <input id="username" type="text" value={this.props.currentUser.name} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" />
      </footer>
      );
  }
}
export default Chatbar;
