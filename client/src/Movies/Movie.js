import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Movie = (props) => {
  console.log('props from Movie', props.movie)
  const [movie, setMovie] = useState();
  const params = useParams();
  // console.log(params.id);
 
 
  useEffect(() => {
    const id = params.id
    
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

       axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          // console.log(`response from Movie Axios`, response)
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  },[params.id]);
  
  // Uncomment this only when you have moved on to the stretch goals
  // const saveMovie = () => {
  //   const addToSavedList = props.addToSavedList;
  //   addToSavedList(movie)
  // }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <Link to={'/'}>
        <div className="save-button">Save</div>
      </Link>
      
    </div>
  );
}

export default Movie;
