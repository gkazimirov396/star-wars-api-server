import { fetchMovies } from '../utils/fetchMovies.js';

const fetchPeople = async people => {
  try {
    const promises = people.map(person => fetch(person.url));
    const results = await Promise.all(promises);

    const peopleResult = await Promise.all(results.map(res => res.json()));

    return peopleResult.map(p => p.result.properties);
  } catch (error) {
    console.error('Failed to fetch people: ', error);
  }
};

const getMainPage = async (req, res, next) => {
  const page = req.query.page || 1;

  try {
    const response = await fetch(`https://swapi.tech/api/people/?page=${page}`);
    const peopleData = await response.json();

    const people = await fetchPeople(peopleData.results);

    const peopleWithImages = await Promise.all(
      people.map(async person => {
        const giphyResponse = await fetch(
          `${req.protocol}://${req.get('host')}/image/${person.name}`
        );
        const homeworldResponse = await fetch(person.homeworld);

        const gifData = await giphyResponse.json();
        const homeworld = await homeworldResponse.json();

        const movies = await fetchMovies(...(person.films ?? []));

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
