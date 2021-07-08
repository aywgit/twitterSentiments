import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';
import Results from './Results.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
    };
    this.getScore = this.getScore.bind(this);
  }

  getScore(input) {
    //call twitter
  }

  render() {
    return (
      <div>
        <h2>Recent Sentiments</h2>
        <Search getScore={this.getScore} />
        <Results />
      </div>
    )
  }
}

export default App;