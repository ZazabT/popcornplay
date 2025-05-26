const apiConfig = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_KEY,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_KEY}`,
    accept: 'application/json',
  },
}




export const fetchMovies = async ({ query }: { query: string }) => {
  const endPoint = query
    ? `${apiConfig.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${apiConfig.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endPoint, {
    headers: apiConfig.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchTvShows = async ({ query }: { query: string }) => {
  const endPoint = query
    ? `${apiConfig.BASE_URL}/search/tv?query=${encodeURIComponent(query)}`
    : `${apiConfig.BASE_URL}/discover/tv?sort_by=popularity.desc`;

  const response = await fetch(endPoint, {
    headers: apiConfig.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch TV shows: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (movieId: number) => {
  
}


export const searchAll = async ( { query }: { query: string }) => {
  if (!query) return [];

  const endPoint = `${apiConfig.BASE_URL}/search/multi?query=${encodeURIComponent(query)}`;
  console.log(endPoint)
  const response = await fetch(endPoint, {
    headers: apiConfig.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch search results: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data.results;
}