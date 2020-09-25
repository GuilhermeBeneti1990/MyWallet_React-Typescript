import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Signin from '../pages/Signin'

const AuthRoutes: React.FC = () => (
    <Switch>
        <Route path='/' component={Signin}/>
    </Switch>
)

export default AuthRoutes