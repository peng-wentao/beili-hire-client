/*
登录的路由组件
*/

import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Button} from 'antd-mobile'
import Logo from '../../components/logo/logo.jsx'
import {login} from '../../redux/actions.js'



class Login extends Component{
	
	state={
		username:'', //用户名
		password:'', //密码
	}
	
	handlechange=(name,val)=>{
		this.setState({[name]:val})
	}
	
	login=()=>{
		this.props.login(this.state)
	}
	
	toregister=()=>{
		this.props.history.replace('/register')
	}
	
	render(){
		const {msg,redirectTo}=this.props.user
		if(redirectTo){
			return <Redirect to={redirectTo}/>
		}
		
		return(
		<div>
			<NavBar>北&nbsp;理&nbsp;直&nbsp;聘</NavBar>
			<Logo></Logo>
			{msg?<div className="error-msg">{msg}</div>:null}
			<WingBlank>
				<List>
					<WhiteSpace/>
					<InputItem placeholder="请输入用户名" onChange={val=>{this.handlechange('username',val)}}>用户名:</InputItem>
					<WhiteSpace/>
					<InputItem type="password" placeholder="请输入密码" onChange={val=>{this.handlechange('password',val)}}>密&nbsp;&nbsp;&nbsp;码</InputItem>
					<WhiteSpace/>
					<Button type="primary" onClick={this.login}>登录</Button>
					<WhiteSpace/>
					<Button onClick={this.toregister}>还没有有账户</Button>
					
				</List>
			</WingBlank>
		</div>
		)
	}
}

export default connect(
state=>({user:state.user}),
{login}
)(Login)