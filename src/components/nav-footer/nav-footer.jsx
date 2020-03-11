/*
底部路由路由组件
*/

import React, {Component} from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom' //此函数用于解决非路由组件要用到路由组件api的问题

const Item=TabBar.Item


class NavFooter extends Component{
	
	
	render(){
		const navList=this.props.navList.filter(nav=>!nav.hide)
		const path=this.props.location.pathname

		return(
			<TabBar>
				{navList.map(
								(nav)=>(<Item key={nav.path}
											  badge={nav.path==='/message'?this.props.unReadCount:0}
											  title={nav.text}
											  icon={{uri:require(`./icons/${nav.icon}.png`)}}
											  selectedIcon={{uri:require(`./icons/${nav.icon}-active.png`)}}
											  selected={nav.path===path}
											  onPress={()=>{this.props.history.replace(nav.path)}}/>)
				)}
			</TabBar>
		)
	}
}

export default withRouter(NavFooter)