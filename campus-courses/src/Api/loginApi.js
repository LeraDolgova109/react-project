import Axios from "axios";
import swal from 'sweetalert';

const baseUrl = 'https://camp-courses.api.kreosoft.space/';

function postLogin(email, password){
   return Axios.post(baseUrl+'login',{
      email: email,
      password: password
   }).then(response => {
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
   })
       .catch(error => {
         swal('Ошибка', 'Неверный логин или пароль', 'error')
      });
}

export default postLogin;