import { Input } from '@material-ui/core'
import React from 'react'
function SignUp({username,email,password}) {
    return (
        <div>
            <center>
                <Input type="text" placeholder="Username" value={username} />
                <Input type="email" placeholder="Email" value={email} />
                <Input type="password" placeholder="Password" value={password} />
            </center>
        </div>
    )
}

export default SignUp
