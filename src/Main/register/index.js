import React from "react";
import RegisterForm from './registerForm'
import styles from './style.module.css'

export default class register extends React.PureComponent{
    UNSAFE_componentWillMount(){

    }
    render(){
        return (
            <div className={styles.register}>
                <RegisterForm/>
            </div>
        )
    }
}