import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const CreateCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [form, setForm] = useState({
        title: "",
        code: "",
        description: "",
        points: "",
        level: ""
    });

    const errorStyle = {
        color: "red",
        fontStyle: "bold",
    };

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    };

    const isRequired = (fields) => {

        let included = true;
        setErrors({});

        fields.forEach(field => {
            if (!form[field]) {
                included = false;
                setErrors(prevState => ({
                ...prevState,
                [field]: {
                    message: `${field} is required!`
                }    
                }))
                console.log(`${field} is required`);
            }
        })
        return included;
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log('submitted form');

        if (isRequired(['title', 'code', 'description', 'points', 'level'])) {
            let token = localStorage.getItem('token');

            console.log(form);

            axios.post('https://college-api.vercel.app/api/courses', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                navigate(`/courses`);
            })
            .catch(err => {
                console.error(err);
            })
        }
    }

return(
    
    <>
    <h2>Create Course</h2>

    <form onSubmit={submitForm}>
        <div> Title: <input type="text" onChange={handleForm} value={form.title} name="title"/><span style={errorStyle}>{errors.title?.message}</span></div>
        <div> Code: <input type="text" onChange={handleForm} value={form.code} name="code"/><span style={errorStyle}>{errors.code?.message}</span></div>
        <div> Description: <input type="text" onChange={handleForm} value={form.description} name="description"/><span style={errorStyle}>{errors.description?.message}</span></div>
        <div> Points: <input type="number" onChange={handleForm} value={form.points} name="points"/><span style={errorStyle}>{errors.points?.message}</span></div>
        <div> Level: <input type="number" onChange={handleForm} value={form.level} name="level"/><span style={errorStyle}>{errors.level?.message}</span></div>
            
        <input type="submit" /> 
    </form>

    </>
);

}

export default CreateCourse;