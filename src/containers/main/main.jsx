import React, {Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'
import {getUser} from '../../redux/actions.js'
import {getRedirectTo} from '../../util/index.js'
import LaobanInfo from '../laoban-info/laoban-info.jsx'
import DashenInfo from '../dashen-info/dashen-info.jsx'
import Laoban from '../laoban/laoban.jsx'
import Dashen from '../dashen/dashen.jsx'
import Message from '../message/message.jsx'
import Personal from '../personal/personal.jsx'
import NotFound from '../../components/not-found/not-found.jsx'
import NavFooter from '../../components/nav-footer/nav-footer.jsx'
import Chat from '../chat/chat.jsx'

/*
主界面路由组件
*/
class Main extends Component{
	
	navList=[//包含导航组件相关的信息数据
		{
			path:'/laoban',
			component:Laoban,
			title:'大神列表',
			icon:'list',
			text:'大神',
			hide:false
		},
		{
			path:'/dashen',
			component:Dashen,
			title:'老板列表',
			icon:'list',
			text:'老板',
			hide:false
		},
		{
			path:'/message',
			component:Message,
			title:'消息列表',
			icon:'message',
			text:'消息',
			hide:false
		},
		{
			path:'/personal',
			component:Personal,
			title:'个人中心',
			icon:'personal',
			text:'个人',
			hide:false
		}
	]
	
	
	componentDidMount(){
		//
		const userid=Cookies.get('userid')
		const {_id}=this.props.user
		if(userid&&!_id){
			 this.props.getUser()
		}
		
	}

	render(){
		//读取cookie中的userid
		const userid=Cookies.get('userid')		
		if(!userid){//如果没有，重定向到login页面
			return <Redirect to='/login'/>
		}
		//如果有，则读取redux中user的状态
		const user=this.props.user
		//读取user里的_id
		const {_id}=user
		//如果没有_id,暂时不做显示，等待ajax请求得到数据
		if(!_id){
			return null
		}else{
			//如果有，根据请求路径显示页面
			//如果请求根路径，则根据type值计算得到路径，然后重定向到此路径
			let path=this.props.location.pathname
			if(path==='/'){
				path=getRedirectTo(user.type,user.header)
				return <Redirect to={path}/>
			}
		}
			const path=this.props.location.pathname
			const currentNav=this.navList.find(nav=>nav.path===path)
			
			if(currentNav){//隐藏非当前用户类型的路由导航
				if(user.type==='laoban'){
					this.navList[1].hide=true //隐藏/dashen
				}else{
					this.navList[0].hide=true} //隐藏/laoban
			}
			
		return(
		<div>
			{currentNav?<NavBar className='fix-header'>{currentNav.title}</NavBar>:null}
			<Switch>
				<Route path='/laobaninfo' component={LaobanInfo}/>
				<Route path='/dasheninfo' component={DashenInfo}/>
				<Route path='/laoban' component={Dashen}/>
				<Route path='/dashen' component={Laoban}/>
				<Route path='/message' component={Message}/>
				<Route path='/personal' component={Personal}/>
				<Route path='/chat/:userid' component={Chat}/>
				<Route component={NotFound}/>
			</Switch>
			{currentNav?<NavFooter navList={this.navList} unReadCount={this.props.unReadCount}/>:null}
		</div>
		)
	}
}

export default connect(
state=>({user:state.user,unReadCount:state.chat.unReadCount}),
{getUser}
)(Main)