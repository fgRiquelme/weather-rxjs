const url = (value) => {
  try {
    return (
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      value +
      "&appid=e311c26c30a3a407448cf8e6be23b6db&units=metric"
    );
  } catch (e) {
    return e;
  }
};

export default url;
