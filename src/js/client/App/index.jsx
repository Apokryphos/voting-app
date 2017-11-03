import React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Api from '../Api';
import Polls from '../Components/Polls';
import Title from '../Components/Title';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: [],
    };
  }

  componentDidMount() {
    Api.getPolls().then((json) => {
      this.setState({ polls: json });
    });
  }

  render() {
    return (
      <div>
        <Title text="Voting Polls" />
        <Polls polls={this.state.polls} />
      </div>
    );
  }
}

export default App;
