// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('/api/login', { email, password });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Email:
//         <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
//       </label>
//       <br />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;