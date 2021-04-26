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

    const [user, setUser] = useState(null);

    useEffect(() => {
        // init netlify identity connection
        netlifyIdentity.init();
    }, []);
    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider> //this wrapps out entire app
    )
}

export default AuthContext