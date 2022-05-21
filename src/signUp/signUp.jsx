import React from 'react'
import { useContext } from 'react'
import AuthContext from '../authContext/authProvider'

export default function SignUp() {
    const {signUp}=useContext(AuthContext);
  return (
    <div>
        <form onSubmit={signUp}>
            <label>First Name</label>
            <input type="text" name="firstName"/>
            <label>Last Name</label>
            <input type="text" name='lastName'/>
            <label>User Name</label>
            <input type="text" name='userName'/>
            <label>Password Name</label>
            <input type="text" name='password'/>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}


