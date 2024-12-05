import fetch from 'node-fetch';

const getImageHandler = async (req, res, next) => {
  const { title } = req.params;

  try {
    const giphyResponse = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${
        process.env.GIPHY_API_KEY
      }&q=${encodeURIComponent(title)}&limit=1`
    );
    const gifData = await giphyResponse.json();

    res.status(200).json(gifData);
  } catch (error) {
    console.error('Failed to fetch GIF:', error);

    next(error);
  }
};

export default { getImageHandler };
