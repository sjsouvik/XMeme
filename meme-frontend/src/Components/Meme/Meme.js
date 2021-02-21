import React from "react";

import classes from "./Meme.module.css";

import Button from "../UI/Button/Button";

const Meme = (props) => {
  return (
    <div className={classes.card}>
      <p className={classes.name}>
        Posted by <b>{props.name}</b>
      </p>

      {/* <div className={classes.container}> */}
      <p className={classes.caption}>{props.caption}</p>
      <img src={props.image} alt="Image of Meme" />
      <Button btnType="Success" clicked={props.showClicked}>
        SHOW DETAILS
      </Button>
      {/* </div> */}
    </div>
  );
};

export default Meme;
