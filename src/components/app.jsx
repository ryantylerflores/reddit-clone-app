import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './searchBar';
import RedditList from './redditList.jsx';

class App extends React.Component {

  render() {
    return (
      <div className='appBackgroundColor full'>
        <SearchBar />
        <RedditList />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { error: state.search.error }
}

export default connect(mapStateToProps)(App);