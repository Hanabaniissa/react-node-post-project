import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"
import axios from "axios";

const initialValues = {
    username: "",
    password: ""
}
const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data)
        .then((res) => {
            console.log(res)
        })
        .catch((e) => ("have an error"));
}
const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3)
        .max(15)
        .required('This field is required'),
    password: Yup.string()
        .min(4)
        .max(20)
        .required('This field is required')
})
const Registration = () => {
    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span"/>
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="username"
                        placholder="(Ex. Jhon12...)"
                    />
                    <label>Password: </label>
                    <ErrorMessage name="password" component="span"/>
                    <Field
                        autocomplete ="off"
                        type = "password"
                        id ="inputCreatePost"
                        name ="password"
                        placholder ="Your password..."
                    />
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    );
}
export default Registration;