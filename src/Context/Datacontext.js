import React,{createContext, useReducer, useState} from 'react'
import {sumItems,CartReducer} from './DataReducer'
import {INCREASE,DECREASE,ADD_TO_CART,CHECKOUT,CLEAR_CART,REMOVE_ITEM} from './Actions'
export const AppContext = createContext();
const Storage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {
  cartItems: Storage,
  ...sumItems(Storage),
  checkout: false,
};


const Datacontext = ({children}) => {

    //anchor
         const [anchorEl, setAnchorEl] = useState(null);
         const [anchortwo,setAnchortwo]=useState(null)
         const handleAnchorClick = (e) => {
           setAnchorEl(e.currentTarget);
         };
         const handleAnchorClicktwo =(e) =>{
             setAnchortwo(e.currentTarget)
         }
         const handleAnchorClose = () => {
           setAnchorEl(null);
         };
         const handleAnchorClosetwo=()=>{
             setAnchortwo(null)
         }
         //transaction success  
         const [transactionMsg,setTransactionMsg]=useState(false)
         
    //login signup
    const [loginOpen,setLoginOpen]=useState(false)
    const [signupOpen,setSignupOpen]=useState(false)
    const [loginEmail,setLoginEmail]=useState('')
    const [loginPassword,setLoginPassword]=useState('')
    const [signupEmail,setSignupEmail]=useState('')
    const [signupPassword,setSignupPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')    

    const handleSignupEmailChange=(e)=>{
        setSignupEmail(e.target.value)
    }

    const handleSignupPasswordChange=(e)=>{
        setSignupPassword(e.target.value)
    }
    
    const handleLoginEmailChange=(e)=>{
        setLoginEmail(e.target.value)
    }

    const handleLoginPasswordChange=(e)=>{
        setLoginPassword(e.target.value)
    }
    const handleConfirmPasswordChange=(e)=>{
        setConfirmPassword(e.target.value)
    }

    const handleLoginOpen=()=>{
        setLoginOpen(true)
        setAnchorEl(null)
    }
    const handleLoginClose=()=>{
        setLoginOpen(false)
    }
    const handleSignupOpen=()=>{
        setSignupOpen(true)
        setAnchorEl(null)
    }
    const handleSignupClose=()=>{
        setSignupOpen(false)
    }
    //cart 
    const [state,dispatch]=useReducer(CartReducer,initialState)
    
    
    

    const increase=(payload)=>{
        dispatch({type:INCREASE,payload})
    }

    const decrease=(payload)=>{
        dispatch({type:DECREASE,payload})
    }

    const addProduct=(payload)=>{
        dispatch({type:ADD_TO_CART,payload})
    }

    const removeProduct=(payload)=>{
        dispatch({type:REMOVE_ITEM,payload})
    }

    const clearCart=()=>{
        dispatch({type:CLEAR_CART})
    }

    const checkout=()=>{
        dispatch({type:CHECKOUT})
    }

        const contexts={
            increase,decrease,addProduct,removeProduct,clearCart,checkout,loginOpen,handleLoginClose,setLoginOpen,signupOpen,setSignupOpen,handleSignupClose,handleLoginOpen,handleSignupOpen,anchorEl,handleAnchorClick,handleAnchorClose,anchortwo,setAnchortwo,handleAnchorClicktwo,handleAnchorClosetwo,loginEmail,setLoginEmail,loginPassword,setLoginPassword,signupEmail,setSignupEmail,signupPassword,setSignupPassword,confirmPassword,handleConfirmPasswordChange,setConfirmPassword,transactionMsg,setTransactionMsg,handleLoginEmailChange,handleLoginPasswordChange,handleSignupEmailChange,handleSignupPasswordChange,...state
        }

    return (
        <AppContext.Provider value={contexts}>
            {children}
        </AppContext.Provider>
    )
}

export default Datacontext
