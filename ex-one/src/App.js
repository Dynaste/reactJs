import React, { Component } from "react";
import SearchBar from "./components/SearchBar";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      searchContent: "",
      resultData: null,
      resultDataWeek: null,
      errMsg: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchContent: e.target.value,
    });
  }

  async handleClick() {
    await this.setState({
      errMsg: null,
    });
    const apiKey = "e918e2b54599b76954a8561c61ef95a7";
    const cityName = this.state.searchContent;
    try {
      const result = await axios.get(
        // `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`
        `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
      );
      console.log(result.data);
      await this.setState({
        resultData: result.data,
        resultDataWeek: result.data.list.filter((el) =>
          el.dt_txt.includes("12:00:00")
        ),
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
      await this.setState({
        errMsg: "Insert valid city",
        resultData: null,
        resultDataWeek: null
      });
    }
  }

  render() {
    const {
      searchContent,
      resultData,
      isLoading,
      resultDataWeek,
      errMsg,
    } = this.state;
    const today = new Date().getDay();
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return (
      <div>
        <SearchBar
          searchContent={searchContent}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
        />

        {resultData && (
          <div>
            <h2>City: {resultData.city.name}</h2>
            <h4>
              Date: {new Date().toLocaleString().slice(0, 10).replace(/-/g, "")}
            </h4>
            <p>Humidity today : {resultData.list[0].main.humidity}%</p>
            <p>Weather : {resultData.list[0].weather[0].description}</p>
            <h5>Next 5 days temps :</h5>

            <p>
              {weekday[today]} : {resultDataWeek[0].main.temp} °C
            </p>
            <p>
              {weekday[today + 1]} : {resultDataWeek[1].main.temp} °C
            </p>
            <p>
              {weekday[today + 2]} : {resultDataWeek[2].main.temp} °C
            </p>
            <p>
              {weekday[today + 3]} : {resultDataWeek[3].main.temp} °C
            </p>
            <p>
              {weekday[today + 4]} : {resultDataWeek[4].main.temp} °C
            </p>
          </div>
        )}

        {!resultData && (
          <>
            <p>Search one city</p>
          </>
        )}

        {errMsg && <h2>{errMsg}</h2>}
      </div>
    );
  }
}

export default App;
