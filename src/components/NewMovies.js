//List new movies scrapping from IMDB database
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Media } from 'react-bootstrap'

import { fetchMovies } from '../actions/moviesActions';

class NewMovies extends Component {
  componentWillMount() {
    this.props.fetchMovies();
  };

  render() {
    const movies = this.props.movies;
    const moviesList = movies.map(function(movie, index){
      return (
        <Media key={`movie_${index}`}>
            <Media.Left>
              <a href={movie.url}><img src={movie.posterUrl} alt={movies.title} /></a>
            </Media.Left>
            <Media.Body>
              <Media.Heading>{movie.title}</Media.Heading>

            </Media.Body>
          </Media>
      )
    });

    return (
      <div className="container text-center">
        <h1 className="h1">New movies list</h1>
        <p>New movies will be extracted from IMDB website using Casperjs
          , then list here!
        </p>
        {/* <Button onClick={this.props.fetchMovies}>Update movies</Button> */}
        <div className="text-center">
        {(this.props.busy) ? <i className="text-center text-success fa fa-spinner fa-spin fa-3x fa-fw"></i>
        : <div>{moviesList}</div>}
        {(this.props.error) ? <h3 className="text-danger">{this.props.error}</h3> : ""}
        </div>

      </div>
    )
  }
};

const mapStateToProps = store =>  {
  return store.movies;
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: () => dispatch(fetchMovies())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMovies);
