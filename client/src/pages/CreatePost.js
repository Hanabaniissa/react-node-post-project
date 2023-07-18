import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup"
import "../App.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreatePost = (props) => {
    const initialValues = {
        title: "",
        postText: "",
        username: ""
    }
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((res)=>{
            navigate("/")
            console.log("done")
        }).catch((e)=>("have an error"))
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('This field is required'),
        postText : Yup.string()
            .required('This field is required'),
        username: Yup.string()
            .min(3).max(15).required('This field is required')
    });
    const navigate = useNavigate();
        return(
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Title: </label>
                    <ErrorMessage name="title" component="span"/>
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="title"
                        placholder="(Ex. Title...)"
                    />
                    <label>Post: </label>
                    <ErrorMessage name="postText" component="span"/>
                    <Field
                        id="inputCreatePost"
                        name="postText"
                        placholder="(Ex. Post...)"
                    /> <label>Username: </label>
                    <ErrorMessage name="username" component="span"/>
                    <Field
                        id="inputCreatePost"
                        name="username"
                        placholder="(Ex. Hana123...)"
                    />
                    <button type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    );
}
export default CreatePost;