import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "./Profile";

const ShowProfile = ({username}) => {

    const [userDetails, setUserDetails] = useState({});
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [age, setAge] = useState(null);
    const [password, setPassword] = useState(null);
    const [responseData, setResponseData] = useState(null);

    const getUserDetails = async () => {
        try{
            const user = await getProfile(username);
            setUserDetails(user);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateUser = {
            username: username,
            password: password,
            email: email,
            phone: phone,
            age: age
        }
        try{
            const update = await updateProfile(updateUser);
            setResponseData(update)
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h1>Profile</h1>
            <div>
                <p>Username: {username}</p>
                <p>Email: {userDetails.email}</p>
                <p>Phone: {userDetails.phone}</p>
                <p>Age: {userDetails.age}</p>
            </div>
            <br />
            <h1>Edit your profile</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" /> <br/>
                <input type="text" value={phone} maxLength={15} onChange={e => setPhone(e.target.value)} placeholder="Enter your phone" /> <br/>
                <input type="number" value={age} maxLength={3} onChange={e => setAge(e.target.value)} placeholder="Enter your age" /> <br/>
                Confirm password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} /> <br />
                <button type="submit">Save</button>
            </form>
            {responseData}
        </div>
    )
}

export default ShowProfile;