import React, { createContext, useState, useContext } from 'react'

interface IAuthContext {
    logged: boolean,
    signIn(email: string, password: string): void,
    singOut(): void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC = ({ children }) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@my_wallet:logged')

        return !!isLogged
    })

    const signIn = (email: string, password: string) => {
        if(email === 'guilherme@email.com' && password === '123') {
            localStorage.setItem('@my_wallet:logged', 'true')
            setLogged(true)
        } else {
            alert('Invalid login data, confirm your email and password and try again!')
        }
    }

    const singOut = () => {
        localStorage.removeItem('@my_wallet:logged')
        setLogged(false)
    }

    return (
        <AuthContext.Provider value={{logged, signIn, singOut}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }