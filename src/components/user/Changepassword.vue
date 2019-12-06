<template>
	<div class="changepassword page">
		<span class="fanhui" @click="backone" style="display:inline-block;"><i class="el-icon-arrow-left"></i>返回</span>
		<h2 class="title" style="margin-top: 0;padding-top: 0;">修改密码</h2>
		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			<el-form-item label="旧密码：" prop="age">
				<el-input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" type="password" v-model="ruleForm2.age" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码：" prop="pass">
				<el-input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码：" prop="checkPass">
				<el-input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm2')" style='margin-top: 10px;'>保存</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
	import { axiosPostAPI, axiosGetAPI, axiosPutAPI } from "../../common/Axios";
	export default {
		data() {
			var checkAge = (rule, value, callback) => {
				if(value === "") {
					callback(new Error("旧密码不能为空"));
				} else {
					callback();
				}
			};

			var validatePass = (rule, value, callback) => {
				if(value === "") {
					callback(new Error("请输入密码"));
				} else if(value == this.ruleForm2.age) {
					callback(new Error("新密码不能与旧密码一致"));
				} else {
					if(this.ruleForm2.checkPass !== "") {
						this.$refs.ruleForm2.validateField("checkPass");
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === "") {
					callback(new Error("请再次输入密码"));
				} else if(value !== this.ruleForm2.pass) {
					callback(new Error("两次输入密码不一致"));
				} else {
					callback();
				}
			};
			return {
				ruleForm2: {
					pass: "",
					checkPass: "",
					age: ""
				},
				rules2: {
					pass: [{
						validator: validatePass,
						trigger: "blur"
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: "blur"
					}],
					age: [{
						validator: checkAge,
						trigger: "blur"
					}]
				},
				word: {
					password: "",
					newPassword: ""
				}
			};
		},
		methods: {
			//返回
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						this.word.password = this.ruleForm2.age;
						this.word.newPassword = this.ruleForm2.pass;
						var url = "/apis/users/" + this.$route.query.userId + "/password";
						axiosPutAPI(url, this.word).then(res => {
							this.$message({
								showClose: true,
								message: '修改成功',
								type: 'success',
								duration: 3000
							});

							window.history.back();
						});
					} else {
						return false;
					}

				});
			},
			backone() {
				window.history.back();
			}
		}
	};
</script>
<style>
	.changepassword .el-button {
		padding: 12px 40px;
	}
	
	.changepassword .el-form-item {
		margin-bottom: 12px;
	}
</style>