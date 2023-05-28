import './index.css'

const CommentItem = props => {
  const {commentDetails, isToggleLike, onClickDelete} = props
  const {commentText, name, date, profileBg, isLiked, id} = commentDetails
  const startLetter = name.slice(0, 1)
  const onClickLike = () => {
    isToggleLike(id)
  }

  const onDelete = () => {
    onClickDelete(id)
  }

  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  return (
    <li className="comment-item">
      <div className="profile-sec">
        <div className={`profile-pic-bg ${profileBg}`}>{startLetter}</div>
        <p className="commented-by">{name}</p>
        <p className="comment-time">{date}</p>
      </div>
      <p className="comment-description">{commentText}</p>
      <div className="subscribe-sec">
        <button type="button">
          <img src={likeImgUrl} className="like-img" alt="like" />
        </button>

        <button className="like" type="button" onClick={onClickLike}>
          Like
        </button>
        <div className="delete-btn">
          <button data-testid="delete" onClick={onDelete}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
              className="delete-img"
            />
          </button>
        </div>
      </div>
    </li>
  )
}
export default CommentItem
