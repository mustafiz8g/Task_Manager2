

/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  
} from 'firebase/auth'

import axios from 'axios'
import { app } from '../firebase.config'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = async () => {
    setLoading(true)
    return signOut(auth)
  }

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
    //   console.log('CurrentUser-->', currentUser?.email)
      if (currentUser?.email) {
        setUser(currentUser)
        // save use4 info
        await axios.post(`${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`,{
          name:currentUser?.displayName , 
          image: currentUser?.photoURL,
          email: currentUser?.email,
          
                                   
        })

        // Get JWT token
        await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          {
            email: currentUser?.email,
          },
          { withCredentials: true }
        )
      } else {
        setUser(currentUser)
        await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
          withCredentials: true,
        })
      }
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    signInWithGoogle,
    logOut,
   
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider


