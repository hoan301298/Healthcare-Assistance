import axios from "axios";
import { useState } from "react";

const ResetPassword = ({username}) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [response, setResponse] = useState(null);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if(newPassword === confirmedPassword) {
            try{
                const res = await axios.post('/account/reset-password', {username, oldPassword, newPassword});
                setResponse(res.data);
            } catch (e) {
                console.log(e);
            }
        } else {
            alert('Your password does not match!');
        }
    }

    return (
        <div className="reset-password">
            <h1>Reset Password</h1>
            <form onSubmit={handleResetPassword}>
                Select your password: <br />
                <input type="password" placeholder="Type your current password" value={oldPassword} minLength={8} onChange={e => setOldPassword(e.target.value)} required/><br />
                <input type="password" placeholder="Type your new password" value={newPassword} minLength={8} onChange={e => setNewPassword(e.target.value)} required/><br />
                <input type="password" placeholder="Confirm your new password" value={confirmedPassword} minLength={8} onChange={e => setConfirmedPassword(e.target.value)} required/><br />
                <button type="submit">Save</button>
            </form>
            {response}
        </div>
    )

}

export default ResetPassword;