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
    this.backSearch = this.backSearch.bind(this);
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

  async backSearch() {
    await this.setState({
      resultData: null,
      resultDataOwner: null,
    });
  }

  async handleClick() {
    await this.setState({
      errMsg: null,
    });
    const userName = this.state.searchContent;
    const isOwner = this.state.onlyOwner;
    try {
      if (!isOwner) {
        const result = await axios.get(
          `https://api.github.com/users/${userName}/repos`
        );
        
        await this.setState({
          resultData: result.data,
          isLoading: false,
        });
      } else {
        const result = await axios.get(
          `https://api.github.com/users/${userName}/repos`
        );
        await this.setState({
          resultDataOwner: result.data.filter((el) => el.fork === false),
          isLoading: false,
        });
      }
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
        {!resultData && !resultDataOwner &&(
          <SearchBar
            searchContent={searchContent}
            handleChange={this.handleChange}
            handleClick={this.handleClick}
            handleCheck={this.handleCheck}
            onlyOwner={onlyOwner}
          />
        )}

        {resultData && resultData.length > 0 && (
          <ResultList resultData={resultData} backSearch={this.backSearch} />
        )}
        {resultData && resultData.length === 0 && (
          <>
            <button onClick={this.backSearch}>Search another random</button>
            <h2>No repository find for this user </h2>
          </>
        )}

        {resultDataOwner && resultDataOwner.length > 0 && (
          <ResultList
            resultData={resultDataOwner}
            backSearch={this.backSearch}
          />
        )}

        {resultDataOwner && resultDataOwner.length === 0 && (
          <>
            <button onClick={this.backSearch}>Search another random</button>
            <h2>This user has not own repos</h2>
          </>
        )}

        {errMsg && <h2>{errMsg}</h2>}
      </div>
    );
  }
}

export default App;
