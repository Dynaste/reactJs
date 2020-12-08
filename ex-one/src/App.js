import { Component } from "react";
import AppartmentsList from "./components/AppartmentsList";
import FilterList from "./components/FilterList";
import SearchBar from "./components/SearchBar";

const appartments = [
  {
    id: 1,
    title: "Large Architect flat - Hypercentral 70m2",
    price: 45,
    rating: 4,
    image:
      "https://a0.muscache.com/im/pictures/38626db5-6cff-41cc-9120-c4817375efb8.jpg?im_w=720",
    isAvailable: true,
  },
  {
    id: 2,
    title: "Studio Luxe - Champs Elysées",
    price: 55,
    rating: 5,
    image:
      "https://a0.muscache.com/im/pictures/99953686/da93850b_original.jpg?im_w=720",
    isAvailable: false,
  },
  {
    id: 3,
    title: "Studio de caractère, Bastille",
    price: 36,
    rating: 3,
    image:
      "https://a0.muscache.com/im/pictures/80093344/597801ae_original.jpg?im_w=720",
    isAvailable: true,
  },
  {
    id: 4,
    title: "Beau studio à 100m du Moulin Rouge",
    price: 25,
    rating: 1,
    image:
      "https://a0.muscache.com/im/pictures/ae245273-6819-44c4-af6b-7a272d54ff14.jpg?im_w=720",
    isAvailable: false,
  },
];
const appartmentsAvalaible = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: true,
      searchContent: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.setState({
      isClick: !this.state.isClick,
    });
    appartmentsAvalaible.length = 0;
    appartments.forEach((appartment) => {
      if (appartment.isAvailable) {
        appartmentsAvalaible.push(appartment);
      }
    });
  }

  handleChange(e) {
    this.setState({
      searchContent: e.target.value,
    });
  }

  render() {
    const appartmentsFiltered = appartments.filter((appartment) =>
      appartment.title.toLowerCase().includes(this.state.searchContent)
    );
    return (
      <div>
        <FilterList
          isClick={this.state.isClick}
          handleClick={this.handleClick}
        />
        <SearchBar
          searchContent={this.searchContent}
          handleChange={this.handleChange}
        />
        {this.state.isClick && !this.state.searchContent && (
          <AppartmentsList appartments={appartments} />
        )}
        {!this.state.isClick && !this.state.searchContent && (
          <AppartmentsList appartments={appartmentsAvalaible} />
        )}
        {this.state.searchContent && (
          <AppartmentsList appartments={appartmentsFiltered} />
        )}
        <p>{this.state.searchContent}</p>
      </div>
    );
  }
}

export default App;
