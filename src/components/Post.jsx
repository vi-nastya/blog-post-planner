import React, { Component } from "react";
import PostText from "./PostText";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as firebase from "firebase";

import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

class Post extends Component {
  state = {
    text: "New post",
    hasLoadedTextAtLeastOnce: false
  };

  handleChange = newText => {
    this.setState({ text: newText });
    const postId = this.props.match.params.postId;
    const textRef = firebase.database().ref("posts/" + postId + "/text");
    console.log("text ref: ", textRef);
    textRef.set(newText);
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    const textRef = firebase.database().ref("posts/" + postId + "/text");
    textRef.on("value", snap => {
      this.setState({ text: snap.val(), hasLoadedTextAtLeastOnce: true });
    });
  }

  render() {
    console.log(this.props);
    if (!this.state.hasLoadedTextAtLeastOnce) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="Post">
        <div className="container m-1">
          <div className="row">
            <div className="col" /> IMG
            <div className="col">
              <PostText text={this.state.text} onChange={this.handleChange} />
            </div>
          </div>
        </div>
        <CopyToClipboard text={transformSpaces(this.state.text)}>
          <button className="btn-primary m-1">Copy</button>
        </CopyToClipboard>

        <Link to="/">
          <Button variant="contained" color="primary">
            Back to list of posts
          </Button>
        </Link>
      </div>
    );
  }
}

export default Post;

function transformSpaces(text) {
  return text.replace(/\n\n/g, "\n⠀\n");
}

//<img src={require("/src/img/photo-large.jpg")} alt="logo" />
