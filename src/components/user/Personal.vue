<template>
	<div class="personal page">

		<span class="fanhui" @click="backone" style="display: inline-block;"><i class="el-icon-arrow-left"></i>返回</span>

		<h2 class="title" style="margin-top: 0;padding-top:0;">账号信息<br /></h2>

		<el-form :model="result" :rules="rules2" ref="result" label-width="100px" class="demo-ruleForm">

			<!--账号名称-->

			<el-form-item label="账号名称" prop="userName" :rules="[
	
			      { required: true, message: '账号不能为空'},
			    ]">

				<el-input type="text" v-if="isAdministrator==false" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="result.userName" auto-complete="off" readonly="readonly"></el-input>

				<el-input type="text" v-if="isAdministrator" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="result.userName" auto-complete="off"></el-input>

			</el-form-item>

			<!--密码-->

			<el-form-item label="密码">

				<div class="btn-one">

					<span>**********</span><span @click="changepass" class="fblue" style="cursor: pointer;font-size: 14px;margin-left: 40px;">修改密码</span>

				</div>

			</el-form-item>

			<!--手机-->

			<el-form-item label="联系方式" prop="mobile">

				<el-input type="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="result.mobile" auto-complete="off"></el-input>

			</el-form-item>

			<!--电子邮件-->

			<el-form-item label="电子邮箱" prop="email" :rules="[
	
			       { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
	
			    ]">

				<el-input type="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="result.email" auto-complete="off"></el-input>

			</el-form-item>

			<!--公司名称-->

			<el-form-item label="公司名称" prop="company" :rules="[
	
			      { required: true, message: '公司名称不能为空'}
	
			    ]">

				<el-input type="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="result.company" auto-complete="off"></el-input>

			</el-form-item>

			<!--状态-->

			<el-form-item label="状态" prop='status' :rules="[
	
			  		{required: true, message: '状态不能为空'}
	
			  	]">

				<el-select v-model="result.status" placeholder="请选择" v-if="isAdministrator">

					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">

					</el-option>

				</el-select>
				<span v-if="isAdministrator==false" style="color: #323C4D;">{{display}}<span  v-if="result.status=='Trial'">(剩余{{result.trialDay}})天</span></span>

			</el-form-item>

			<!--试用天数-->

			<el-form-item label="剩余试用天数" prop="trialDay" v-if="result.status=='Trial'&&isAdministrator">

				<el-input type="number" v-if="isAdministrator" v-model.number="result.trialDay" auto-complete="off"></el-input>

				<!-- <el-input type="number" v-if="isAdministrator==false" readonly v-model="result.trialDay" auto-complete="off"></el-input> -->

				<span class="tian">天</span>

			</el-form-item>

			<p class="one"></p>

			<el-form-item>

				<el-button type="primary" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" @click="submitForm('result')">保存</el-button>

			</el-form-item>

		</el-form>

	</div>
</template>

<script>
	import axios from "axios";

	import {

		axiosPostAPI,

		axiosGetAPI,

		axiosPutAPI

	} from "../../common/Axios";

	export default {

		data() {

			var validatePass = (rule, value, callback) => {

				if(value === "") {

					//					callback(new Error("联系方式不能为空"));
					callback();

				}

				//				var strRegex = /^1[358][0-9]{9}$/;

				var strRegex = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
				var re = new RegExp(strRegex);

				if(re.test(value)) {

					callback();

				} else {

					callback(new Error("联系方式格式不正确,固话需加区号和符号‘-’"));

					return false;

				}

			};

			return {

				rules2: { 

					mobile: [{

						validator: validatePass,

						trigger: "blur"

					}]

				},

				numberValidateForm: {

					age: ""

				},

				options: [{

						value: "Trial",

						label: "试用中"

					},

					{

						value: "Valid",

						label: "已生效"

					},

					{

						value: "Invalid",

						label: "已失效"

					}

				],

				value: "",

				result: {

					userName: "",

					email: "",

					mobile: "",

					company: "",

					trialDay: "",

					status: ""

				},

				userId: "",

				display: "",

				isAdministrator: ""

			};

		},

		created() {

			var states = JSON.parse(localStorage.getItem("registeruserId"));

			this.userId = states;
			const loading = this.$loading({
				// lock: true,
				text: '加载中',
				background: 'rgba(255,255,255,0.5)'
			})
			var url = "/apis/users/" + states;
			axiosGetAPI(url).then(res => {
				loading.close()
				this.result.userName = res.result.userName;

				this.result.mobile = res.result.mobile;

				this.result.email = res.result.email;

				this.result.company = res.result.company;

				this.result.trialDay = res.result.trialDay;

				this.result.status = res.result.status.text;

				this.display = res.result.status.display;

			});

			this.isAdministrator = JSON.parse(localStorage.getItem("isAdministrator"));

		},

		methods: {

			submitForm(formName) {

				this.$refs[formName].validate(valid => {

					if(valid) {

						let url = "/apis/users/" + this.userId;

						axiosPutAPI(url, this.result).then(res => {

							if(res) {
								this.$message({
									showClose: true,
									message: '保存成功',
									type: 'success',
									duration: 3000
								});
								var obj = {}
								obj.userName = this.result.userName;
								obj.status = this.result.status;
								if(this.$route.params.userId) {
									this.$router.push({
										name: "Usecontrol"
									});
								} else {
									this.$router.push({
										path: "/main/usercenter",
										query: obj
									});

								}

							}

						});

					} else {

						return false;

					}

				})
			},

			backone() {

				window.history.back();

			},

			changepass() {

				var obj = {};

				obj.userId = this.userId;

				this.$router.push({

					path: "/main/changepassword",

					query: obj

				});
			}

		}

	};
</script>

<style>
	.personal .one {
		height: 1px;
		background: #eeeeee;
		width: 100%;
		margin-bottom: 20px;
	}
	
	.personal .el-form-item {
		margin-bottom: 10px;
	}
	
	.personal .tian {
		position: absolute;
		top: 0;
		left: 308px;
		color: #323c4d;
	}
	
	.personal strong {
		font-size: 18px;
	}
	
	.personal .el-form-item__label:before {
		display: none;
	}
	.personal .el-form-item{height: 40px;}
	.personal .el-form-item__content{height: 40px;}
</style>