<template>
	<div class="manage page">

		<div class="noapp">

			<!--<span class="fanhui" style="color: #0070D3;margin-left: 0;" @click="backone"><i class="el-icon-arrow-left"></i>返回</span>-->

			<h2 class="title">应用管理</h2>

		</div>

		<div class="haveapp">
			
			<router-link v-if='isAdministrator' to="/main/foundapp">

				<el-button type="primary" @click='foundapp'><i class="el-icon-plus"></i>创建应用</el-button>

			</router-link>
			<!--搜索功能-->

			<el-form :inline="true" :model="formInline" class="demo-form-inline">

				<span class="inlineone">
	
				  		<el-form-item label="AppID">
	
				    		<el-input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="formInline.appId" placeholder="请输入appId"></el-input>
	
				  		</el-form-item>
	
				  	</span>

				<span class="inlinetwo">
	
				  		<el-form-item label="拥有者">
	
				   		 <el-input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="formInline.ownerName" placeholder="请输入拥有者"></el-input>
	
				  		</el-form-item>
	
				  	</span>

				<span class="inlinethree">
	
					 	<el-form-item label="应用名称">
	
					    	<el-input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="formInline.name" placeholder="请输入应用名称"></el-input>
	
					    </el-form-item>
	
				  	</span>

				<span class="inlinefour">
	
				 	  <el-form-item label="状态">
	
					    <el-select v-model="formInline.status" placeholder="请输入状态">
	
					      <el-option label="全部" value=""></el-option>
	
					      <el-option label="已激活" value="Activated"></el-option>
	
					      <el-option label="待激活" value="Created"></el-option>
	
					      <el-option label="已禁用" value="Unavailable"></el-option>
	
					    </el-select>
	
					  </el-form-item>
	
				  	</span>

				<span class="onSubmits">
	
				  	 <el-form-item>
	
				   		 <el-button type="primary" @click="onSubmit" style='padding: 8px 12px;'>查询</el-button>
	
				  	 </el-form-item>
	
				  </span>

			</el-form>
			<!--<p style="font-size: 14px;color: #B0B9CD;">说明: 您应先激活应用后才能发布和使用。点击激活应用按钮可绑定用户</p>-->
			<el-table :data="tableData" style="width: 95%" v-loading="loading2" element-loading-text="拼命加载中" element-loading-background="rgba(255,255,255,0.5)">

				<el-table-column prop="name" label="应用名称" width="170">

					<template slot-scope="scope">

						<div style="cursor: pointer;" @click="clickdetail(scope.row.appId,scope.row.textone)">

							<!--<img src="../../../static/images/application_default_small.png" class="imgs"/>-->
							<span class='fblue'>{{scope.row.name}}</span>

						</div>
					</template>
				</el-table-column>
				<el-table-column prop="appId" label="AppID" width="184">
				</el-table-column>
				<el-table-column prop="enableApiFeature" label="功能" width='120'>
					<template slot-scope="scope">
						<img src="../../../static/images/API.png" v-show="scope.row.enableApiFeature" />

						<img src="../../../static/images/H5.png" v-show="scope.row.enableH5Feature" />
					</template>
				</el-table-column>
				<el-table-column prop="ownerName" label="拥有者" width='140'>
					<template slot-scope="scope">
						<span>{{scope.row.ownerName}}</span>
					</template>
				</el-table-column>

				<el-table-column prop="text" label="状态" width='120'>
					<template slot-scope="scope">
						<span v-if="scope.row.textone=='Activated'" style="color: #19BA99;">{{scope.row.text}}</span>

						<span v-else-if="scope.row.textone=='Unavailable'" style="color: #B0B9CD;">{{scope.row.text}}</span>

						<span v-else-if="scope.row.textone=='Created'" style="color: #B0B9CD;">{{scope.row.text}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="address" label="操作" width='170'>
					<template slot-scope="scope">
						<!--详情-->
						<span style="margin-right: 20px;cursor: pointer;" class="fblue" @click="clickdetail(scope.row.appId,scope.row.textone)" v-if="scope.row.textone=='Activated'||scope.row.textone=='Created'">详情</span>
						<span style="cursor: pointer;" class="fblue" size="small" @click="dialogVisibless(scope.row.appId,scope.row.textone,scope.row.texto,scope.row.enableH5Feature,scope.row.version,scope.row.name)">	
			<span v-if="scope.row.textone=='Created'" style="margin-right: 20px;">
				<span>激活</span>
						</span>
						<span v-else-if="scope.row.textone=='Unavailable'">
					<span  v-if='scope.row.isAdministrator'>启用</span>
						</span>
						</span>

						<span @click="forbidden(scope.row.appId,scope.row.textone)" style="cursor: pointer;" class="fblue">
			<span v-if="scope.row.textone=='Created'">禁用</span>
						<span v-else-if="scope.row.textone=='Activated'">禁用</span>

						</span>
					</template>

				</el-table-column>
			</el-table>
			<!--分页-->
			<div v-if="totalRows>10" class="hasMore">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" layout="prev, pager, next" :total="totalRows">
				</el-pagination>

			</div>
		</div>

		<!--激活弹框-->
		<!--title="激活应用"-->
		<el-dialog :visible.sync="dialogVisible" :lock-scroll=false width="600px" height="410px" :before-close="handleClose" :modal-append-to-body="false">
			<div slot="title" style="font-size: 16px;color: #18243A;letter-spacing: 0;line-height: 25px;">激活应用
				<!--<span style="color: #0070d3;"><i class="el-icon-minus"></i>{{version}}</span>-->
			</div>
			<div class="content">
				<!--<span style="position: absolute;top: 20px;left: 94px;color: #0070d3;font-size: 18px;"><i class="el-icon-minus"></i>{{version}}</span>-->
				<div v-if="authModetext=='SingleUserMode'">
					<el-steps :active="active" v-if="nowh5">
						<el-step title="设置应用名"></el-step>
						<el-step title="绑定出单账号"></el-step>
						<!--<el-step title="H5自定义"></el-step>-->
						<el-step title="完成激活"></el-step>
					</el-steps>
				</div>
				<div v-if="authModetext=='SingleUserMode'">
					<el-steps :active="active" v-if="nowh5==false">
						<el-step title="设置应用名"></el-step>
						<el-step title="绑定出单账号"></el-step>
						<el-step title="完成激活"></el-step>
					</el-steps>
				</div>
				<div v-if="authModetext=='MultiUserMode'">
					<el-steps :active="active" v-if="nowh5">
						<el-step title="设置应用名"></el-step>
						<!--<el-step title="H5自定义"></el-step>-->
						<el-step title="完成激活"></el-step>
					</el-steps>
				</div>
				<div v-if="authModetext=='MultiUserMode'">
					<el-steps :active="active" v-if="nowh5==false">
						<el-step title="设置应用名"></el-step>
						<el-step title="完成激活"></el-step>
					</el-steps>
				</div>

				<ul class="conone">
					<!--应用名称-->
					<li v-if="vif.one" class="vifone">
						<el-form :model="activate" ref="activate" label-width="100px" class="demo-ruleForm">
							<el-form-item label="应用名称" prop="appName" :rules="[{ required: true, message: '应用名称不能为空'},]">
								<el-input type="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="activate.appName" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="nextone('activate')" v-if='authModetext == "SingleUserMode"'>下一步</el-button>
								<el-button type="primary" @click="nextone('activate')" v-if='authModetext != "SingleUserMode"'>激活</el-button>
							</el-form-item>
						</el-form>
					</li>
					<!--出单账户-->
					<li v-if="vif.two" class="viftwo">
						<p>请绑定您的出单账户</p>
						<el-form :model="accountqq" ref="accountqq" label-width="100px" class="demo-ruleForm">
							<el-form-item label="业务帐号" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" prop="userName" :rules="[{ required: true, message: '业务帐号不能为空'},]">
								<el-input type="text" v-model="accountqq.userName" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="密码" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" prop="password" :rules="[{ required: true, message: '密码不能为空'},]">
								<el-input type="password" v-model="accountqq.password" auto-complete="off"></el-input>
							</el-form-item>

							<el-form-item>
								<span class="cell-bnt"> 
						  	<el-button  @click="uptwo">上一步</el-button>  
						  			
						  	</span>

								<el-button type="primary" @click="nexttwo('accountqq')">激活</el-button>
							</el-form-item>
						</el-form>
					</li>
					<!--H5自定义-->
					<!--<li v-if="vif.three">
					<div class="li-left">
						<p class="yiyong">应用图标<span>(建议上传512px*512px尺寸的图片)</span></p>
						<div class="box">

							   <form enctype="multipart/form-data" >
								    <img alt="" :src="activate.theme.logoImgBase64" id="avatar" style="height: 120px;width: 120px;border-radius:10px"> 
								    <a href="javascript:;" class="file">更改
									    <input type="file" name="" id="" @change="onFileChange">
									</a>
								</form>
							
						</div>

					</div>
					<div class="li-right">
						<p class="yiyong">应用背景色<span>(点击色块更换主题色)</span></p>
						 <el-color-picker v-model="activate.theme.themeColor"></el-color-picker>
					</div>
					<div class="li-bottom">
						<el-button  @click="upthree">上一步</el-button>
					 	<el-button type="primary" @click="nextthree">激活</el-button> 
					</div>
				</li>-->
					<li class="concenterone" v-if='vif.four'>
						<img src="../../../static/images/icon_successful.png" />
						<h3>完成应用已成功激活</h3>
						<p class="gays">您现在可以使用应用了,点击完成查看应用秘钥</p>
						<p class="gays gaystop">密钥 (AppSecret)已生成！</p>
						<h4 style="font-size: 16px;color: #7A839B;font-weight: normal;padding-top: 20px;">{{signal}}</h4>
						<a class="file" :href='href' download="密钥 (AppSecret).txt" @click="saveone">保存Key信息</a>
					</li>
				</ul>
			</div>
		</el-dialog>
		<img v-if="totalRows<1" src="../../../static/images/icon_no.png" style="margin:60px 0 10px 456px;" />
		<p v-if="totalRows<1" style="font-size: 16px;color: #909399 ;text-align: center;">您还没有创建应用</p>
	</div>

</template>

<script>
	import axios from "axios";
	import { axiosPostAPI, axiosGetAPI, axiosPutAPI } from "../../common/Axios";
	var img_upload = document.getElementById("img_upload");

	var base64_code = document.getElementById("base64_code");

	var img_area = document.getElementById("img_area");

	export default {
		data() {
			return {
				nameone: "",
				ownerNameone: "",
				appIdone: "",
				loading2: true,
				nowpaging: 0,
				base64: "data:image/png;base64,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",
				imageUrl: "../../../static/images/application_default_big.png",

				href: "#",

				totalRows: "",

				tableData: [],

				dialogVisible: false,

				active: 0,

				result: {
					userName: ""
				},

				isAdministrator: "",

				color1: "#409EFF",

				currentPage: 1,

				pagesize: 10,

				hasMore: "",

				nowId: "",

				activate: {
					appName: "",

					accountName: "",

					accountToken: "",

					//      theme: {
					//        logoImgBase64:
					//          "data:image/png;base64,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",
					//
					//        themeColor: "#409EFF"
					//      }
				},

				token: "",

				accountqq: {
					userName: "",

					password: ""
				},

				binding: "",
				version: "",

				vif: {
					one: true,

					two: false,

					three: false,

					four: false
				},

				signal: "",
				statusone: "",

				authModetext: "",

				nowh5: "",

				formInline: {
					appId: "",

					ownerName: "",

					name: "",

					status: ""
				}
			};
		},
		created() {
			if(this.$route.query.userName) {
				this.formInline.ownerName = this.$route.query.userName;
			}
			if(this.$route.params.appId) {
				this.formInline.appId = this.$route.params.appId
			}
			if(this.$route.params.ownerName) {
				this.formInline.ownerName = this.$route.params.ownerName
			}
			if(this.$route.params.name) {
				this.formInline.name = this.$route.params.name

			}
			if(this.$route.params.status) {
				this.formInline.status = this.$route.params.status
			}

			this.requestdata();
		},

		methods: {
			//请求数据

			requestdata() {
				this.currentPage = 1;
				this.loading2 = false;
				var objthree = JSON.parse(localStorage.getItem("isAdministrator"));
				this.isAdministrator = objthree;

				// if(JSON.parse(localStorage.getItem("formInlines"))){
				//   this.formInline=JSON.parse(localStorage.getItem("formInlines"))
				// }
				var url =
					"/apis/apps?model.appId=" +
					this.formInline.appId +
					"&model.ownerName=" +
					this.formInline.ownerName +
					"&model.name=" +
					this.formInline.name +
					"&model.status=" +
					this.formInline.status;

				axiosGetAPI(url).then(res => {
					this.totalRows = res.page.totalRows;
					this.hasMore = res.page.hasMore;

					this.tableData = res.result.map(item => {
						let newItem = {};

						newItem.name = item.name;

						newItem.appId = item.appId;

						newItem.ownerName = item.ownerName;

						newItem.enableApiFeature = item.enableApiFeature;

						newItem.enableH5Feature = item.enableH5Feature;

						newItem.text = item.status.display;

						newItem.textone = item.status.text;

						newItem.isAdministrator = this.isAdministrator;

						newItem.texto = item.authMode.text;

						newItem.version = item.version.display;

						return newItem;
					});
				});
			},

			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			foundapp: function() {},
			handleClose(done) {
				if(this.vif.four == true) {
					this.dialogVisible = false
				} else {
					this.$confirm("确认关闭？")
						.then(_ => {
							done();
						})
						.catch(_ => {});
				}
				this.active = 0;
				this.vif = {
					one: true,

					two: false,

					three: false,

					four: false
				};
				this.activate.accountName = "";
				this.activate.accountToken = "";
				//        this.activate.theme.logoImgBase64 ="data:image/png;base64,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";
				//        this.activate.theme.themeColor = "#409EFF";
				this.accountqq.userName = "";
				this.accountqq.password = "";

			},

			//设置应用签名的下一步

			nextone(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						this.active = this.active + 1;

						this.vif.one = false;

						if(this.authModetext == "SingleUserMode") {
							this.vif.two = true;
						} else if(
							this.nowh5 == true &&
							this.authModetext == "MultiUserMode"
						) {
							//          this.vif.three = true;
							this.vif.four = true;
							this.nextthree();
						} else if(
							this.nowh5 == false &&
							this.authModetext == "MultiUserMode"
						) {
							this.vif.four = true;

							this.nextthree();
						}
					}
				});
			},

			//绑定出单账号上一步
			uptwo() {
				this.active = this.active - 1;

				this.vif.two = false;

				this.vif.one = true;
			},

			//绑定出单账号下一步

			nexttwo(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						var url = "/apis/apps/" + this.nowId + "/token";

						axiosPostAPI(url, this.accountqq).then(res => {
							this.activate.accountToken = res.result.token;

							if(this.active++ > 3) this.active = 1;

							this.vif.two = false;
							this.nextthree()
							//          this.vif.three = true;
							this.vif.four = true;
						});
					}
				});
			},

			//H5自定义

			upthree() {
				this.active = this.active - 1;

				this.vif.three = false;

				this.vif.two = true;
			},

			//第三步点击激活

			nextthree() {
				this.activate.accountName = this.accountqq.userName;

				var url = "/apis/apps/" + this.nowId + "/status";

				axiosPostAPI(url, this.activate).then(res => {
					this.vif.three = false;
					this.vif.four = true;

					var urltwo = "/apis/apps/" + this.nowId + "/signal";

					axiosPutAPI(urltwo).then(res => {
						this.signal = res.result.signal;
						this.requestdata();
						//        this.active = this.active + 1;
					});
				});
			},

			//分页

			handleSizeChange: function(size) {
				this.pagesize = size;
			},

			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				this.nowpaging = (this.currentPage - 1) * 10;
				//    this.requestdata()
				var url =
					"/apis/apps?offset=" + this.nowpaging +
					"&model.appId=" +
					this.appIdone +
					"&model.ownerName=" +
					this.ownerNameone +
					"&model.name=" +
					this.nameone +
					"&model.status=" +
					this.statusone;

				axiosGetAPI(url).then(res => {
					this.totalRows = res.page.totalRows;
					this.hasMore = res.page.hasMore;

					this.tableData = res.result.map(item => {
						let newItem = {};

						newItem.name = item.name;

						newItem.appId = item.appId;

						newItem.ownerName = item.ownerName;

						newItem.enableApiFeature = item.enableApiFeature;

						newItem.enableH5Feature = item.enableH5Feature;

						newItem.text = item.status.display;

						newItem.textone = item.status.text;

						newItem.isAdministrator = this.isAdministrator;

						newItem.texto = item.authMode.text;

						return newItem;
					});
				});

			},

			//激活和启用

			dialogVisibless(res, restwo, resthress, resfour, version, name) {
				//	    	window.location.reload();

				this.activate.appName = name;
				this.nowh5 = resfour;
				this.version = version;
				this.activate.appName

				this.authModetext = resthress;

				if(restwo == "Created") {
					this.dialogVisible = true;

					this.nowId = res;

//					this.$store.dispatch("changeLocation", {
//						appId: this.nowId
//					});
				} else if(restwo == "Unavailable") {
					this.nowId = res;

					let url = "/apis/apps/" + this.nowId + "/status?disable=false";

					axiosPutAPI(url).then(res => {
						this.requestdata();
					});
				}
			},

			//禁用

			forbidden(res, restwo) {
				if(restwo == "Activated" || restwo == "Created") {
					this.nowId = res;

					let url = "/apis/apps/" + this.nowId + "/status?disable=true";

					axiosPutAPI(url).then(res => {
						this.requestdata();
					});
				}
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

					this.activate.theme.logoImgBase64 = img_base64;

					let data = {
						img_base64: img_base64
					};
				};
				reader.readAsDataURL(file);
			},

			//进入详情

			clickdetail(res, restwo) {
				if(restwo == "Activated" || restwo == "Created") {
					localStorage.setItem("nowId", JSON.stringify(res));
					this.$router.push({
						path: "/main/detail",
						query: this.formInline
					});
				}
			},

			//保存文本

			saveone() {
				this.href = "data:text/paint; utf-8," + this.signal;

				this.active = this.active + 1;

				this.activate.appName = "";

				this.activate.accountName = "";

				this.activate.accountToken = "";

				//    this.activate.theme.logoImgBase64 ="data:image/png;base64,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";
				//
				//    this.activate.theme.themeColor = "#409EFF";

				this.accountqq.userName = "";

				this.accountqq.password = "";
			},

			onSubmit() {
				//    this.nowpaging=(this.currentPage-1)*10;
				this.nowpaging = 0;
				this.statusone = this.formInline.status;
				this.nameone = this.formInline.name;
				this.ownerNameone = this.formInline.ownerName;
				this.appIdone = this.formInline.appId

				this.requestdata();
			},

			//返回

			backone() {
				window.history.back();
			}
		}
	};
