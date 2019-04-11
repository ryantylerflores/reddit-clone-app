import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/searchbar-actions';

import './styles.css';


const SearchBar = (props) => {
  const [search, setSearch] = useState('');

  // Input submit handler
  const onSubmit = event => {
    event.preventDefault();

    props.fetchSearchResults(search);
    props.previousSearches(search);

    // Sets search bar value back to empty
    setSearch('');
  }

  return(
    <nav className='navbar navbar-light navBarColor'>
      <a className='navbar-brand' href='/'>
        <img className='redditLogo' src='/assets/reddit_logo.png' alt='logo' />
      </a>
      <form 
        className='form-inline'
        onSubmit={ onSubmit }
      >
        <input 
          className='form-control mr-sm-2'
          type='search'
          placeholder='Sub-Reddit Search'
          value={ search }
          onChange={ event => setSearch(event.target.value) }
        />
        <button 
          className='btn btn-outline-primary my-2 my-sm-0 d-none d-sm-block'
          type='submit'
        >
          Search
        </button>
      </form>
    </nav>
  )
}

export default connect(null,actions)(SearchBar);

