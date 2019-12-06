<template>
	<div class="detail page">
		<span class="fanhui" @click="fanhuis" style="display: inline-block;"><span class="el-icon-arrow-left"></span>返回</span>
		<p class="title" style="padding-top: 0;">应用详情</p>
		<div class="yiji">

			<el-form ref="postdata" label-width="100px" class="demo-ruleForm" :rules="rules2" :model="postdata" v-loading="loading2" element-loading-text="拼命加载中" element-loading-background="rgba(255,255,255,0.5)">
				<div class="firstones">
					<el-form-item label="AppID:">

						<span style="color: #323C4D">{{nowdata.appId}}</span>
						<el-button v-clipboard:copy="nowdata.appId" v-clipboard:success="onCopy" v-clipboard:error="onError" style='margin-left: 20px;' class='quxiao'>复制</el-button>
						<el-tooltip content="app应用的唯一识别码，开发者应用H5或接口功能时使用。" placement="right" effect="light">
							<i class="el-icon-question"></i>
						</el-tooltip>
					</el-form-item>
				</div>
				<el-form-item label="密钥(AppSecret)：">
					<el-button @click='againkey' class='quxiao'>重新生成</el-button>
					<el-tooltip placement="right" effect="light">
						<div slot="content" style="width: 320px;">密钥具有极高的安全性，开发者使用接口功能时用来加密请求和解密响应结果。切记勿把密码直接交给第三方开发者或直接存储在代码中。</div>
						<i class="el-icon-question"></i>
					</el-tooltip>
				</el-form-item>
				<!--v-if='nowdata.status.display=="已激活"'-->
				<el-form-item label="应用名称:" prop="name" :rules="[ { required: true, message: '应用名称不能为空',trigger: 'blur' }]">
					<el-input type="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" placeholder='请设置应用名称' v-model='postdata.name' auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="应用状态:">

					<span style="color: #19BA99 ;font-size: 14px;">{{nowdata.status.display}}</span>

				</el-form-item>

				<el-form-item label="拥有者:">

					<!--<el-input type="text" readonly onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" auto-complete="off" v-model='nowdata.ownerName'></el-input>-->
					<span style="color: #323C4D">{{nowdata.ownerName}}</span>

				</el-form-item>

				<el-form-item label="服务版本:" v-if='isAdmin'>

					<el-radio v-model="postdata.version" label="DFVersion">V1</el-radio>

					<el-radio v-model="postdata.version" label="SaasVersion">V2</el-radio>
					<el-tooltip placement="right" effect="light">
						<div slot="content" style="width: 320px;">提供接口服务的业务系统版本。V1表示易龙车险服务平台，V2表示邦德车险云平台。</div>
						<i class="el-icon-question"></i>
					</el-tooltip>
				</el-form-item>

				<el-form-item label="服务版本:" v-if="isAdmin==false">

					<span style="color: #323C4D">{{versiondisplay}}</span>
					<el-tooltip placement="right" effect="light">
						<div slot="content" style="width: 320px;">提供接口服务的业务系统版本。V1表示易龙车险服务平台，V2表示邦德车险云平台。</div>

						<i class="el-icon-question"></i>
					</el-tooltip>

				</el-form-item>
				<el-form-item label="服务地址:" prop="serviceHost" v-if='isAdmin'>

					<el-input type="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" auto-complete="off" v-model='postdata.serviceHost'></el-input>
					<el-tooltip placement="right" effect="light">
						<div slot="content" style="width: 320px;">访问业务系统地址，包含且只需协议和域名部分。与服务版本匹配，否则应用无法使用。如http://demo.bandins.com/</div>

						<i class="el-icon-question"></i>
					</el-tooltip>
				</el-form-item>

				<el-form-item label="服务地址:" prop="serviceHost" v-if="isAdmin==false">

					<span style="color:#323C4D">{{postdata.serviceHost}}</span>
					<el-tooltip placement="right" effect="light">
						<div slot="content" style="width: 320px;">访问业务系统地址，包含且只需协议和域名部分。与服务版本匹配，否则应用无法使用。如http://demo.bandins.com/</div>

						<i class="el-icon-question"></i>
					</el-tooltip>
				</el-form-item>

				<el-form-item label="授权类型:" v-if='isAdmin'>

					<el-radio v-model="postdata.authMode" label="SingleUserMode">单用户</el-radio>

					<el-radio v-model="postdata.authMode" label="MultiUserMode">多用户</el-radio>
					<el-tooltip placement="right" effect="light">
						<div slot="content" style="width: 320px;">“单用户”表示应用绑定一个指定的业务账号，使用应用时默认使用绑定账号登陆业务系统去操作业务，无需登陆业务系统；“多用户”表示应用支持多账号登陆业务系统，操作业务前，需要先使用业务账号登陆业务系统。</div>

						<i class="el-icon-question"></i>
					</el-tooltip>
				</el-form-item>

				<el-form-item label="授权类型:" v-if='isAdmin==false'>

					<span style="color:#323C4D" v-if="postdata.authMode=='SingleUserMode'">单用户</span>

					<span style="color:#323C4D" v-if="postdata.authMode=='MultiUserMode'">多用户</span>
					<el-tooltip placement="right" effect="light">
						<div slot="content" style="width: 320px;">“单用户”表示应用绑定一个指定的业务账号，使用应用时默认使用绑定账号登陆业务系统去操作业务，无需登陆业务系统；“多用户”表示应用支持多账号登陆业务系统，操作业务前，需要先使用业务账号登陆业务系统。</div>
						<i class="el-icon-question"></i>
					</el-tooltip>
				</el-form-item>

				<div v-if="nowdata.status.display=='已激活'">
					<el-form-item label="业务账号:" v-if="postdata.authMode=='SingleUserMode'">

						<!--<el-input type="text" readonly onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" placeholder='请设置业务账号' v-model='nowdata.ownerName' auto-complete="off"></el-input>-->
						<span style="color: #323C4D;padding-left: 15px;display: inline-block;height: 32px;line-height: 32px;width: 300px;background:#F5F7F9 ;">{{accountName}}</span>

						<div class="cxbd">

							<el-button @click='anewclick'><span>重新绑定</span></el-button>

						</div>
						<el-tooltip placement="right" effect="light">
							<div slot="content" style="width: 320px;">业务系统的登陆账号。如果在业务系统修改密码，必须重新绑定。</div>
							<i class="el-icon-question"></i>
						</el-tooltip>
						<template>
							<span @click="packupones" class="fblue" style="cursor: pointer;background: #FBFBFB;position: absolute;left: 400px;top: 0;" v-if="nowdata.account"><i v-if="packupone==false">展开<i class="el-icon-arrow-down"></i></i><i v-if="packupone==true">收起<i class="el-icon-arrow-up"></i></i></span>
						</template>
						<el-collapse-transition>
							<div style="border-radius: 4px;margin-top: 10px;padding:20px;padding-top: 20px;padding-bottom: 20px;font-size: 12px;border: 1px solid #D9DDE7;width: 90%;margin-left: 24px;" v-show="packupone" v-if="nowdata.account">
								<h4 style="color: #B0B9CD ;font-weight: normal;height: 20px;line-height: 20px;margin-bottom: 10px;">账号关联信息</h4>
								<p style="height: 20px;line-height: 20px;color: #555E74 ;font-size: 12px;">出单员：{{nowdata.account.sellerName}}</p>
								<p style="height: 20px;line-height: 20px;color: #555E74 ;font-size: 12px;">出单机构：{{nowdata.account.sellerOrgName}}</p>
								<p style="height: 20px;line-height: 20px;color: #555E74 ;font-size: 12px;margin-bottom: 10px;">出单渠道：</p>
								<el-table border :data="nowdata.account.insChannels" style='background: #FBFBFB;font-size: 12px;color: #323C4D ;'>
									<el-table-column prop="insCorpShortName" label="保险公司" width="255" heigth='20'>
									</el-table-column>
									<el-table-column prop="insCityShortName" label="地区" width="255" heigth='20'>
									</el-table-column>
									<el-table-column prop="channelName" label="名称" width='255' heigth='20'>
									</el-table-column>
								</el-table>
							</div>
						</el-collapse-transition>
						<!--</el-collapse-item>
					</el-collapse>-->

					</el-form-item>

				</div>
				<el-form-item label="应用功能:">
					<el-checkbox v-model="postdata.enableH5Feature" v-if="isAdmin">H5出单客户端</el-checkbox>
					<span v-if="isAdmin==false"><span v-if="postdata.enableH5Feature">H5出单客户端</span></span>
					<template>
						<div v-if="postdata.enableH5Feature">

							<span class="fblue" @click="pack" style="cursor: pointer;background: #FBFBFB;position: absolute;left: 170px;top: 0;"><i v-if="packup==false">展开<i class="el-icon-arrow-down"></i></i><i v-if="packup==true">收起<i class="el-icon-arrow-up"></i></i>
							</span>
							<el-collapse-transition>

								<div class="conone" v-show="packup" style="border: 1px solid #D9DDE7;border-radius: 4px;padding:20px;padding-right: 27px;">
									<div style="margin-top: 5px;">
										<span class="fblue">H5链接地址：</span><span style="color: rgb(50, 60, 77);">{{$hapi}}/#/?appId={{nowdata.appId}}</span>
										<el-button v-clipboard:copy="$hapi+'/#/?appId='+nowdata.appId" v-clipboard:success="onCopy" v-clipboard:error="onError" style='margin-left: 20px;' class='quxiao'><span>复制</span></el-button>
									</div>
									<!--<div class="detail-left">

										<p class="gray" style="margin-left: 10px;">应用图标</p>

										<div class="box">

											<form enctype="multipart/form-data">

												<img alt="" :src="postdata.theme.logoImgBase64" id="avatar" style="height: 120px;width: 120px;border-radius:10px">

												<a href="javascript:;" class="file">更改

													<input type="file" name="" id="" @change="onFileChange">

												</a>

											</form>

										</div>

									</div>-->

									<!--<div class="detail-right">

										<p class="gray">默认应用主题色，点击色块更改</p>

										<el-color-picker v-model="postdata.theme.themeColor"></el-color-picker>
									</div>-->

								</div>

							</el-collapse-transition>

						</div>
					</template>
					<div class="api">
						<el-checkbox v-model="postdata.enableApiFeature" v-if="isAdmin">API接口</el-checkbox>
						<span v-if="isAdmin==false"><span v-if="postdata.enableApiFeature">API接口</span></span>
					</div>
					<!--<i class="el-icon-circle-check-outline"></i><span>API</span>-->

					<!--<span>收起<i class="el-icon-arrow-up"></i> </span>-->
					<!--<el-table
				    :data="tableData"
				    stripe
				    style="width: 90%;height: 100px;">
					    <el-table-column
					      prop="date"
					      label="保险公司"
					      width="250" heigth='20'>
					    </el-table-column>
					    <el-table-column
					      prop="name"
					      label="功能编号"
					      width="250" heigth='20'>
					    </el-table-column>
					    <el-table-column
					      prop="address"
					      label="开放"
					      width='250' heigth='20'>
