<template>
	<div class="login">
		<div class="inner-box">
			<el-form :model="form" :rules="rules" ref="form" >
				<p>用户登录</p>
				<el-form-item prop="username">
					<el-input prefix-icon="el-icon-user" autocomplete="false" v-model="form.username" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input prefix-icon="el-icon-lock" type="password" autocomplete="false" v-model="form.password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<div class="button">
					<div class="submit-login" @click="onLogin">登录</div>
					<div class="submit-login" @click="showDialog = true">注册</div>
				</div>
			</el-form>
			<div class="log-right">
				<i class="el-icon-user"></i>
				<p>社区疫情管理中心</p>
			</div>
		</div>
		
		<el-dialog
			title="用户注册"
			:visible.sync="showDialog"
			width="40%"
			:before-close="handleClose">
			<div class="reset">
				<el-form status-icon :label-position="'right'"  label-width="100px">
					<el-form-item label="用户名:">
						<el-input type="text" placeholder="请输入用户名" v-model="registered.username"></el-input>
					</el-form-item>
					<el-form-item label="真实姓名:">
						<el-input type="text" placeholder="请输入真实姓名" v-model="registered.real_name"></el-input>
					</el-form-item>
					<el-form-item label="密码:">
						<el-input type="password" placeholder="请输入密码" v-model="registered.password"></el-input>
					</el-form-item>
					<el-form-item label="选择所在楼栋:">
						<el-cascader
							v-model="values"
							:options="buildMessage"
							:props="{ expandTrigger: 'hover' }"></el-cascader>
					</el-form-item>
					
					<el-form-item>
						<el-button type="primary" @click="logOn">注册</el-button>
						<el-button @click="showDialog = false">取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import models from "../../interface/Models.js";
	
	export default {
		name: "Login",
		data() {
			return {
				values: [],
				showDialog:false,//注册表单模态框
				form: {//登录表单
					username: '',
					password: ''
				},
				buildMessage:[],//楼栋信息
				registered:{
					address: "",
					password: "",
					real_name: "",
					username: ""
				},
				rules: {
					username: [
						{ required: true, message: "请输入用户名", trigger: "change" }
					],
					password: [
						{ required: true, message: "请输入密码", trigger: "change" }
					]
				}
			}
		},
		mounted() {
			this.getRegisterMessage();
		},
		methods: {
			//点击登录
			onLogin(){
				// this.$router.push("/");//暂时可以登录，等接口做好后删除这行
				
				// this.$refs.form.validate((valid) => {
				// 	if (valid) {
						models.getModel("login").post(this.form).then(info=>{
							if(info.data.code == 200){
								localStorage.setItem("personId", info.data.data.id);
								localStorage.setItem("username", info.data.data.username);
								localStorage.setItem("realName", info.data.data.realName);
								localStorage.setItem("personAddress", info.data.data.address);
								this.$router.push("/manage");
							}else{
								this.$message.error('账户密码错误')
							}
						})
				/*	} else {
						return false;
					}*/
				// })
			},
			//获取注册信息
			getRegisterMessage(){
				models.getModel("userAddress").get().then(info=>{
					if(info.data.code == 200){
						this.buildMessage = info.data.data
						this.changeKey(this.buildMessage)
						for(let i in this.buildMessage){
							let obj = this.buildMessage[i]
							for(let j in obj){
								if(typeof obj[j] == 'object'){
									this.changeKey(obj[j])
								}
							}
						}
					}else{
						return
					}
				})
			},
			//点击注册
			logOn(){
				this.registered.address = this.values[1];
				models.getModel("logon").post(this.registered).then(info=>{
					if(info.data.code == 200){
						this.showDialog = false
					}else{
						this.$message.error('账户密码错误')
					}
				})
			},
			changeKey(array){
				let keyMap = {
					"id" : "value",
					"address" : "label"
				};
				for(let i = 0;i < array.length;i++){
					let obj = array[i];
					for(let key in obj){
						let newKey = keyMap[key];
						if(newKey){
							obj[newKey] = obj[key];
							delete obj[key];
						}
					}
				}
			},
			//关闭注册模态框
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(()=> {
						done();
					})
					.catch(() => {
						return
					});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		width: 100%;
		height: 100%;
		background: linear-gradient(45deg,#feac5e,#c779d0,#4bc0c8);
		display: flex;
		justify-content: center;
		align-items: center;
		.inner-box{
			width: 60%;
			height: 50%;
			display: flex;
			justify-content: center;
			align-items: stretch;
			box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);
			border-radius: 20px;
			/deep/ .el-form {
				border-radius: 20px 0 0 20px;
				width: 60%;
				height: 100%;
				background: linear-gradient(to right,#feac5e,rgba(199,121,208,.7));
				background: rgba(199,121,208,1);
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				p{
					width: 60%;
					text-align: left;
					margin-bottom: 30px;
					letter-spacing: 2px;
					font-size: 24px;
					color: #fff;
				}
				.el-form-item{
					width: 60%;
					margin-bottom: 5%;
				}
				.button{
					width: 60%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.submit-login {
						letter-spacing: 10px;
						font-weight: 700;
						cursor: pointer;
						border-radius: 15px;
						font-size: 20px;
						padding: 10px 42px 10px 50px;
						color: rgba(180,121,208,1);
						background: rgba(255,255,255,1);
						transition: all 1s;
						&:hover{
							color: floralwhite;
							background: rgba(199,121,208,.2);
							box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
						}
					}
				}
				
			}
		}
		.log-right{
			width: 40%;
			height: 100%;
			background: rgba(199,121,208,.3);
			border-radius:  0 20px 20px 0 ;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-weight: 700;
			i{
				font-size: 200px;
				color: #ffffff;
			}
			p{
				letter-spacing: 2px;
				margin-top: 30px;
				font-size: 34px;
				color: #ffffff;
			}
		}
		/deep/ .el-dialog{
			width: 100%;
			border-radius: 15px;
			/*background: linear-gradient(to right,#feac5e,rgba(199,121,208,.7));*/
			.reset{
				width: 80%;
				height: 80%;
				margin-left: 10%;
				/*border: 1px solid #000;*/
				/deep/ .el-form {
					border-radius: 20px 0 0 20px;
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.el-form-item{
						width: 100%;
						margin-bottom: 5%;
						.el-input,.el-cascader{
							width: 100%;
						}
					}
				}
			}
		}
	}
</style>
