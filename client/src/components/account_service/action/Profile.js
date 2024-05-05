import axios from 'axios';

const getProfile = async (username) => {
    try {
        const response = await axios.get('/account', {
            params: {
                username: username
            }
        });
        const userDetails = response.data.userDetails;
        return userDetails;
    } catch (error) {
        // Handle errors
        console.error(`Error fetching ${username} data from server:`, error);
        throw error; // Optionally rethrow the error
    }
}

const updateProfile = async ({ updateUser }) => {
    await axios.put('/account/update-userdetails', {updateUser})
    .then(response => {
        return response.data;
    })
    .catch(error => console.log(error))
}

export { getProfile, updateProfile };