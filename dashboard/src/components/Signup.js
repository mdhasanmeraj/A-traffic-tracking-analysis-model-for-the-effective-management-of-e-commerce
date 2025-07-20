// import React, { useState } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';

// function Signup() {
//   const [username, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [age, setage] = useState('');
//   const [country, setcountry] = useState('');
//   const [password, setPassword] = useState('');
//  // const history = useHistory();
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('/api/signup', { username, email, age, country, password });
//       setMessage(response.data.message);
//       //history.push('/Home');
//     } catch (error) {
//       setMessage(error.response.data.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input type="text" value={username} onChange={(event) => setName(event.target.value)} />
//       </label>
//       <br />
//       <label>
//         Email:
//         <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
//       </label>
//       <br />
//       <label>
//         age:
//         <input type="number" value={age} onChange={(event) => setage(event.target.value)} />
//       </label>
//       <label>
//         country:
//         <input type="text" value={country} onChange={(event) => setcountry(event.target.value)} />
//       </label>
//       <label>
//         Password:
//         <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
//       </label>
//       <br />
//       <button type="submit">Signup</button>
//     </form>
//   );
// }

// export default Signup;