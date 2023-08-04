function Movies(props) {
  return (
    <>
      <ul className="grid-container">
        {props.fullData.map((movie) => {
          return (
            <li className="grid-item">
              <img className="img" src={movie.Images[0]} alt="Movie Pics" />
              <h2>{movie.Title}</h2>
              <p>{movie.Released}</p>
              <button>More Info</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Movies;


