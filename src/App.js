import React, { Component } from "react";
import "./App.css";
import PostText from "./components/postText";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as firebase from "firebase";

class App extends Component {
  state = {
    text: "New post",
    hasLoadedTextAtLeastOnce: false
  };

  handleChange = newText => {
    this.setState({ text: newText });
    const textRef = firebase.database().ref("react/text");
    textRef.set(newText);
  };

  componentDidMount() {
    const textRef = firebase.database().ref("react/text");
    textRef.on("value", snap => {
      this.setState({ text: snap.val(), hasLoadedTextAtLeastOnce: true });
    });
  }

  render() {
    if (!this.state.hasLoadedTextAtLeastOnce) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="App">
        <div className="container m-1">
          <div className="row">
            <div className="col">
              <img src={require("./img/photo-large.jpg")} alt="logo" />
            </div>
            <div className="col">
              <PostText text={this.state.text} onChange={this.handleChange} />
            </div>
          </div>
        </div>
        <CopyToClipboard text={transformSpaces(this.state.text)}>
          <button className="btn-primary m-1">Copy</button>
        </CopyToClipboard>
      </div>
    );
  }
}

export default App;

function transformSpaces(text) {
  return text.replace(/\n\n/g, "\n⠀\n");
}
