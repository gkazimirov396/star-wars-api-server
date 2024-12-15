const getImageHandler = async (req, res, next) => {
  const { title } = req.params;

  const giphyParams = new URLSearchParams();

  giphyParams.append('api_key', process.env.GIPHY_API_KEY);
  giphyParams.append('q', encodeURIComponent(title));
  giphyParams.append('limit', '1');

  try {
    const giphyResponse = await fetch(
      `https://api.giphy.com/v1/gifs/search?${giphyParams.toString()}`
    );
    const gifData = await giphyResponse.json();

    res.status(200).json(gifData);
  } catch (error) {
    console.error('Failed to fetch GIF:', error);

    next(error);
  }
};

export default { getImageHandler };
