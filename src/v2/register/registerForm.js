import React from "react";
import { Form, Input, Button, Steps} from 'antd';
import cloneDeep from 'lodash/cloneDeep'
import {postSendEmail} from './request'

const Step = Steps.Step;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

export default class RegisterForm extends React.PureComponent{
    state={
        current:0,
        email:{
            value:'',
            validateStatus:'',
            help:''
        },
        code:{
            value:'',
            validateStatus:'',
            help:''
        },
    }
    UNSAFE_componentWillMount=async()=>{
        const res = await postSendEmail({
            email:123
        })
        console.log(res)
    }
    getStep0=()=>{
        const onChangeInput=(e)=>{
            const value = e.target.value
            const isTrue = (/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).test(value)
            this.setState({email:{
                value:value,
                validateStatus:isTrue ? '' : 'error',
                help:isTrue ? '' : '请输入正确的邮箱'
            }})
        }
        const changeButton =async ()=>{
            const cloneEmail = cloneDeep(this.state.email)
            if(cloneEmail.help){return}
            if(!cloneEmail.value){
                cloneEmail.validateStatus = 'error'
                cloneEmail.help = '邮箱不能为空'
                this.setState({email:cloneEmail})
                return
            }
            const res = await postSendEmail({
                email:cloneEmail.value
            })
            if(!res.state){
                this.setState({current:1})
            }
        }
        return this.inputEmailCode({
            title:'请输入邮箱，我们将通过邮箱发送验证码',
            label:'邮箱',
            datas:this.state.email,
            onChangeInput:onChangeInput,
            changeButton:changeButton,
        })
    }
    getStep1 = ()=>{
        const onChangeInput = (e) =>{
            console.log(e.target.value)
        }
        const changeButton = () =>{
            console.log(0)
        }
        return this.inputEmailCode({
            title:`验证码已发送到${this.state.email.value},请查收验证码`,
            label:'验证码',
            datas:this.state.code,
            onChangeInput:onChangeInput,
            changeButton:changeButton,
        })
    }
    getCurrentStep=()=>{
        const {current} = this.state
        if(current===0){
            return this.getStep0() 
        }
        if(current===1){
            return this.getStep1()
        }
    }
    inputEmailCode=({title,label,datas,onChangeInput,changeButton})=>{
        return (
            <Form key={label}>
                <p className="registerFormTil">{title}</p>
                <FormItem
                    {...formItemLayout}
                    label={label}
                    hasFeedback
                    validateStatus={datas.validateStatus}
                    help={datas.help}
                >
                <Input 
                    placeholder={label}
                    onChange={onChangeInput}
                />
                </FormItem>
                <Button 
                    type="primary"
                    onClick={changeButton}
                    className="registerFormConfirm"
                >确定</Button>
            </Form>
        )
    }
    render(){
        const {current} = this.state
        return <div className="registerForm">
            <p className="registerFormTitle">注册</p>
            <Steps current={current}>
                <Step title="输入邮箱" />
                <Step title="邮箱验证" />
                <Step title="设置密码" />
            </Steps>
            <div>
                <this.getCurrentStep/>
            </div>
    </div>
    }
}