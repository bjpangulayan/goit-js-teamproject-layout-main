let fiveDaysData = [];

const renderFiveDays = data => {
  const allDaysArr = data.list; // we have an array of 40 objects


  const oneDayArr = data.list.map(element => element.dt_txt.slice(0, 10)); // we get an array with dates

  const dataUnique = oneDayArr.filter((elm, index, arr) => arr.indexOf(elm) === index); // we get an array with 5 unique dates
  if (dataUnique.length > 5) {
    dataUnique.shift();
  }

  const fiveDays = dataUnique.map(data =>
    allDaysArr.filter(obj => obj.dt_txt.slice(0, 10) === data),
  ); // we get an array with 5 arrays in 5 days

  // ***** We get the day of the month
  const getDate = data => new Date(data.dt * 1000).getDate();

  // ***** We get the day of the week
  const getDayOfWeek = data => {
    const date = new Date(data * 1000);
    const weekDay = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(date);
    return weekDay;
  };

  // ***** We get a month
  const getMonth = data => {
    const date = new Date(data * 1000);
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    return month;
  };

  // ***** We get a year
  const getYear = function (data) {
    const currentDate = new Date(data * 1000);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const year = currentDate.getFullYear();
    return year;
  };

  // ***** We calculate min/max temperature
  const mathTemp = data => {
    data = data.map(e => Math.floor(e.main.temp));
    const temp = {
      tempMin: Math.min(...data),
      tempMax: Math.max(...data),
    };
    return temp;
  };

  // ***** We get a picture
  const getIconData = day => {
    const iconInfo = {};

    day.forEach(item => {
      if (!iconInfo[item.weather[0].icon]) {
        iconInfo[item.weather[0].icon] = 1;
      } else {
        iconInfo[item.weather[0].icon]++;
      }
    });
    let icon;
    const maxValue = Math.max(...Object.values(iconInfo));
    for (let [key, value] of Object.entries(iconInfo)) {
      if (value === maxValue) {
        icon = key;
      }
    }
    return 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
  };

  // ***** Получаем скорость ветра
  const getWindSpeed = data => {
    const wind = data.map(e => Math.floor(e.wind.speed)).reduce((a, b) => a + b, 0);
    const resultWind = Math.floor(+wind / data.length);
    return resultWind;
  };

  // ***** Получаем среднюю температуру дня
  const getEverageTemp = data => {
    const temp = data.map(e => Math.floor(e.main.temp)).reduce((a, b) => a + b, 0);
    const resulTemp = Math.floor(+temp / data.length);
    return resulTemp;
  };

  // ***** Получаем среднее давление дня
  const getPressure = data => {
    const press = data.map(e => Math.floor(e.main.pressure)).reduce((a, b) => a + b, 0);
    const resultPress = Math.floor(+press / data.length);
    return resultPress;
  };

  // ***** Получаем среднюю влажность дня
  const getHumidity = data => {
    const humid = data.map(e => Math.floor(e.main.humidity)).reduce((a, b) => a + b, 0);
    const resulHumidity = Math.floor(+humid / data.length);
    return resulHumidity;
  };

  const weatherParams = fiveDays.map(elem => {
    return {
      day: getDate(elem[0]),
      dayOfWeek: getDayOfWeek(elem[0].dt),
      month: getMonth(elem[0].dt),
      year: getYear(elem[0].dt),
      date: elem[0].dt,
      icon: getIconData(elem),
      forecast: elem,
      temp: mathTemp(elem),
      tempDay: getEverageTemp(elem),
      wind: getWindSpeed(elem),
      pressure: getPressure(elem),
      humidity: getHumidity(elem),
    };
  }); // получаем массив с объектами -> там данные на каждый из 5 дней

  fiveDaysData = weatherParams;

  const finalData = {
    city: data.city.name,
    country: data.city.country,
    weatherParams,
  };
  return finalData;
};

export { renderFiveDays, fiveDaysData };
