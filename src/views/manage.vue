<template>
	<div class="manage">
		
		<el-dropdown>
			<div class="top-header">
				<img :src="require('../assets/icon/www2.png')" alt=""><span @click.stop="loginOut">退出</span>
			</div>
			
		</el-dropdown>
		
		<div class="message">
			<p>您好，{{user}}!<span>欢迎使用社区管理系统</span></p>
		</div>
		
		<div class="functions">
			<div @click="$router.push({path: '/article'})">
				<i class="el-icon-copy-document"></i>
				<h1>公告</h1>
			</div>
			<div @click="$router.push({path: '/register'})">
				<i class="el-icon-edit"></i>
				<h1>登记</h1>
			</div>
			<div @click="$router.push({path: '/help'})">
				<i class="el-icon-first-aid-kit"></i>
				<h1>求助</h1>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Manage",
	data() {
		return {
			user:localStorage.getItem('username')
		}
	},
	methods: {
		loginOut(){
			// localStorage.removeItem('token')
			this.$router.push({path:'/login'})
		}
	}
}
</script>


<style lang="scss" scoped>
	*{
		margin: 0;
		padding: 0;
	}
.manage {
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: linear-gradient(45deg,#feac5e,#c779d0,#4bc0c8);
	/deep/ .el-dropdown{
		margin-top: 30px;
		margin-left: 70%;
		height: 50px;
		.top-header{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			img{
				margin-right: 30px;
				border-radius: 50%;
				height: 50px;
			}
			span{
				color: floralwhite;
				cursor: pointer;
				margin-left: 10px;
			}
		}
	}
	.message{
		width: 70%;
		margin: 0 auto;
		p{
			font-size: 1.6rem;
			color: #fff;
			text-align: left;
			span{
				margin-left: 10%;
				font-size: 1.3rem;
			}
		}
	}
	.functions{
		width: 75%;
		margin: -80px auto 0;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		div{
			cursor: pointer;
			width: 30%;
			margin: 3%;
			height: 40%;
			background-color: rgba(250,250,250,1);
			border-radius: 15px;
			box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);
			transition: all .5s;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			i{
				font-size: 6rem;
				margin-bottom: 20px;
			}
			/deep/ .el-icon-copy-document{
				color: #feac5e;
			}
			/deep/ .el-icon-first-aid-kit{
				color: #ac3232;
			}
			h1{
				color: #484848;
				font-size: 3rem;
				letter-spacing: 1em;
				margin-left: 1em;
			}
			&:hover{
				margin-top: -5px;
			}
		}
	}
}
</style>
