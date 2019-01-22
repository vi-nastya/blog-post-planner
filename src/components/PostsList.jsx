import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

import { CopyToClipboard } from "react-copy-to-clipboard";
import * as firebase from "firebase";

class PostsList extends Component {
  state = {
    posts: [],
    receivedDataFromFirebase: false
  };

  componentDidMount() {
    const textRef = firebase.database().ref("posts");
    textRef.on("value", snap => {
      this.setState({ posts: snap.val(), receivedDataFromFirebase: true });
    });
  }

  /*
TODO:
generate ids
add "save" button for each post
add date field
display links as buttons
?? add random icons to links
material UI
*/

  handleNewPost = () => {
    let newPosts = { ...this.state.posts };
    let postId = "post" + Math.floor(Math.random() * 10000);
    newPosts[postId] = { text: "New post text" };
    this.setState({ posts: newPosts });
    const textRef = firebase.database().ref("posts/" + postId + "/text");
    textRef.set("");
  };

  render() {
    console.log(this.state.posts);
    console.log(Object.keys(this.state.posts));
    return (
      <div id="main-panel" ref="mainPanel">
        <div>
          Available posts:
          {Object.keys(this.state.posts).map(p => {
            return (
              <div key={p}>
                <Link to={"/posts/" + p}>Post #{p}</Link>
              </div>
            );
          })}
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={this.handleNewPost}
        >
          New post
        </Button>
        {/* <Link to="/posts/1">Last post</Link> */}
        {/* <Link to="/lastPost">Last post</Link> */}
      </div>
    );
  }
}

export default PostsList;
