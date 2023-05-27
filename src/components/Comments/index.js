import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {formatDistanceToNow} from 'date-fns'

import './index.css'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentList: [],
    name: '',
    commentText: '',
  }

  onClickDelete = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.filter(
        eachComment => eachComment.id !== id,
      ),
    }))
  }

  isToggleLike = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onSubmitDetails = event => {
    event.preventDefault()
    const {name, commentText} = this.state
    const indexNumber = Math.ceil(
      Math.random() * initialContainerBackgroundClassNames.length - 1,
    )

    const profileBgColor = initialContainerBackgroundClassNames[indexNumber]

    const newComment = {
      id: uuidv4(),
      name,
      commentText,
      isLiked: false,
      profileBg: profileBgColor,
      date: formatDistanceToNow(new Date()),
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      name: '',
      commentText: '',
    }))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onEnterComment = event => {
    this.setState({commentText: event.target.value})
  }

  render() {
    const {commentList, commentText, name} = this.state
    const count = commentList.length

    return (
      <div className="app-container">
        <div className="comments-app-card">
          <h1 className="main-title">Comments</h1>
          <div className="comments-header-section">
            <form
              className="user-enter-container"
              onSubmit={this.onSubmitDetails}
            >
              <p className="about-comment">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="user-name"
                placeholder="Your Name"
                onChange={this.onChangeName}
                value={name}
              />
              <br />
              <textarea
                className="comment"
                placeholder="Your Comment"
                rows="5"
                cols="27"
                onChange={this.onEnterComment}
                value={commentText}
              >
                .
              </textarea>
              <br />
              <button className="comment-btn" type="submit">
                Add Comment
              </button>
            </form>
            <div className="comment-img-bg">
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
                className="comment-img"
              />
            </div>
          </div>
          <hr className="line" />
          <button className="comment-count" type="button">
            {count}
          </button>
          <span className="comment-span">Comment</span>
          <ul className="comments-sec">
            {commentList.map(eachComment => (
              <CommentItem
                commentDetails={eachComment}
                key={eachComment.id}
                isToggleLike={this.isToggleLike}
                onClickDelete={this.onClickDelete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Comments
