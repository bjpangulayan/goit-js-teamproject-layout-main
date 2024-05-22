const savedArray = JSON.parse(localStorage.getItem('City'));
if (savedArray) {
  storage.cityArray = savedArray;
}

let mySiema;

const updateView = () => {
  favListRef.innerHTML = updateButtons(storage.cityArray);
  mySiema = new Siema({
    selector: '.city-list',
    perPage: {
      300: 2,
      768: 4,
      1280: 4,
    },
    duration: 200,
    draggable: false,
    multipleDrag: false,
    threshold: 20,
    loop: false,
  });
};

const widthOfScreen = window.innerWidth;

favoriteBtnRef.addEventListener('click', () => {
  if (widthOfScreen < 768) {
    if (storage.cityArray.length > 2) {
      sliderBtnRight.hidden = false;
    }
  }

  if (widthOfScreen >= 768) {
    if (storage.cityArray.length > 4) {
      sliderBtnRight.hidden = false;
    }
  }
});

if (widthOfScreen < 768) {
  if (storage.cityArray.length <= 2) {
    sliderBtnRight.hidden = true;
  } else {
    sliderBtnRight.hidden = false;
  }
}

if (widthOfScreen >= 768) {
  if (storage.cityArray.length <= 4) {
    sliderBtnRight.hidden = true;
  } else {
    sliderBtnRight.hidden = false;
  }
}

const saveLocalStorage = () => {
  const inputValue = inputRef.value;

  if (storage.cityArray.includes(inputValue)) {
    return;
  }

  if (inputRef.value.trim() === '') {
    return;
  }

  storage.cityArray.push(inputValue);
  localStorage.setItem('City', JSON.stringify(storage.cityArray));

  inputRef.value = '';
  const div = document.createElement('div');
  div.classList.add('search-city__slider-list-item');
  div.innerHTML = favoriteCity(inputValue);
  mySiema.append(div);
  updateView();
};

updateView();

favoriteBtnRef.addEventListener('click', saveLocalStorage);

favListRef.addEventListener('click', addInputValueFromList);

// функция
function addInputValueFromList(event) {
  if (event.target.nodeName === 'BUTTON') {
    const nameLiCity = event.path[1].childNodes[1].textContent;
    const indexCurrentCity = storage.cityArray.indexOf(nameLiCity);

    storage.cityArray.splice(indexCurrentCity, 1);
    localStorage.setItem('City', JSON.stringify(storage.cityArray));

    mySiema.remove(indexCurrentCity);

    updateView(storage.cityArray);
  }

  if (widthOfScreen < 768) {
    if (storage.cityArray.length <= 2) {
      sliderBtnRight.hidden = true;
      sliderBtnLeft.hidden = true;
    } else {
      sliderBtnRight.hidden = false;
      sliderBtnLeft.hidden = false;
    }
  }

  if (widthOfScreen >= 768) {
    if (storage.cityArray.length <= 4) {
      sliderBtnRight.hidden = true;
    }
  }

  if (event.target.nodeName === 'P') {
    apiServise.query = event.path[1].childNodes[1].textContent;
    renderOneDay();
    setBgImages();
    setGeoLocationImg();
    renderFiveDay();
    onHideChartClick();
    renderCalendar();
  }
}

sliderBtnLeft.addEventListener('click', () => {
  mySiema.prev();
  if (mySiema.currentSlide === 0) {
    sliderBtnLeft.hidden = true;
  }
});
sliderBtnRight.addEventListener('click', () => {
  mySiema.next();
  if (mySiema.currentSlide > 0) {
    sliderBtnLeft.hidden = false;
  }
});

if (mySiema.currentSlide === 0) {
  sliderBtnLeft.hidden = true;
}
