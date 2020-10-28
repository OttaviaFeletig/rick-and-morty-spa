import React from "react";
import "./App.css";
import OneCard from "./OneCard/OneCard";
import MyModal from "./MyModal/MyModal";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CircularProgress from "@material-ui/core/CircularProgress";
const styles = {
  outlinedInput: {
    color: "white",
    height: "50%",
    "& fieldset": {
      borderColor: "white",
    },
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      search: "",
      open: false,
      selectedCharacter: null,
      url: "https://rickandmortyapi.com/api/character/",
      prev: null,
      next: null,
      fetchAgain: false,
    };
    this.searchCharacter = this.searchCharacter.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  fetchCharacters() {
    fetch(this.state.url)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          characters: data.results,
          prev: data.info.prev,
          next: data.info.next,
        })
      );
  }
  componentDidMount() {
    this.fetchCharacters();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.url !== this.state.url) {
      this.fetchCharacters();
    }
  }
  searchCharacter(e) {
    this.setState({ search: e.currentTarget.value });
  }
  openModal(e) {
    let selectedCharacter = this.findCharacter(e.currentTarget.value);
    this.setState({ selectedCharacter: selectedCharacter[0], open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }
  fetchAgain(dir) {
    this.setState({ characters: [] });
    dir === "prev"
      ? this.setState({ url: this.state.prev })
      : this.setState({ url: this.state.next });
  }
  findCharacter(selectedId) {
    return this.state.characters.filter((character) => {
      return character.id == selectedId;
    });
  }
  render() {
    const { classes } = this.props;
    const filterCharacter = () => {
      return this.state.characters.filter((character) =>
        character.name.toUpperCase().includes(this.state.search.toUpperCase())
      );
    };
    return (
      <div>
        <div className="banner">
          <OutlinedInput
            type="text"
            placeholder="Search"
            className={classes.outlinedInput}
            onChange={this.searchCharacter}
          />
        </div>
        <div className="flexContainer">
          {this.state.characters.length !== 0 ? (
            filterCharacter().map((character, index) => (
              <OneCard
                key={index}
                name={character.name}
                picture={character.image}
                id={character.id}
                openModal={this.openModal}
              />
            ))
          ) : (
            <div className="circularProgressContainer">
              <CircularProgress color="primary" />
            </div>
          )}
          <Modal
            open={this.state.open}
            onClose={this.closeModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className="modal"
          >
            <MyModal
              character={this.state.selectedCharacter}
              closeModal={this.closeModal}
            />
          </Modal>
        </div>
        <div className="arrowContainer">
          <ArrowBackIosIcon
            className={
              this.state.prev === null ? "arrowDisabled" : "arrowActive"
            }
            onClick={() => this.state.prev !== null && this.fetchAgain("prev")}
          />

          <ArrowForwardIosIcon
            className={
              this.state.next === null ? "arrowDisabled" : "arrowActive"
            }
            onClick={() => this.state.next !== null && this.fetchAgain("next")}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
