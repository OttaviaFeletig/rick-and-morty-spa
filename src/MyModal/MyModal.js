import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    border: "4px solid rgb(168, 0, 78)",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    "& p": {
      marginTop: 10,
    },
  },
  button: {
    backgroundColor: "rgb(168, 0, 78)",
  },
};
const MyModal = React.forwardRef(({ classes, character, closeModal }, ref) => {
  console.log("character", character);
  const { name, image, species, status } = character;
  return (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">{name}</h2>
      <img src={image} alt={name} />
      <p id="simple-modal-description">Species: {species}</p>
      <p id="simple-modal-description">Status: {status}</p>
      <Button size="small" onClick={closeModal} className={classes.button}>
        <Typography gutterBottom component="p">
          Close
        </Typography>
      </Button>
    </div>
  );
});
export default withStyles(styles)(MyModal);
