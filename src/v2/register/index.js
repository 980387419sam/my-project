import React from "react";
import RegisterForm from './registerForm'
import './style.css'



export default class register extends React.PureComponent{
    UNSAFE_componentWillMount(){

    }
    render(){
        return (
            <div className="register">
                <RegisterForm/>
            </div>
        )
    }
}