// import { createContext, useReducer, useEffect } from "react";
// import axios from 'axios'
// import setAccToken from "../utils/setAccToken";
// import { accReducer } from "../reducers/accReducer";
// export const AccContext = createContext()
// const LOCAL_STORAGE_TOKEN_NAME = 'bookStore';



// const AccContextProvider = ({ children }) => {

//     const [accState, dispatch] = useReducer(accReducer, {
//         accLoading: true,
//         isAccenticated: false,
//         user: null
//     })
//     // Accthenticate user
//     const loadUser = async () => {
//         if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
//             setAccToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
//         }
//         try {
//             const response = await axios.get('http://localhost:3000/account')
//             if (response.data.success) {
//                 dispatch({ type: 'SET_ACCOUNT', payload: { isAccenticated: true, user: response.data.user } })
//             }
//         } catch (error) {
//             localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
//             setAccToken(null)
//             dispatch({
//                 type: 'SET_ACCOUNT',
//                 payload: { isAccenticated: false, user: null }
//             })
//         }
//     }
//     useEffect(() => {
//         loadUser()
//     }, []);

//     // Login
//     const loginUser = async userForm => {
//         try {
//             const response = await axios.post('http://localhost:3000/account/login', userForm)
//             if (response.data.success)
//                 localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
//             return response.data
//         } catch (error) {
//             if (error.response.data) return error.response.data
//             else return { success: false, message: error.message }
//         }
//     }
//     // Context data
//     const AccContextData = { loginUser, accState }
//     // return Provider
//     return (
//         <AccContext.Provider value={AccContextData}>
//             {children}
//         </AccContext.Provider>
//     )

// }

// export default AccContextProvider;