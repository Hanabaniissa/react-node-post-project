import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import "../App.css"
import axios from "axios";

const Post = (props) => {
    let {id} = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
            axios.get(`http://localhost:3001/posts/byId/${id}`)
                .then((res) => {
                    setPost(prev => res.data)
                })
                .catch((e) => {
                    console.log("error")
                });
            axios.get(`http://localhost:3001/comments/${id}`)
                .then((res) => {
                    setComments(prev => res.data)
                })
                .catch((e) => {
                    console.log("error")
                });

        }
        , []);
    const addComment = () => {
        const commentToAdd = {commentBody: newComment}
        axios.post("http://localhost:3001/comments",
            {
                commentBody: newComment,
                PostId: id
            },
            {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken")
                }
            })
            .then((res) => {
                if (res.data.error){
                    alert(res.data.error);
                }else {
                    setComments([...comments, commentToAdd]);
                    setNewComment("")
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }
    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title">{post.title}</div>
                    <div className="body bodyText">{post.postText}</div>
                    <div className="footer">{post.username}</div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input type="text" placeholder="Comment..." name="comment" autoComplete="off"
                           value={newComment}
                           onChange={(e) => {
                               setNewComment(e.target.value)
                           }}/>
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className="listOfComments">
                    {comments.map((item, index) => {
                        return (
                            <div key={index} className="comment">{item.commentBody}</div>);
                    })
                    }
                </div>
            </div>
        </div>
    )
        ;
}

export default Post;