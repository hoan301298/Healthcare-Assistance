const Home = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    console.log(isAuthenticated)
    return (
        <div>
            <h1>This is Home page</h1>
            {isAuthenticated? (
                <h1>Is Authenticated</h1>
            ) : (
                <h1>False for authentication</h1>
            )}
        </div>
    )
}

export default Home;