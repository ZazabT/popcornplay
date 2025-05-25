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
  