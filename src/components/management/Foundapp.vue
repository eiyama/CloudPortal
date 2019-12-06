<template>
	<div class="foundapp page">

		<p class="fanhui" @click="fanhuis"><i class="el-icon-arrow-left">返回</i></p>

		<h2 class="title" style="padding-top: 0;">创建应用</h2>

		<div class="">

			<el-form ref="postdata" label-width="100px" class="demo-ruleForm" :rules="rules2" :model="postdata">

				<el-form-item label="拥有者:">

					<el-select v-model="postdata.ownerUserId" filterable placeholder="请选择拥有者">

						<el-option v-for="item in options" :key="item.id" :label="item.userName" :value="item.id">

						</el-option>

					</el-select>

				</el-form-item>

				<el-form-item label="服务版本:">

					<el-radio v-model="postdata.version" label="DFVersion">V1</el-radio>

					<el-radio v-model="postdata.version" label="SaasVersion">V2</el-radio>
					<el-tooltip placement="right" effect="light">
						<div slot="content" style="width: 320px;">提供接口服务的业务系统版本。V1表示易龙车险服务平台，V2表示邦德车险云平台。</div>
						<i class="el-icon-question"></i>
					</el-tooltip>

				</el-form-item>

				<el-form-item label="服务地址:" prop="serviceHost">

					<el-input type="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="postdata.serviceHost" auto-complete="off"></el-input>
					<!--<el-input type="text"  auto-complete="off" v-model='postdata.serviceHost'></el-input>-->

					<el-tooltip placement="right" effect="light">
						<div slot="content" style="width: 320px;">访问业务系统地址，包含且只需协议和域名部分。与服务版本匹配，否则应用无法使用。如http://demo.bandins.com/</div>

						<i class="el-icon-question" style="top: 0;"></i>
					</el-tooltip>
				</el-form-item>

				<el-form-item label="授权类型:">

					<el-radio v-model="postdata.authMode" label="SingleUserMode">单用户</el-radio>

					<el-radio v-model="postdata.authMode" label="MultiUserMode">多用户</el-radio>
					<el-tooltip placement="right" effect="light">
						<div slot="content" style="width: 320px;">“单用户”表示应用绑定一个指定的业务账号，使用应用时默认使用绑定账号登陆业务系统去操作业务，无需登陆业务系统；“多用户”表示应用支持多账号登陆业务系统，操作业务前，需要先使用业务账号登陆业务系统。</div>

						<i class="el-icon-question"></i>
					</el-tooltip>

				</el-form-item>

				<el-form-item label="应用功能:">

					<el-checkbox v-model="postdata.enableH5Feature">H5出单客户端</el-checkbox><br/>

					<el-checkbox v-model="postdata.enableApiFeature">API接口</el-checkbox>

					<!--<span>收起<i class="el-icon-arrow-up"></i> </span>
	
		
	
							<el-table
	
		
	
						    :data="tableData" 
	
		
	
						    stripe
	
		
	
						    style="width: 90%;height: 100px;">
	
		
	
							    <el-table-column
	
		
	
							      prop="date"
	
		
	
							      label="功能编号"
	
		
	
							      width="252" heigth='20'>
	
		
	
							    </el-table-column>
	
		
	
							    <el-table-column
	
		
	
							      prop="name"
	
		
	
							      label="功能"
	
		
	
							      width="252" heigth='20'>
	
		
	
							    </el-table-column>
	
		
	
							    <el-table-column
	
		
	
							      prop="address" 
	
		
	
							      label="开放"
	
		
	
							      width='252' heigth='20'>
	
		
	
							      		<template slot-scope="scope">
	
		
	
									        <el-switch>
	
		
	
											
	
		
	
											</el-switch>
</template>
				    	</el-table-column>
			  		</el-table>	-->
				</el-form-item>
				<p class="xian"></p>
				<el-form-item>
					<el-button type="primary" @click="setapp('postdata')">创建</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import axios from "axios";

	import { axiosPostAPI, axiosGetAPI } from "../../common/Axios";
	export default {

		data() {

			var validatePass = (rule, value, callback) => {
				if(value === "") {
					callback(new Error("请输入服务地址"));
				}

				var strRegex = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;

				var re = new RegExp(strRegex);

				if(re.test(value)) {
					callback();
				} else {
					callback(new Error("请输入正确服务地址"));
					return false
				};
			}
			return {
				rules2: {
					serviceHost: [{
						validator: validatePass,

						trigger: "blur"
					}]
				},

				color1: "#0070D3",
				weiji: false,

				radio: "1",
				options: [],
				id: "",
				tableData: [],

				postdata: {
					ownerUserId: "",

					version: "DFVersion",

					serviceHost: "",

					enableApiFeature: true,

					enableH5Feature: true,

					authMode: "SingleUserMode"
				}
			};
		},

		created() {
			var url = "/apis/users?limit=3000";

			axiosGetAPI(url).then(res => {
				this.options = res.result;
			});
		},

		methods: {

			setapp: function(formName) {
				if(this.postdata.ownerUserId == "") {
					//      this.$alert(
					//        '<p style="font-size:16px;"><span style="color:#409EFF" class="el-icon-circle-close"></span>请选择拥有者</p>',
					//        {
					//          dangerouslyUseHTMLString: true
					//        }
					//      );
					this.$message.error({
						showClose: true,
						message: '请选择拥有者',
						duration: 3000
					});

					return false;
				}

				if(
					this.postdata.enableApiFeature == "" &&
					this.postdata.enableH5Feature == ""
				) {
					this.$message({
						showClose: true,
						message: '请选择应用功能',
						type: 'error',
						duration: 3000
					});

					return false;
				}

				this.$refs[formName].validate(valid => {
					if(valid) {
						let url = "/apis/apps";
						axiosPostAPI(url, this.postdata).then(res => {
							this.$message({
								showClose: true,
								message: '创建成功',
								type: 'success',
								duration: 3000
							});
							this.$router.push({
								path: "/main/manage"
							});

							this.postdata.ownerUserId = "";

							this.postdata.serviceHost = "";

							this.postdata.serviceVersion = "V1";

							this.postdata.enableApiFeature = "true";

							this.postdata.enableH5Feature = "true";

							this.postdata.authMode = "SingleUserMode";
						});
					} else {
						return false;
					};
				});

			},

			fanhuis: function() {
				window.history.back();
			}
		}
	};
</script>

<style scoped>
	.xian {
		width: 96%;
		height: 1px;
		background: #d9dde7;
		margin-bottom: 20px;
	}
	
	.foundapp .title {
		margin: 0;
	}
	
	.foundapp .establish {
		font-size: 18px;
	}
	
	.foundapp .el-button {
		padding: 12px 45px;
	}
</style>