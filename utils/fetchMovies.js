export const fetchMovies = async (...urls) => {
  try {
    const promises = urls.map(url => fetch(url));
    const results = await Promise.all(promises);

    return Promise.all(results.map(res => res.json()));
  } catch (error) {
    console.error('Failed to fetch movies: ', error);
  }
};
