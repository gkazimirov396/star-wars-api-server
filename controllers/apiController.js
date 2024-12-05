import fetch from 'node-fetch';

const PORT = process.env.PORT ?? 5000;

const fetchMovies = async (...urls) => {
  try {
    const promises = urls.map(url => fetch(url));
    const results = await Promise.all(promises);

    return Promise.all(results.map(res => res.json()));
  } catch (error) {
    console.error('Failed to fetch movies: ', error);
  }
};

const getMainPage = async (req, res, next) => {
  const page = req.query.page || 1;

  try {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    const peopleData = await response.json();

    const peopleWithImages = await Promise.all(
      peopleData.results.map(async person => {
        const giphyResponse = await fetch(
          `http://localhost:${PORT}/image/${encodeURIComponent(person.name)}`
        );
        const homeworldResponse = await fetch(person.homeworld);

        const gifData = await giphyResponse.json();
        const homeworld = await homeworldResponse.json();

        const movies = await fetchMovies(...person.films);

        return {
          ...person,
          movies,
          homeworld,
          animated_image: gifData?.data[0]?.images.downsized.url || '',
        };
      })
    );

    res.render('pages/people', {
      title: 'Star Wars Characters',
      people: peopleWithImages,
      nextPage: peopleData.next,
      prevPage: peopleData.previous,
    });
  } catch (error) {
    console.error('Error fetching SWAPI data:', error);
    next(error);
  }
};

export default { getMainPage };
