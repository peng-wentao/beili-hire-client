/*
个人中心路由容器组件
*/

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List,Button,Result,WhiteSpace,Modal} from 'antd-mobile'
import {resetUser} from '../../redux/actions.js'
import Cookies from 'js-cookie'

const Item=List.Item
const Brief=Item.Brief


class Personal extends Component{
	
	logout=()=>{
		const {resetUser} =this.props
		Modal.alert('退出','确认退出登录吗',
					[{text:'取消'},
					 {text:'确认',
					  onPress:()=>{
						  //干掉cookie的userid
						  Cookies.remove('userid')
						  //干掉redux管理的user
						  resetUser()
					  }}])
	}
	
	
	render(){
		const user=this.props.user
		return(
		<div style={{marginTop:50}}>
			<Result img={<img src={require(`../../assets/images/${user.header}.png`)} alt='header' style={{width:60}}/>}
			        title={user.username}
					message={user.company}/>
			<List renderHeader={()=>'相关信息'}>
				<Item>
					<Brief>{user.type==='laoban'?'招聘职位':'应聘职位'}:&nbsp;&nbsp;&nbsp;{user.post}</Brief>
					<Brief>{user.type==='laoban'?'职位要求':'个人介绍'}:&nbsp;&nbsp;&nbsp;{user.info}</Brief>
					<Brief>{user.type==='laoban'?'薪资待遇':'期望薪资'}:&nbsp;&nbsp;&nbsp;{user.salary}</Brief>
				</Item>
			</List>
			<WhiteSpace/>
			<Button type='warning' onClick={this.logout}>退出登录</Button>
		</div>
		)
	}
}

export default connect(
state=>({user:state.user}),
{resetUser}
)(Personal)