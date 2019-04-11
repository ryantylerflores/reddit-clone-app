import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/searchbar-actions';
import './styles.css';

class RedditList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      postsPerPage: 6
    }
  }

  // Pagination click handler
  pageSelectionHandler = number => {
    this.setState({ currentPage: number })
  }

  arrowClickHandler = id => {
    let { currentPage, postsPerPage } = this.state;
    const { searchResults } = this.props.results
    switch(id) {
      case 'forward':
        if(currentPage < searchResults.length/postsPerPage) {
          return this.setState({ currentPage: ++currentPage })
        }
        break;
      case 'backward':
        if(currentPage > 1) {
         return this.setState({ currentPage: --currentPage })
        }
        break;
      default:
        break;
    }
  }

  // Maps through each search result & creates a section with
  // it's title & description
  // Handles for undefined initial state
  renderRedditList = () => {
    const { searchResults, error } = this.props.results;

    if(!searchResults && !error) {
      return (
        <ul className='mt-4 list-group'>
          <li className='list-group-item'>
            <h5>No Results</h5>
          </li>
        </ul>
      )
    } else if (error || (!searchResults && error)){
      return <h5>There was a problem with your search. Please try again!</h5>
    } else {
        const { currentPage, postsPerPage } = this.state;

        // logic for pagination
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(searchResults.length / postsPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li 
              className={currentPage === number ? 'page-item active' : 'page-item'} 
              key={number} 
              onClick={() => this.pageSelectionHandler(number)}
            >
              <button className="page-link">{number}</button>
            </li>
          )
        })


        const renderPosts = currentPosts.map((post,index) => {
          const renderThumbnailClass = type => {
            switch(type) {
              case 'self':
                return 'd-none'
              case 'default':
               return 'd-none'
              case "":
                return 'd-none'
              default:
               return 'col-3 col-xs-3 col-md-3 col-lg-2'
            }
          }

          return(
            <li key={index} className='list-group-item container'>
              <div className='row'>
                <div className={renderThumbnailClass(post.data.thumbnail)}>
                  <img className='thumbnails' alt='thumbnail' src={`${post.data.thumbnail}`} />
                </div>
                <div className={post.data.thumbnail !== "" ? 'col-9 col-sx-9 col-md-9 col-lg-10' : 'col-12'}>
                  <h6 className='title'>{ post.data.title }</h6>
                  <p className='mb-2 text-muted font-weight-light'>posted by u/ { post.data.author }</p>
                </div>
              </div>
            </li>
          )
        })

        const renderSubRedditTitle = currentPosts[0].data.subreddit;

        return(
          <div>
            <h5>r/{ renderSubRedditTitle }</h5>
            <ul className='list-group'>
              { renderPosts }
            </ul>
            <nav>
              <ul className="pagination justify-content-end my-0">
                <li className={currentPage === 1 ? 'd-none' : 'page-item'} onClick={() => this.arrowClickHandler('backward')}>
                  <button className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                { renderPageNumbers }
                <li className={currentPage === pageNumbers.length ? 'd-none' : 'page-item'} onClick={() => this.arrowClickHandler('forward')}>
                  <button className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )
    }
  }

  // Maps through each previous search & displays them
  // Allows for clicking previous results & displaying again
  previousSearchList = () => {
    const { results } = this.props;
    const { prevSearches } = this.props.results;
    console.log(results);
    if (prevSearches.length === 0) {
      return(
        <ul className='list-group'>
          <li className='list-group-item text-muted'>No Recent Searches</li>
        </ul>
      )
    } else {
      return prevSearches.map((search,index) => {
        return (
          <li 
            key={index} 
            className='list-group-item list-group-item-action pointer' 
            onClick={() => this.props.fetchSearchResults(search)}
          >
            { search }
          </li>
        )
      })
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className=' pt-4 col-sm-12 col-md-8'>
            { this.renderRedditList() }
          </div>
          <div className=' pt-4 col-sm-12 col-md-4'>
            <h5>Your Recent Searches</h5>
            <ul className='list-group'>
              { this.previousSearchList() }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    results: state.search
  }
}

export default connect(mapStateToProps, actions)(RedditList);