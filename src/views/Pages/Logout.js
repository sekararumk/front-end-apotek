import React from 'react'
import { useDispatch } from 'react-redux'
import userSlice from '../../store/user'
import { useHistory } from 'react-router-dom'

const Logout = () => {
    
    const history = useHistory()
    const dispatch = useDispatch()

    // menghapus token dari local storage
    localStorage.removeItem('accessToken')
    // mengupdate user store menjadi null
    dispatch( userSlice.actions.removeUser() )
    history.push('/auth/signin');
    
    return <></>
}

export default Logout