</script>

<style>
	.manage {
		padding-left: 42px;
	}
	
	.manage p {
		color: #757e97;
		line-height: 25px;
	}
	
	.manage .noapp span {
		margin-left: 25px;
		color: #b0b9cd;
	}
	
	.manage .noapp b {
		color: #0070d3;
	}
	
	.content {
		height: 340px;
	}
	
	.el-step__icon {
		height: 20px;
		width: 20px;
	}
	
	.el-step__title {
		font-size: 12px;
	}
	
	.conone li {
		position: absolute;
		top: 150px;
		left: 30px;
		height: 300px;
	}
	
	.li-left {
		float: left;
		width: 300px;
	}
	
	.li-right {
		float: left;
	}
	
	.yiyong {
		color: #757e97;
	}
	
	.box {
		width: 120px;
		height: 200px;
		border-radius: 10px;
		overflow: hidden;
		margin-bottom: 6px;
	}
	
	.box .manage .el-button {
		margin: 0 !important;
		padding: 0 !important;
	}
	
	.yiyong span {
		color: #b0b9cd;
		font-size: 12px;
	}
	
	.li-bottom {
		position: absolute;
		left: 120px;
		bottom: 30px;
	}
	
	.manage h3 {
		color: #757e97;
		font-size: 18px;
		font-weight: 500;
	}
	
	.manage .gays {
		color: #b0b9cd;
		font-size: 12px;
	}
	
	.manage .gaystop {
		margin-top: 20px;
	}
	
	.manage .concenterone {
		margin: 0 auto;
		width: 540px;
		text-align: center;
	}
	
	.manage .hasMore {
		text-align: center;
		margin-left: -250px;
		margin-top: ;
	}
	
	.manage .imgs {
		transform: translateY(6px);
	}
	
	.rowname {
		color: #0070d3;
	}
	
	.el-table .cell .el-button {
		text-align: left;
	}
	
	.conone .el-form {
		height: 100%;
		width: 100%;
	}
	
	.vifone .el-button {
		margin-left: 80px;
		margin-top: 165px;
	}
	
	.cell-bnt {
		margin-left: 20px;
		margin-right: 10px;
	}
	
	.viftwo .el-button {
		margin-top: 80px;
	}
	
	.file {
		position: relative;
		display: inline-block;
		border: 1px solid #409eff;
		border-radius: 4px;
		padding: 10px 44px;
		overflow: hidden;
		text-decoration: none;
		text-indent: 0;
		line-height: 20px;
		color: #fff;
		background-color: #409eff;
	}
	
	.concenterone .file {
		margin-top: 40px;
	}
	
	.file input {
		position: absolute;
		font-size: 100px;
		right: 0;
		top: 0;
		opacity: 0;
	}
	
	.file:hover {
		background: #f5f5f5;
		border-color: #409eff;
		color: #409eff;
		text-decoration: none;
	}
	/*.v-modal {z-index: 0 !important;}*/
</style>