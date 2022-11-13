import React, { useState } from 'react';
import axios from 'axios';

const File = () => {
    const [newFile, setNewFile] = useState(
        {
            name: '',
            birthdate: '',
            photo: '',
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', newFile.photo);
        formData.append('birthdate', newFile.birthdate);
        formData.append('name', newFile.name);

        axios.post('http://localhost:5000/api/v1/file/add/', formData)
             .then(res => {
                console.log(res);
             })
             .catch(err => {
                console.log(err);
             });
    }

    const handleChange = (e) => {
        setNewFile({...newFile, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        setNewFile({...newFile, photo: e.target.files[0]});
    }

    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
            />

            <input 
                type="text"
                placeholder="name"
                name="name"
                value={newFile.name}
                onChange={handleChange}
            />

            <input 
                type="date"
                name="birthdate"
                value={newFile.date}
                onChange={handleChange}
            />

            <input 
                type="submit"
            />
        </form>
    );
}

export default File;