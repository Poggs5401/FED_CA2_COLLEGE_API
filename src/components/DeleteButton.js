import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DeleteButton({id, resource, deleteCallback}) {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const onDelete = () => {
        setIsLoading(true);
        let token = localStorage.getItem('token');

        axios.delete(`https://college-api.vercel.app/api/${resource}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
             .then(response => {
                console.log(response.data);
                navigate(`/${resource}`);
                deleteCallback(id);
                
             })
             .catch(err => {
                console.log(err.response.data)
             });
    };

    return (
        <button onClick={onDelete}>
            {isLoading ? "Deleting..." : "Delete"}
        </button>
    );
};