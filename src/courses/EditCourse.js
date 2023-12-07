import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        title: "",
        code: "",
        description: "",
        points: "",
        level: ""
    });


    const errorStyle = {
        color: 'red'
    };

    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://college-api.vercel.app/api/courses/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data);
            setCourse(response.data.data);
            setForm(response.data.data);
        })
        .catch(err => {
            console.error(err);
        })
    }, [id]);

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const isRequired = (fields) => {

        let included = true;
        setErrors({});

        fields.forEach(field => {

            if(!form[field]){
                included = false;
                setErrors(prevState => ({
                    ...prevState,
                    [field]: {
                        message: `${field} is required!`
                    }
                }));
            }
            
        });

        return included;
    };

    console.log(form);

    const submitForm = (e) => {
        e.preventDefault();
        console.log('submitted', form);

        if(isRequired(['title', 'code', 'description', 'points', 'level'])){
            let token = localStorage.getItem('token');

            axios.put(`https://college-api.vercel.app/api/courses/${id}`, form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                navigate(`/courses/${id}`);
            })
            .catch(err => {
                console.error(err);
            });
        }
        
    };

    

    if(!course) return <h3>Course not found</h3>

    return (
        <>
            <h2>Edit Course</h2>
            <form onSubmit={submitForm}>
                <div>Title: <input type='text'  value={form.title} onChange={handleForm} name='title'/><span style={errorStyle}>{errors.title?.message}</span></div>
                <div>Code: <input type='text'  value={form.code} onChange={handleForm} name='code'/><span style={errorStyle}>{errors.code?.message}</span></div>
                <div>Description: <input type='text' value={form.description} onChange={handleForm} name='description'/><span style={errorStyle}>{errors.description?.message}</span></div>
                <div>Points: <input type="number" value={form.points} onChange={handleForm} name='points'/><span style={errorStyle}>{errors.points?.message}</span></div>
                <div>Level: <input type="number" value={form.level} onChange={handleForm} name='level'/><span style={errorStyle}>{errors.level?.message}</span></div>
                <input type='submit' />
            </form>
        </>
    );
};

export default EditCourse;