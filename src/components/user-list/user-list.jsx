//显示指定类型用户列表的ui组件
import React,{Component} from 'react'
import {WingBlank,Card,WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

const Header=Card.Header
const Body=Card.Body

class UserList extends Component{
	
	render(){
		const userList = this.props.userList
		return (<WingBlank style={{marginBottom:50,marginTop:50}}>
					<QueueAnim>
					{userList.map(user=>(
					   <div key={user._id}>
							<WhiteSpace/>
							<Card onClick={()=>{this.props.history.push(`/chat/${user._id}`)}}>
								<Header thumb={user.header?require(`../../assets/images/${user.header}.png`):null} extra={user.username}/>
								<Body>
									<div>{user.type==='dashen'?`应聘职位：${user.post}`:`招聘职位：${user.post}`}</div>
									{user.company?<div>公&nbsp;&nbsp;&nbsp;&nbsp;司:&nbsp;&nbsp;&nbsp;{user.company}</div>:null}
									<div>{user.type==='dashen'?`期望薪资：${user.salary}`:`薪资待遇：${user.salary}`}</div>
									<div>{user.type==='dashen'?`个人介绍：${user.info}`:`职位要求：${user.info}`}</div>
									
								</Body>
							</Card>
					   </div>
					))}
					</QueueAnim>
				</WingBlank>)		
	}
}  

export default withRouter(UserList)