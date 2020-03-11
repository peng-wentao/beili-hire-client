/*
注册路由组件
*/

import React, {Component} from 'react'
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import Logo from '../../components/logo/logo.jsx'
import {connect} from 'react-redux'
import {register} from '../../redux/actions.js'

const ListItem=List.Item

class Register extends Component{
	
	state={
		username:'', //用户名
		password:'', //密码
		password2:'', //确认密码
		type:'laoban'  //用户类型
	}
	
	handlechange=(name,val)=>{
		this.setState({[name]:val})
	}
	
	register=()=>{
		this.props.register(this.state)
	}
	
	tologin=()=>{
		this.props.history.replace('/login')
	}
	
	render(){
		const type= this.state.type
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
					<InputItem type="password" placeholder="确认密码" onChange={val=>{this.handlechange('password2',val)}}>确认密码</InputItem>
					<WhiteSpace/>
					<ListItem>
						<span>用户类型:</span>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Radio checked={type==='dashen'} onClick={()=>{this.handlechange('type','dashen')}}>大神</Radio>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Radio checked={type==='laoban'} onClick={()=>{this.handlechange('type','laoban')}}>老板</Radio>
					</ListItem>
					<WhiteSpace/>
					<Button type="primary" onClick={this.register}>注册</Button>
					<WhiteSpace/>
					<Button onClick={this.tologin}>已有账户</Button>
					
				</List>
			</WingBlank>
		</div>
		)
	}
}

export default connect(
	state=>({user:state.user}),
	{register}
)(Register)