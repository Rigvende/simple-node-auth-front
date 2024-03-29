import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { AuthPage } from './pages/AuthPage';
import { EditPage } from './pages/EditPage';
import { CatsPage } from './pages/CatsPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ChangePasswordPage } from './pages/ChangePasswordPage';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>                
                <Route path='/users/:page?' exact>
                    <MainPage />
                </Route>
                <Route path='/edit/:id' exact>
                    <EditPage/>
                </Route>
                <Route path='/cats' exact>
                    <CatsPage/>
                </Route>
                <Redirect to="/users" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Route path='/register' exact>
                <RegistrationPage />
            </Route>
            <Route path='/reset' exact>
                <ResetPasswordPage />
            </Route>
            <Route path='/change/:id' exact>
                <ChangePasswordPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
};
