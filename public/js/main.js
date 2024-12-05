const movieDetailsTemplate = document.getElementById('movie-details-template');
const planetDetailsTemplate = document.getElementById(
  'planet-details-template'
);

const peopleListElement = document.querySelector('.people-list');
const movieList = document.querySelectorAll('.movie');

const modal = document.getElementById('info-modal');
const modalContent = document.querySelector('.modal-content');

const openModal = content => {
  modalContent.replaceChildren();

  modalContent.appendChild(content);
  modal.showModal();

  modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

const hideModal = () => {
  modal.close();
};

const createHomeworldDetails = homeworld => {
  const {
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    population,
  } = homeworld;

  const content = document.importNode(
    planetDetailsTemplate.content,
    true
  ).firstElementChild;

  content.querySelector('.planet-name').textContent = name;
  content.querySelector('.planet-climate').textContent = climate;
  content.querySelector('.planet-gravity').textContent = gravity;
  content.querySelector('.planet-terrain').textContent = terrain;

  const rotaion = content.querySelector('.planet-rotation');
  const orbital = content.querySelector('.planet-orbital');
  const planetDiameter = content.querySelector('.planet-diameter');
  const planetPopulation = content.querySelector('.planet-population');

  rotaion.textContent = `${rotation_period} hrs`;
  orbital.textContent = `${orbital_period} local days`;
  planetPopulation.textContent = `${population} people`;
  planetDiameter.textContent = `${diameter} kilometers`;

  return content;
};

const createMovieDetails = movie => {
  const { title, director, producer, release_date, opening_crawl } = movie;

  const content = document.importNode(
    movieDetailsTemplate.content,
    true
  ).firstElementChild;

  content.querySelector('.movie-title').textContent = title;
  content.querySelector('.movie-director').textContent = director;
  content.querySelector('.movie-producer').textContent = producer;
  content.querySelector('.movie-release-date').textContent = release_date;
  content.querySelector('.movie-opening-crawl').textContent =
    opening_crawl.replace(/\r\n/g, ' ');

  return content;
};

peopleListElement.addEventListener('click', event => {
  event.stopPropagation();

  if (
    event.target.matches('h3') &&
    event.target.classList.contains('homeworld')
  ) {
    const homeworld = JSON.parse(
      event.target.closest('.person').dataset.homeworld
    );
    const planetDetails = createHomeworldDetails(homeworld);

    openModal(planetDetails);
  }
});

movieList.forEach(movieEl => {
  movieEl.addEventListener('click', () => {
    const movie = JSON.parse(movieEl.dataset.movie);
    const movieDetails = createMovieDetails(movie);

    openModal(movieDetails);
  });
});

modal.addEventListener('focusout', hideModal);

document.addEventListener('click', event => {
  if (!modal.contains(event.target)) {
    hideModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.open) {
    hideModal();
  }
});
