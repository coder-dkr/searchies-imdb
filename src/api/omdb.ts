class OMDB {
    private API_KEY = import.meta.env.VITE_API_KEY;
    private BASE_URL = "https://www.omdbapi.com"
  
    async searchById(id: string) {
      try {
        if (!this.API_KEY) throw new Error('API Key is missing');
  
        const response = await fetch(`${this.BASE_URL}/?i=${id}&apikey=${this.API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch data');
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching movie by ID:', error);
        return null;
      }
    }

    async searchByTitle(title: string) {
      try {
        if (!this.API_KEY) throw new Error('API Key is missing');
  
        const response = await fetch(`${this.BASE_URL}/?t=${title}&apikey=${this.API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch data');
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching movie by title:', error);
        return null;
      }
    }

    async searchByRandom(query: string) {
      try {
        if (!this.API_KEY) throw new Error('API Key is missing');
  
        const response = await fetch(`${this.BASE_URL}/?s=${query}&apikey=${this.API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch data');
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching movie by Query:', error);
        return null;
      }
    }
  }
  
  const Fetcher = new OMDB
  export default Fetcher;
  