import React, { Component } from "react";
import classes from "./Form.module.css";

import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";
import Meme from "../Meme/Meme";


class Form extends Component {
  state = {
    memeForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      url: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "URL of the Image",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      caption: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Caption",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    isFormValid: false,
    memes: [],
    meme: {},
    message: "",
    error: false,
    edited: false,
  };

  //to check input valididty for meme details
  checkValidity(value, validation) {
    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    return isValid;
  }

  //click handler for show meme details
  clickHandlerForShow = (id) => {
    this.setState({ edited: true });
    this.getMemeDetails(id);
  };

  //click handler for cancelling modal
  clickHandlerForCancel = () => {
    this.setState({ edited: false });
  };

  //Input change handlers for meme form and update form
  updateInputChangeHandler = (event, inputIdentifier) => {
    let updatedMeme = {
      ...this.state.meme,
    };

    updatedMeme[inputIdentifier] = event.target.value;
    this.setState({ meme: { ...updatedMeme } });
  };

  inputChangeHandler = (event, inputIdentifier) => {
    let updatedMemeFormData = {
      ...this.state.memeForm,
    };

    let updatedFormElement = {
      ...updatedMemeFormData[inputIdentifier],
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedMemeFormData[inputIdentifier] = updatedFormElement;

    let isFormValid = true;
    for (inputIdentifier in updatedMemeFormData) {
      isFormValid = updatedMemeFormData[inputIdentifier].valid && isFormValid;
    }

    this.setState({
      memeForm: updatedMemeFormData,
      isFormValid: isFormValid,
    });
  };

  //click handler for post meme button
  postHandler = (event) => {
    event.preventDefault(); //to prevent default behaviour of form, while submitting, it reloads the page

    let formData = {};
    for (let formElementIdentifier in this.state.memeForm)
      formData[formElementIdentifier] = this.state.memeForm[
        formElementIdentifier
      ];

    const meme = {
      name: formData.name.value,
      url: formData.url.value,
      caption: formData.caption.value,
    };

    fetch(`${process.env.REACT_APP_BACKEND}/memes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meme),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          this.getAllMemes();
          this.setMessage();          
        }
      })
      .catch((error) => {
        this.setState({ error: true });
        this.setMessage();
      });    
  };

  //click handler for update meme button
  clickHandlerForUpdate = (id) => {
    this.updateMemeDetails(id);
    this.setState({ edited: false });
    this.getAllMemes();
  };

  //click handler for delete meme button
  clickHandlerForDelete = (id) => {
    this.deleteMeme(id);
    this.setState({ edited: false });
    this.getAllMemes();
  };

  setMessage = () => {
    if (this.state.error) {
      this.setState({ message: "Meme already exists!" });
    }

    this.setState({ message: "Uploaded Successfully" });
  };

  //to load all the memes from DB while the page is loading
  componentDidMount() {
    this.getAllMemes();
  }

  //to fetch all memes from DB
  getAllMemes = () => {
    fetch(`${process.env.REACT_APP_BACKEND}/memes`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ memes: data });
      });
  };

  //to fetch memes details from DB for a specific meme
  getMemeDetails = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND}/memes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ meme: { ...data } });
      });
  };

  //to update a specific meme
  updateMemeDetails = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND}/memes/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.meme),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          this.getAllMemes();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //to delete a specific meme
  deleteMeme = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND}/memes/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.getAllMemes();
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    let formElements = [];
    for (let key in this.state.memeForm) {
      formElements.push({ id: key, config: this.state.memeForm[key] });
    }

    let form = (
      <form onSubmit={this.postHandler}>
        {formElements.map((formElement) => (
          <Input
            key={formElement.id}
            elementtype={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            inputChanged={(event) =>
              this.inputChangeHandler(event, formElement.id)
            }
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.postHandler}
          disabled={!this.state.isFormValid}
        >
          POST
        </Button>
      </form>
    );

    let memeDetails = (
      <div>
        <h4>Update / Delete Meme</h4>
        <input value={this.state.meme.name} type="text" readOnly />
        <input
          value={this.state.meme.url}
          placeholder="URL of the Image"
          type="text"
          onChange={(event) => this.updateInputChangeHandler(event, "url")}
        />
        <input
          value={this.state.meme.caption}
          placeholder="Caption"
          type="text"
          required
          onChange={(event) => this.updateInputChangeHandler(event, "caption")}
        />
        <Button btnType="Danger" clicked={this.clickHandlerForCancel}>
          CANCEL
        </Button>
        <Button
          btnType="Success"
          clicked={() => this.clickHandlerForUpdate(this.state.meme._id)}
        >
          UPDATE
        </Button>
        <Button
          btnType="Danger"
          clicked={() => this.clickHandlerForDelete(this.state.meme._id)}
        >
          DELETE
        </Button>
      </div>
    );
    
    //all posted memes
    let allPostedMemes = (
        <div className={classes.flexContainer}>
          {this.state.memes.map((meme) => (
            <Meme
              id={meme._id}
              name={meme.name}
              image={meme.url}
              caption={meme.caption}
              showClicked={() => this.clickHandlerForShow(meme._id)}
            />
          ))}
        </div>
    );

    return (
      <div>
        <Modal
          show={this.state.edited}
          modalClosed={this.clickHandlerForCancel}
        >
          {memeDetails}          
        </Modal>
        <div className={classes.MemeData}>
          <h4>Post Your Meme</h4>
          {form}          
        </div>
        {allPostedMemes}
      </div>
    );
  }
}

export default Form;
