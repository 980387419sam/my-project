import React from "react";
import RegisterForm from './registerForm'

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