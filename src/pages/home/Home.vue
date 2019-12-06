<template>
	<div class="home">
		<div class="main">
			<div class="logone">
				<h2>轻松构建车险SaaS应用</h2>
				<span style="color: #FFFFFF;font-size: 24px;">稳定-可靠-简单-丰富</span>
			</div>
			<div class="landing">
				<h2>登录开发者平台</h2>
				<p>welcome</p>

				<el-form :model="postdata" ref="postdata" class="demo-ruleForm" auto-complete="off">
					<el-form-item prop="userName" :rules="[{ required: true, message: '账号不能为空'}]">
						<el-input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" @keyup.enter.native="submitForm('postdata')" v-model="postdata.userName" placeholder="输入账号" type='text' auto-complete="off"></el-input>
					</el-form-item> 

					<el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空'}]">
						<el-input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" @keyup.enter.native="submitForm('postdata')" v-model="postdata.password" placeholder="输入密码" type='password' auto-complete="off"></el-input>
					</el-form-item>
					
					<el-button type="primary" @click="submitForm('postdata')">登录</el-button>
					<img src="../../../static/images/login_account_default.png" class="imgone" />
					<img src="../../../static/images/login_password_default.png" class="imgtwo" />
				</el-form>
			</div>

		</div>
		<div class="below">
			<div class="maincc">

				<ul>
					<li>
						<span>简单快速创建应用</span><img src="../../../static/images/jd.png" />
						<p>提交需求，管理员创建应用，开发者激活后，分分钟即可使用</p>
					</li>
					<li>
						<span>功能自由选择</span><img src="../../../static/images/gn.png" />
						<p>多种服务版本可选，H5、API功能自由选配</p>
					</li>
					<li>
						<span>便捷的应用管理</span><img src="../../../static/images/bj.png" />
						<p>应用维护方便，并监控和分析应用的使用情况，予以决策参考</p>
					</li>
					<li>
						<span>数据安全可靠</span><img src="../../../static/images/sj.png" />
						<p>接口消息加密，签名检验请求，防止篡改；数据库关键字段加密及审计</p>
					</li>

				</ul>

			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { axiosPostAPI } from "../../common/Axios.js";
	export default {
		data() {
			return {
				postdata: {
					userName: "",
					password: ""
				}
			};
		},
		created() { 
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {

						var len = $('.el-message').length;
						if(len == 1) {
							this.$message.closeAll()
							return false;
						}
						axiosPostAPI("/apis/token", this.postdata).then(res => {

							const loading = this.$loading({
								lock: true,
								text: '拼命加载中',
//								spinner: 'el-icon-loading',
								background: 'rgba(255,255,255,0.5)'
							});
							var expiresIn = res.result.expiresIn;
							var token = res.result.token;
							var userId = res.result.userId;
							var obj = {
								token: token,
								expiresIn: expiresIn,
								userId: userId
							};
							localStorage.setItem("register", JSON.stringify(obj));
							localStorage.setItem("registeruserId", JSON.stringify(obj.userId));
//							this.$store.dispatch("changeLocation", {
//								token: token,
//								expiresIn: expiresIn,
//								userId: userId
//							});
							window.location.reload();
							this.$router.push({
								path: "/main",
								query: {
									name: "id",
									num: obj.userId
								}
							});
							loading.close();
							this.postdata.password='';	
						});
					} else {
						return false;
					}
				});
			}
		}
	};
</script>

<style scoped>
	.home .main {
		position: relative;
	}
	
	.home .landing {
		position: absolute;
		width: 340px;
		height: 360px;
		background: #ffffff;
		top: 80px;
		right: 0;
		border-radius: 6px;
		text-align: center;
	}
	
	.home .below {
		position: absolute;
		width: 100%;
		height: 160px;
		background: red;
		top: 780px;
		background: #FFFFFF;
	}
	
	.home h2 {
		color: #323c4d;
		font-size: 22px;
		line-height: 30px;
		font-weight: normal;
		margin-top: 46px;
	}
	
	.home p {
		opacity: 0.51;
		font-style: italic;
		font-size: 18px;
		color: #757e97;
		letter-spacing: 0;
		margin: 0px 0px 26px 0px;
	}
	
	.home .imgone {
		position: absolute;
		left: 64px;
		top: 138px;
	}
	
	.home .imgtwo {
		position: absolute;
		left: 64px;
		top: 197px;
	}
	
	.home .demo-ruleForm {
		margin: 0 auto;
		width: 270px;
	}
	
	.home .logone {
		position: absolute;
		left: 0;
		top: 38px;
	}
	
	.home .logone h2 {
		font-family: PingFangSC-Medium;
		font-weight: 400;
		font-size: 50px;
		color: #FFFFFF;
		letter-spacing: 0;
		line-height: 62px;
		margin-bottom: 16px;
	}
	
	.home .logone span {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #FFFFFF;
		letter-spacing: 0;
		font-style: normal;
	}
	
	.home .below .maincc ul {}
	
	.home .below li {
		width: 224px;
		padding-right: 100px;
		margin-top: 40px;
		border-bottom: 1px solid #f6f6f6;
	}
	
	.home .below li:nth-of-type(4) {
		padding-right: 0;
	}
	
	.home .below li span {
		font-size: 20px;
		color: #202020;
		font-weight: normal;
		line-height: 28px;
		margin-bottom: 10px;
		display: inline-block;
	}
	
	.home .below li p {
		font-style: normal;
		font-size: 14px;
		line-height: 20px;
	}
	/*.home .below li img{transform: translate(35px,6px )}*/
	
	.home .below li img {
		float: right;
	}
</style>