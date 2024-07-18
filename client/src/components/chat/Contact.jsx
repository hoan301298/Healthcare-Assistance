import RedirectToLoginPage from '../account_service/action/RedirectToLoginPage';
import { RoomDetails } from './RoomDetails';

const Contact = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <div>
      {isAuthenticated? (
        <RoomDetails isAuthenticated={isAuthenticated}/>               
      ) : (
        <RedirectToLoginPage pathname={window.location.pathname} alertMessage={'Please login to use chat service!'}/>
      )}
    </div>
  );
};

export default Contact;