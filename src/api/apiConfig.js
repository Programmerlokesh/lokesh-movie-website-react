const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "9b2e765862c12aa3315671bdbdf2e436",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
