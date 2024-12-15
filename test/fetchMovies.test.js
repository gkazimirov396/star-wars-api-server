import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { fetchMovies } from '../utils/fetchMovies.js';

describe('fetchMovies', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should fetch and return movie data for valid URLs', async () => {
    const mockUrls = [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/2/',
    ];
    const mockResponse1 = { title: 'Movie 1' };
    const mockResponse2 = { title: 'Movie 2' };

    global.fetch
      .mockResolvedValueOnce({
        json: async () => mockResponse1,
      })
      .mockResolvedValueOnce({
        json: async () => mockResponse2,
      });

    const movies = await fetchMovies(...mockUrls);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(mockUrls[0]);
    expect(fetch).toHaveBeenCalledWith(mockUrls[1]);
    expect(movies).toHaveLength(2);
  });

  it('should handle empty URL input', async () => {
    const movies = await fetchMovies();

    expect(fetch).not.toHaveBeenCalled();
    expect(movies).toEqual([]);
  });

  it('should log an error when one of the fetch calls fails', async () => {
    const mockUrls = [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/2/',
    ];
    const mockResponse1 = { title: 'Movie 1' };
    const invalidUrl = 122352532;
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    global.fetch
      .mockResolvedValueOnce({ json: async () => mockResponse1 })
      .mockRejectedValueOnce(invalidUrl);

    const movies = await fetchMovies(...mockUrls);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to fetch movies: ',
      invalidUrl
    );
    expect(movies).toBeUndefined();
  });
});
