import { createContext, useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
    authReady: false
});  //we create "context" to provide our app global state (whether user is logged in or not. And if is - who is the user, etc).

// this is react component
// this prop "children"represents whatever this component wrapps ( here in _app component)
export const AuthContextProvider = ({ children }) => {
    useEffect(() => {
        // this listening for any user that signed/logged in -> and we grab data of this user automagically.
        netlifyIdentity.on('login', (user) => {
            setUser(user);
            netlifyIdentity.close();
            console.log('login event occured')
        })

        netlifyIdentity.on('logout', () => {
            setUser(null);
            console.log('logout event occured')
        })


        // init netlify identity connection
        netlifyIdentity.init();
        return () => {
            netlifyIdentity.off('login');
            netlifyIdentity.off('logout');
        }
    }, []);

    const [user, setUser] = useState(null);
    const login = () => {
        netlifyIdentity.open() //its open up an modal
    }
    const logout = () => {
        netlifyIdentity.logout()
    }
    // create one bundle for all of props to pass them down trough global context:
    const context = {
        user: user,
        login: login,
        logout: logout
    }
    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider> //this wrapps out entire app
    )
}

export default AuthContext