/* 
 通过用户类型和头像返回对应的路由路径
 */
export function getRedirectTo(type,header){
	let path=''
	if(type==='laoban'){
		path='/laoban'
	}else{
		path='/dashen'
	}
	if(!header){
		path=path+'info'
	}
	return path
}