import React, { Component } from "react";

class PostText extends Component {
  render() {
    return (
      <div className="PostText">
        <textarea
          className="form-control"
          rows="24"
          value={this.props.text}
          onChange={e => {
            this.props.onChange(e.target.value);
          }}
        />
      </div>
    );
  }
}

export default PostText;
