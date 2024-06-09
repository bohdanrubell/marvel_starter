
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=98f884354a79ae74b454ea930b6430d5'
    _baseOffset = 210;

    getResource = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
       const response = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
       return response.data.results.map(this._transformCharacter);
    }

     getCharacter = async (id) => {
        const response = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(response.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;