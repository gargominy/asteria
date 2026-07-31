import React, { useState } from 'react'
import { registerUser } from "../../services/authServices"
import { useNavigate } from 'react-router-dom'
import styles from "./RegisterForm.module.css"

function RegisterForm() {

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [fullname, setFullname] = useState("Guest");
    const [age, setAge] = useState(0);

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleConfirmationChange = (event) => setConfirmation(event.target.value);
    const handleFullnameChange = (event) => setFullname(event.target.value);
    const handleAgeChange = (event) => setAge(event.target.value);

    function handleSubmit(event) {
        event.preventDefault();
        registerUser({username, password, confirmation, fullname, age})
            .then(res => {
                if (res.success) {
                    navigate('/login')
                    return
                }
                setError(res.error)
        })
    }

    return (
        <>
            <div className={styles.registerPage}>
                { error &&
                    <div className="error-div">
                        <p className="error-message">{error}</p>
                    </div>
                }
                <form className={styles.registerForm} onSubmit={handleSubmit}>
                    <label>Username :</label>
                    <input name="username" type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
                    <p>{username}</p>

                    <label>Password :</label>
                    <input name="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                    <p>{password}</p>

                    <label>Confirmation :</label>
                    <input name="confirmation" type="password" placeholder="Password (Again)" value={confirmation} onChange={handleConfirmationChange}/>
                    <p>{confirmation}</p>

                    <label>Full Name :</label>
                    <input name="fullname" type="text" placeholder="Full Name (Optional)" value={fullname} onChange={handleFullnameChange}/>
                    <p>{fullname}</p>

                    <label>Age :</label>
                    <input name="age" type="number" placeholder="Age (Optional)" value={age} onChange={handleAgeChange}/>
                    <p>{age}</p>

                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    )
}

export default RegisterForm
