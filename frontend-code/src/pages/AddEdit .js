import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import './AddEdit.css';
import { toast } from 'react-toastify';

const initialState = {
    name: "",
    email: "",
    contact: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        if(id){
            getSingleUser(id);
        }
    }, [id])

    const getSingleUser = async (id) => {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        if (response.status === 200) {
           setState({...response.data[0] });
        }
    };

    const addUser = async (data) => {
        const response = await axios.post("http://localhost:5000/user", data);
        if (response.status === 200) {
            toast.success(response.data);
        }
    };

    const updateUser = async (data, id) => {
        const response = await axios.put(`http://localhost:5000/user/${id}`, data);
        if (response.status === 200) {
            toast.success(response.data);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!state.name || !state.email || !state.contact) {
            toast.error("Please provide value into each input field");
        } else {
            if (!id) {
                addUser(state);
            } else {
                updateUser(state, id);
            }
           
           setTimeout(()=> navigate("/"), 500 );
        }
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    return (
        <div style={{ marginTop: "100px" }}>
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center",
                }}
                onSubmit={handleSubmit}
            >
                <label htmlFor='name'>Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name ..."
                    onChange={(e)=>{handleInputChange(e)}}
                    value={state.name}
                    
                />
                <label htmlFor='email'>Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email ..."
                    onChange={handleInputChange}
                    value={state.email}
                    
                />
                <label htmlFor='contact'>Contact</label>
                <input
                    type="number"
                    id="contact"
                    name="contact"
                    placeholder="Enter Contact No. ..."
                    onChange={handleInputChange}
                    value={state.contact}
                    
                />
                <input type="submit" value={id ? " Update" : "Add"} />
            </form>
        </div>
    );
};

export default AddEdit;