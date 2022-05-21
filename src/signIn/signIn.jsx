import React from 'react'
import { useContext } from 'react'
import AuthContext from '../authContext/authProvider'

export default function SignIn() {
  const {signIn}=useContext(AuthContext);
  return (
    <div>
        <form onSubmit={signIn}>
            <label>User Name</label>
            <input type="text" name='userName'/>
            <label>Password</label>
            <input type="text" name='password'/>
            <button type='submit'>Sign In</button>
        </form>
    </div>
  )
}
