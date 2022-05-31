import React from 'react'
import { useContext } from 'react'
import AuthContext from '../authContext/authProvider'

export default function SignUp() {
    const {signUp}=useContext(AuthContext);
  return (
    <div>
        <form onSubmit={signUp}>
            <label>Name</label>
            <input type="text" name="name"/>
            <label>User Name</label>
            <input type="text" name='userName'/>
            <label>Password Name</label>
            <input type="text" name='password'/>
            <label>Select Your Department</label>
           <select name="department">
             <option>Select Department</option>
             <option>Design</option>
             <option>Customer-Support</option>
             <option>Packing</option>
           </select>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}


