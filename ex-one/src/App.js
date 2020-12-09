import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import ResultList from "./components/resultList";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      searchContent: "",
      onlyOwner: false,
      resultData: null,
      resultDataOwner: null,
      errMsg: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchContent: e.target.value,
    });
  }

  handleCheck(e) {
    this.setState({
      onlyOwner: e.target.checked,
    });
  }

  async handleClick() {
    await this.setState({
      errMsg: null,
    });
    const userName = this.state.searchContent;
    try {
      const result = await axios.get(
        `https://api.github.com/users/${userName}/repos`
      );
      console.log(result.data);
      await this.setState({
        resultData: result.data,
        resultDataOwner: result.data.filter((el) =>
          el.owner.login.includes(userName)
        ),
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
      await this.setState({
        errMsg: "Insert valid pseudo",
        resultData: null,
        resultDataOwner: null,
      });
    }
  }

  render() {
    const {
      searchContent,
      resultData,
      isLoading,
      resultDataOwner,
      errMsg,
      onlyOwner,
    } = this.state;

    return (
      <div id="app">
        <SearchBar
          searchContent={searchContent}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          handleCheck={this.handleCheck}
          onlyOwner={onlyOwner}
        />

        {resultData && <ResultList resultData={resultData}/>}

        {errMsg && <h2>{errMsg}</h2>}
      </div>
    );
  }
}

export default App;
