class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      newsletter: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.getAttribute("name")]: e.target.value,
    });

    if(e.target.type === "checkbox"){
      console.log(e.target.type)
      this.setState({
        newsletter: e.target.checked
      })
    }
  }

  render() {
    return (
      <div>
        <label>firstname :</label>
        <input
          type="text"
          name="firstname"
          value={this.state.firstname}
          onChange={this.handleChange}
        />
        <label>lastname :</label>
        <input
          type="text"
          name="lastname"
          onChange={this.state.lastname}
          onChange={this.handleChange}
        />
        <input
          type="checkBox"
          name="newsletter"
          value={this.state.newsletter}
          onChange={this.handleChange}
        />
        <p>firstname : {this.state.firstname}</p>
        <p>lastname : {this.state.lastname}</p>
        <p>newsletter : {this.state.newsletter ? "true" : "false"}</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
