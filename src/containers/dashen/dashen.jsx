/*
大神主界面组件
*/

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getRedirectTo} from '../../util/index.js'
import {getUserList} from '../../redux/actions.js'
import UserList from '../../components/user-list/user-list.jsx'



class Dashen extends Component{
	
	componentWillMount(){
		this.props.getUserList('dashen')
	}
	
	
	render(){
		//如果没有完善信息则重定向到完善信息页面
		const user=this.props.user
		if(!user.header){
			let path=getRedirectTo(user.type,user.header)
			 return <Redirect to={path}/>
		}
		if(user.type==='dashen'){
			return <Redirect to='/dashen'/>
		}

		
		return(
		<div>
			<UserList userList={this.props.userList}/>
		</div>
		)
	}
}

export default connect(
state=>({user:state.user,userList:state.userList}),
{getUserList}
)(Dashen)