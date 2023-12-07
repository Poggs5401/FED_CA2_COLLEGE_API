import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const CreateLecturer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [form, setForm] = useState({
        name: "",
        address: "",
        email: "",
        phone: ""
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

        if (isRequired(['name', 'address', 'email', 'phone'])) {
            let token = localStorage.getItem('token');

            console.log(form);

            axios.post('https://college-api.vercel.app/api/lecturers', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                navigate(`/lecturers`);
            })
            .catch(err => {
                console.error(err);
            })
        }
    }

return(
    
    <>
    <h2>Add a Lecturer</h2>

    <form onSubmit={submitForm}>
        <div> Name: <input type="text" onChange={handleForm} value={form.name} name="name"/><span style={errorStyle}>{errors.name?.message}</span></div>
        <div> Address: <input type="text" onChange={handleForm} value={form.address} name="address"/><span style={errorStyle}>{errors.address?.message}</span></div>
        <div> Email: <input type="email" onChange={handleForm} value={form.email} name="email"/><span style={errorStyle}>{errors.email?.message}</span></div>
        <div> Phone: <input type="tel" onChange={handleForm} value={form.phone} name="phone"/><span style={errorStyle}>{errors.phone?.message}</span></div>            
        <input type="submit" /> 
    </form>

    </>
);

}

export default CreateLecturer;