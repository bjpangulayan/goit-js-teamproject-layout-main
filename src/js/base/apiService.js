import config from '../../config.json';

class ApiService {
  constructor() {
    this.requestUrl = config.url;
    this.key = config.apiKey;
    this.bgIconUrl = config.bgIconUrl;
    this.bgKeyImg = config.bgKeyImg;
    this.units = config.units;
    this.metric = config.metric;
    this.searchQuery = '';
    this.location = 'Kiev';
  }

  // ************************** Making a request to the server
  // ***** The method accepts a collection parameter - this is weather (data for 1 day) or forecast (data for 5 days)
  // allows you to receive data for 1 or 5 days depending on the parameter

  getData(collection) {
    const url = `${this.requestUrl}${collection}?q=${this.location}&units=${this.units}&appid=${this.key}`;

    return fetch(url).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Something went wrong');
    });
  }

  // ***** Method for obtaining images from pixabay

  fetchImages() {
    const bgUrlIcon = `${this.bgIconUrl}${this.location}&page=1&per_page=12&key=${this.bgKeyImg}`;

    return fetch(bgUrlIcon).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Picture not found');
    });
  }

  // ***** Setter for getting the current location after pressing Submit or Enter
  set query(newLocation) {
    this.location = newLocation;
  }
}

const apiService = new ApiService({});

export default apiService;