import React,{Component} from 'react'
import {List, Grid} from 'antd-mobile'


export default class HeaderSelector extends Component{
	
	constructor(props){
		super(props)
		this.headerList=[]
		for(let i=0;i<6;i++){
			this.headerList.push({text:`头像${i+1}`,icon:require(`../../assets/images/头像${i+1}.png`)})
		}
	}
	
	state={
		icon:null
	}
	
	handleClick=({text,icon})=>{
		this.props.handleChange('header',text)
		this.setState({icon})
	}
	
	render(){
		const {icon}=this.state
		const listheader=icon?(<div>已选择头像:<img src={icon} alt="头像" style={{width:'80px',height:'80px'}}/></div>):'请选择头像'
		return (<div>
					<List renderHeader={()=>listheader}></List>
					<Grid data={this.headerList} columnNum={3} onClick={this.handleClick}/>
				</div>)
	}
}