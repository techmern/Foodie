import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../CommonLayouts/ErrorMsg/ErrorMessage';

export default function Login_Admin() {

    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false)
    const [msg, setMsg] = useState('')
    const [type, setType] = useState('')
    const navigate = useNavigate();
    const [emailid, setEamilid] = useState('');
    const [password, setPassword] = useState('');

    const style = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5',
        },
        box: {
            width: '400px',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        title: {
            marginBottom: '20px',
            fontSize: '24px',
            textAlign: 'center',
            color: '#333',
        },
        input: {
            width: '100%',
            margin: '10px 0',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        button: {
            width: '100%',
            margin: '10px 0',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
        },
    };


    const handleInputBlur = (e) => {
        const { name, value } = e.target
        if (value.trim() === '') {
            setErrors({
                ...errors,
            })
            e.preventDefault()
            setShowToast(true)
            setMsg(`${name} can not be blank`)
            setType("error")
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        }
        if (value.trim() === '') {
            setErrors({
                ...errors,
                [name]: `${name} can not be blank`,
            });
            setTimeout(() => {
                setErrors({
                    ...errors,
                    [name]: '',
                });
            }, 3000);
        }
        else {

            if (name === 'emailid') {
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    setErrors({
                        ...errors,
                        [name]: 'Enter proper E-mail ID'
                    })
                    e.preventDefault()
                    setShowToast(true)
                    setMsg('Enter proper E-mail ID')
                    setType("error")
                    setTimeout(() => {
                        setShowToast(false)
                    }, 3000)
                }
            }
            else if (name === 'password') {
                if (!/^[A-Za-z\d@#$]{5,12}$/.test(value)) {
                    setErrors({
                        ...errors,
                        [name]: 'Please enter a valid password with upper case, lower case, digits (0-9), and @#$ characters',
                    })
                    e.preventDefault()
                    setShowToast(true)
                    setMsg('Please enter a valid password with upper case, lower case, digits (0-9), and @#$ characters');
                    setType("error")
                    setTimeout(() => {
                        setShowToast(false)
                    }, 3000)
                }
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (!emailid.trim() || !password.trim()) {
                setShowToast(true);
                setMsg('Please Enter Email Id');
                setType('error');
                return;
            }

            if (!password.trim()) {
                setShowToast(true);
                setMsg('Please enter Password');
                setType('error');
                return;
            }

            const res = await axios.post("http://localhost:5000/admin/adminlogin", { emailid, password });
            const { msg, loginsts, admin } = res.data;
            console.log(res);

            if (loginsts === 2) {
                localStorage.setItem('admin', JSON.stringify(admin));
                navigate('/welcomeAdmin');
            } else {
                setErrors({
                    ...errors,
                })
                e.preventDefault()
                setShowToast(true)
                setMsg(`${msg}`)
                setType("error")
                setTimeout(() => {
                    setShowToast(false)
                }, 3000)
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <ErrorMessage showToast={showToast} msg={msg} type={type} />
            <div style={style.container}>

                <div style={style.box}>
                    <h2 style={style.title}>Admin Login</h2>
                    <input type="text" style={style.input} name="emailid" id="emailid" onBlur={handleInputBlur} placeholder="Email Id" required="" value={emailid} onChange={(e) => setEamilid(e.target.value)} />
                    <input type="password" style={style.input} name="password" id="password" onBlur={handleInputBlur} placeholder="Password" required="" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button style={style.button} onClick={handleSubmit}>Login</button>
                </div>
            </div>

        </div>
    )
}
