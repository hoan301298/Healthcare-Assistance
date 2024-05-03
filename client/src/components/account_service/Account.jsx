import RedirectToLoginPage from "./RedirectToLoginPage";

const Account = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return(
        <div>
            {isAuthenticated? (
                <div>
                    <h1>Account, Your account is authenticated</h1>
                </div>
                ) : (
                <RedirectToLoginPage pathname={window.location.pathname} alertMessage={'Please login to view your profile!'}/>
            )}
        </div>
    )
}

export default Account;