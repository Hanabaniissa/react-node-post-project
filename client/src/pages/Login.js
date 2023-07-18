import React, {useState} from 'react';
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password,setPassword]= useState("")
    const handelLogin = () => {
        const data = {
            username: username,
            password: password
        }
        console.log(data)
        axios.post("http://localhost:3001/auth/login", data)
            .then((res) => {
                if (res.data.error) alert(res.data.error);
                else {
                    sessionStorage.setItem("accessToken", res.data)
                }
                console.log(res.data)
            });
    }
    return (
        <div>
            <input type="text" name="username" value={username} onChange={(e) => {
                setUsername(e.target.value)
            }}/>
            <input type="password" name="password" value={password} onChange={(e) => {
                setPassword(e.target.value)
            }}/>
            <button onClick={handelLogin}>Login</button>
        </div>
    );
}
export default Login;