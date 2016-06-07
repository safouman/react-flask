import {

CHANGE_AUTH
} from './types';
import axios from 'axios';
import {browserHistory} from 'react-router'
import {
    USER_ADDED,
    AUTH_ERROR,
    AUTH_USER,
    UNAUTH_USER,
    FETCH_DEVICE} from './types'

const ROOT_URL= 'http://localhost:5000';


export  function signinUser({username,password}) {
    return function (dispatch) {

        var config = { auth: {
    username,
    password
  }}

        axios.get(`${ROOT_URL}/api/token`,config)
            .then(response=>{

                //if request is good
                //-update state
                dispatch({type: AUTH_USER})
                //-save jwt token
                localStorage.setItem('token',response.data.token)
                //-redirect user
                 browserHistory.push('/config')

            })
            .catch(()=>{
                
                //show error
                dispatch(authError('Bad Login Info'));
                

            })
    }}

export function signupUser({username, password}) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/api/signup`,{username, password})
         .then(response=>{

                //if request is good
                //-update state
                dispatch({type: USER_ADDED})


                //-redirect user
                 browserHistory.push('/config')

    })
            .catch(response=> dispatch(authError(response.data.error)));




}}
export  function authError(error) {
    return {
        type:AUTH_ERROR,
        payload: error
    };


}

export  function signoutUser() {
    localStorage.removeItem('token');


    return{type: UNAUTH_USER};

}

export function fetchDevice() {
    return function (dispatch) {
        var token= localStorage.getItem('token')

        axios.get(`${ROOT_URL}/api/list_usb`,{
             auth: {
    username:token,
  }} )
            .then(response=>{
                
                 dispatch({
                     type: FETCH_DEVICE,
                     payload: response.data.results.result
                         //.replace(/\"([^(\")"]+)\":/g,"$1:")
                 })
            })


  }
    
}



