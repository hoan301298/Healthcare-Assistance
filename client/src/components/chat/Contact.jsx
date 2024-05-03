import socketIO from 'socket.io-client';
import RedirectToLoginPage from '../account_service/RedirectToLoginPage';
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