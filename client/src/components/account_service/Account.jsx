import { useState } from "react";
import RedirectToLoginPage from "./action/RedirectToLoginPage";
import Sidebar from "./action/Sidebar";
import ShowAppointment from "./action/ShowAppointment";
import ResetPassword from "./action/ResetPassword";
import ShowProfile from "./action/ShowProfile";
import '../../css/Account.css';

const Account = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const [pageCode, setPageCode] = useState(0);
    // Page Code setting: Profile(0), Appointment(1), Reset Password(2)
    const username = localStorage.getItem('username');
    const updatePageCode = (code) => {
        setPageCode(code);
    }
    if(!isAuthenticated) {
        return <RedirectToLoginPage pathname={window.location.pathname} alertMessage={'Please login to view your profile!'}/>
    }
    return  (
        <div className="account">
            <div className="side-bar">
                <Sidebar updatePageCode={updatePageCode}/>
            </div>
            <div className="information">
                { pageCode === 0 && 
                    <ShowProfile username={username}/>
                }
                { pageCode === 1 && 
                    <ShowAppointment username={username}/>
                }
                { pageCode === 2 && 
                    <ResetPassword username={username}/>
                }
            </div>
        </div>
    )
}

export default Account;