export const fetchMovies = async (...urls) => {
  try {
    const promises = urls.map(url => fetch(url));
    const results = await Promise.all(promises);

    const movies = await Promise.all(results.map(res => res.json()));

    return movies.map(film => film.result.properties);
  } catch (error) {
    console.error('Failed to fetch movies: ', error);
  }
};
