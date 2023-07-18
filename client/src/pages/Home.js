import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Home(){
    const [listOfPosts, setListOfPosts] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:3001/posts")
            .then((res)=>{
                setListOfPosts(prev => res.data)
            })
            .catch((e)=>{ console.log(e,"here2")
            })
    },[])
    return(
        <div>
            {listOfPosts.map((value, key)=>{
                return (
                    <div className="postt" style={{marginTop:"50px"}} onClick={()=>{navigate(`/post/${value.id}`)}}>
                        <div className="card text-white bg-primary mb-3" style={{ maxWidth:"18rem"}}>
                            <div className="card-header">{value.title}</div>
                            <div className="card-body">
                                <p className="card-text">{value.postText}</p>
                            </div>
                            <div className="card-footer">{value.username}</div>
                        </div>
                    </div>
                )}
            )}
        </div>
    )
}

export default Home;