<template slot-scope="scope">
	<el-switch v-model="value3">
	
	</el-switch>
</template>
				    	</el-table-column>
			  	</el-table>	-->
				</el-form-item>
				<el-form-item>
					<div class="baocun">
						<el-button type="primary" @click="savethree('postdata')">保存</el-button>
					</div>
				</el-form-item>
			</el-form>
		</div>

		<el-dialog title="重新绑定" :lock-scroll=false :visible.sync="dialogVisible" width="560px" height="330px" :modal-append-to-body="false">
			<div class="content" style="height: 300px;">
				<ul class="conone">
					<li v-if="vif.two" class="viftwo">
						<p style="margin-bottom: 30px;">请绑定您的出单账户</p>
						<el-form :model="accountqq" ref="accountqq" label-width="100px" class="demo-ruleForm">
							<el-form-item label="业务帐号:" prop="userName" :rules="[{ required: true, message: '业务帐号不能为空'},]">
								<el-input type="text" v-model="accountqq.userName" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="密码:" prop="password" :rules="[{ required: true, message: '密码不能为空'},]">
								<el-input type="password" v-model="accountqq.password" auto-complete="off"></el-input>
							</el-form-item>

							<el-form-item>
								<el-button type="primary" @click="confirmone('accountqq')">确定</el-button>
								<el-button @click="canceltwo('accountqq')" class='quxiao'>取消</el-button>
							</el-form-item>
						</el-form>
					</li>
				</ul>

			</div>

		</el-dialog>
		<el-dialog title="重新生成密钥(AppSecret)" :lock-scroll=false :visible.sync="dialogVisibletwo" width="560px" height="380px" :modal-append-to-body="false">
			<div class="content" style="height: 320px;">
				<ul class="conone">
					<li class="concenteroneaa" style="left: 0;">
						<img src="../../../static/images/icon_successful.png" />
						<h3>应用已成功激活</h3>
						<p class="gays gaystop">密钥(AppSecret)已生成！</p>
						<h4 style="font-size: 16px;color: #7A839B;font-weight: normal;padding-top: 20px;margin-bottom: 30px;">{{signal}}</h4>
						<a class="file" :href='href' download="密钥(AppSecret).txt" @click="saveone">保存Key信息</a>
					</li>
				</ul>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import axios from "axios";

	import { axiosPostAPI, axiosGetAPI, axiosPutAPI } from "../../common/Axios";

	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === "") {
					callback(new Error("请输入服务地址"));
				}
				var strRegex = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;

				var re = new RegExp(strRegex);

				if(re.test(value)) {
					callback()
				} else {
					callback(new Error("请输入正确服务地址"));

					return false;
				}
			};

			return {
				loading2: true,
				rules2: {
					serviceHost: [{
						validator: validatePass,

						trigger: "blur"
					}]
				},

				packupone: false,

				packup: false,

				value3: true,

				color1: "#0070D3",

				dialogVisible: false,

				dialogVisibletwo: false,

				weiji: false,

				vif: {
					two: true,

					four: false
				},

				radio: "1",
				accountName: '',

				nowId: "",

				postdata: {
					version: "",

					serviceHost: "",

					enableApiFeature: "",

					enableH5Feature: "",

					authMode: "",

					name: "",

					token: "",

					//      theme: {
					//		  logoImgBase64:"",
					//        themeColor: "#0070D3"
					//      }
				},

				href: "#",

				nowdata: {
					status: {
						display: ""
					},

					account: {
						sellerName: "",

						insChannels: []
					}
				},

				accountqq: {
					userName: "",

					password: ""
				},

				signal: "",

				isAdmin: "",

				versiondisplay: ""
			};
		},

		created() {
			this.getdata();
			
		},
		computed: {
			hreftwo: function() {
				return 'http://dev-apis.bandins.com/h5/#/?appId=' + this.nowdata.appId;
			}
		},
		methods: {
			getdata() {
				this.nowId = JSON.parse(localStorage.getItem("nowId"));

				this.isAdmin = JSON.parse(localStorage.getItem("isAdministrator"));

				var url = "/apis/apps/" + this.nowId;

				axiosGetAPI(url).then(res => {
					this.loading2 = false;
					this.nowdata = res.result;
					var obj = res.result;
					if(obj.name) {
						this.postdata.name = obj.name;
					}
					this.postdata.version = obj.version.text;

					this.versiondisplay = obj.version.display;
					if(obj.account && obj.account.accountName) {
						this.accountName = obj.account.accountName

					}
					this.postdata.serviceHost = obj.serviceAddress;

					this.postdata.enableApiFeature = obj.enableApiFeature;

					this.postdata.enableH5Feature = obj.enableH5Feature;

					this.postdata.authMode = obj.authMode.text;
					//      this.postdata.theme.logoImgBase64=obj.theme.logoImgBase64;
					//      this.postdata.theme.themeColor=obj.theme.themeColor
					if(obj.account && obj.account.accountToken) {
						this.postdata.token = obj.account.accountToken;
					}
				});
			},

			fanhuis() {
				this.$router.push({
					name: 'Manage',
					params: this.$route.query

				});
			},

			savethree(postdata) {
				this.$refs[postdata].validate((valid) => {
					if(valid) {

						if(
							this.postdata.enableH5Feature == false &&
							this.postdata.enableApiFeature == false
						) {
							this.$message({
								showClose: true,
								message: '请选择应用功能',
								type: 'error',
								duration: 3000
							});

							return false;
						}
						if(this.postdata.name == '' || this.postdata.serviceHost == '') {
							return false;
						}

						this.save();
					}
				})
			},
			save() {
					var url = "/apis/apps/" + this.nowId;
					axiosPutAPI(url, this.postdata).then(res => {
						this.$message({
							showClose: true,
							message: '保存成功',
							type: 'success',
							duration: 3000
						});
						var obj = {};
					});
			},
			//重新绑定
			anewclick() {
				this.dialogVisible = true;
				this.doudong()
			},
			//确定绑定
			confirmone(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						var url = "/apis/apps/" + this.nowId + "/token";

						axiosPostAPI(url, this.accountqq).then(res => {
							this.$message({
								showClose: true,
								message: '绑定成功',
								type: 'success',
								duration: 3000
							});
							
							if(res.result && res.result.token) {
								this.postdata.token = res.result.token;
							}
							//保存token
							this.save();
							this.dialogVisible = false;
							//重新获取详情
							this.getdata();
						});
					}
				});
			},
			//取消
			canceltwo(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible = false;

			},

			//更改图片

			onFileChange(e) {
				var files = e.target.files || e.dataTransfer.files;

				if(!files.length) return;

				this.createInput(files[0]);
			},

			createInput(file) {
				var reader = new FileReader();

				reader.onload = e => {
					let img_base64 = reader.result;

					this.postdata.theme.logoImgBase64 = img_base64;

					let data = {
						img_base64: img_base64
					};
				};

				reader.readAsDataURL(file);
			},

			//重新生成key

			againkey() {
				var url = "/apis/apps/" + this.nowId + "/signal";

				axiosPutAPI(url).then(res => {
					this.dialogVisibletwo = true;
					this.signal = res.result.signal;
				});
			},

			//保存key

			saveone() {
				this.href = "data:text/paint; utf-8," + this.signal;
			},

			pack() {
				this.packup = !this.packup;
				this.doudong()
			},

			packupones() {
				this.packupone = !this.packupone;
			},
			onCopy: function(e) {
				this.$message({
					showClose: true,
					message: '复制成功',
					type: 'success',
					duration: 3000
				});
			},
			onError: function(e) {
				this.$message({
					showClose: true,
					message: '复制',
					type: 'error',
					duration: 3000
				});
			},
			doudong() {
				var map = {};
				window.onscroll = function() {
					map[location.hash] = document.body.scrollTop;
				}
				var map = {};
				window.onhashchange = function() {
					document.body.scrollTop = 0;
				}
				window.onscroll = function() {
					if(document.body.scrollTop) {
						// 存
						map[location.hash] = document.body.scrollTop;
					} else {
						// 读
					}
				}
				var map = {};
				window.onhashchange = function() {
					document.body.scrollTop = 0;
				}
				window.onscroll = function() {
					if(document.body.scrollTop) {
						// 存
						map[location.hash] = document.body.scrollTop;
					} else {
						var timer = null;
						timer = setInterval(function() {
							if(document.body.scrollTop == map[location.hash]) {
								clearInterval(timer);
							} else {
								document.body.scrollTop = map[location.hash];
							}
						}, 20);
					}
				}
			}

		}
	};
