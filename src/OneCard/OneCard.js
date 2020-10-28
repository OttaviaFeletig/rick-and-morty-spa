import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./OneCard.css";

function OneCard({ name, picture, id, openModal }) {
  return (
    <div className="flipCard">
      <div className="flipCardInner">
        <div className="flipCardFront">
          <img src={picture} alt={name} className="imageCard" />
        </div>
        <div className="flipCardBack">
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Button size="small" onClick={openModal} value={id}>
            <Typography gutterBottom component="p" className="buttonText">
              Learn More
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}
export default OneCard;
