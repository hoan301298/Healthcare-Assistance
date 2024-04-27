const RedirectToLoginPage = ({ pathname, alertMessage }) => {
    
    localStorage.setItem('backToPage', pathname);
    localStorage.setItem('alertMessage', alertMessage);
    console.log(alertMessage);

    setTimeout(() => {
        window.location.href = '/login'
    }, 500);
    
    return null;
}

export default RedirectToLoginPage;