</script>

<style scoped>
	.detail {
		right: 0;
		min-height: 680px!important;
	}
	
	.conone {
		width: 760px;
		height: 60px;
		border-radius: 4px;
		margin-left: 24px;
	}
	
	.detail-left {
		float: left;
		width: 160px;
	}
	
	.detail-right {
		float: left;
		padding: 20px;
		padding-top: 0;
	}
	
	.gray {
		color: #b0b9cd;
	}
	
	.el-icon-circle-check-outline {
		color: #0070d3;
	}
	
	.el-icon-check {
		padding-right: 3px;
	}
	
	.api {
		margin: 0 0 30px 24px;
	}
	
	.el-collapse-item__header {
		width: 100px !important;
		border: none !important;
	}
	
	#el-collapse-head-9590 {
		width: 100px !important;
		border: none !important;
		background-color: #fbfbfb;
	}
	
	.item__header {
		background-color: #fbfbfb;
	}
	
	.collapse-item__wrap {
		border-bottom: none;
	}
	
	.cxbd {
		position: absolute;
		left: 460px;
		top: 0px;
	}
	
	.el-collapse {
		border: 0;
		background: #fbfbfb !important;
	}
	
	.el-collapse-item {
		background: #fbfbfb;
		width: 825px;
	}
	
	.baocun .el-button {
		padding: 12px 35px;
		margin-bottom: 40px;
		margin-left: 24px;
	}
	
	.viftwo .el-button {
		padding: 12px 35px;
		margin-top: 20px;
	}
	
	.concenteroneaa {
		text-align: center;
		width: 560px;
	}
	
	.detail .conone {
		padding-top: 0px !important;
	}
	
	.el-icon-arrow-up {
		color: #0070d3 !important;
	}
	
	.detail-right .el-input__inner {
		width: 180px !important;
	}
	
	.detail .conone li {
		top: 100px;
	}
	
	.detail .viftwo .el-button {
		padding: 12px 45px!important;
		margin-left: 10px;
	}
	
	.detail .viftwo .el-button+.el-button {
		margin-left: 20px;
	}
	
	.detail .el-button--default {
		padding: 8px 20px !important;
	}
	
	.detail .el-input {
		width: 300px;
	}
	/*[v-cloak]{display: none !important;}*/
</style>