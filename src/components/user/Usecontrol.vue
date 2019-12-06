<template>
	<div class="usecontrol page">
		<h2 class="title">用户管理</h2>
		<el-button type="primary" @click="dialogVisibleopen"><i class="el-icon-plus"></i>创建用户</el-button>

		<el-dialog title="创建用户" :visible.sync="dialogVisible" width="600px" :before-close="handleClose" :modal-append-to-body="false">
			<span>     
			<el-form :model="result" ref="result" :rules="rules2" label-width="100px" class="demo-ruleForm">  
			  
			  <el-form-item   
			    label="用户名"
			    prop="userName"
			    :rules="[
	
			      { required: true, message: '用户名不能为空'},
	
			    ]"
			  >
	
			    <el-input type="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="result.userName" auto-complete="off"></el-input>
	
			  </el-form-item>
	
			  <el-form-item
	
			    label="初始密码"
	
			    prop="password"
			    :rules="[
	
			      { required: true, message: '初始密码不能为空'},
	
			    ]"
			  >
	
			    <el-input type="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="result.password" auto-complete="off"></el-input>
	
			  </el-form-item>
		
			
	
			  <el-form-item
			    label="联系方式"
			    prop="mobile"
			  
			  >
	
			    <el-input type="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="result.mobile" auto-complete="off"></el-input>
	
			  </el-form-item>
		
			
	
			  <el-form-item
	
			    label="电子邮箱"
	
			    prop="email"
			
	
			  >
	
			    <el-input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="result.email" auto-complete="off"></el-input>
	
			  </el-form-item>
		
			
	
			  <el-form-item label="公司名称"
	
			  	prop='company'
	
			  	:rules="[
	
			  		{required: true, message: '公司名称不能为空'}
	
			  	]"
	
			  	>
	
			  	<el-input type="text" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model="result.company" auto-complete="off"></el-input>
	
			  </el-form-item>
	
			  <!--<el-form-item label="是否试用用户">-->
	
			  	<div style="padding-left: 50px;margin-bottom: 16px;">
	
			  		<span style="color: #757E97;margin-right: 40px;">是否试用用户</span>

			<el-radio v-model="trial" label="true">是</el-radio>

			<el-radio v-model="trial" label="false">否</el-radio>

	</div>

	<!--</el-form-item>-->

	<el-form-item v-if="trial=='true'" label="试用天数" prop="trialDay" :rules="[
	
			      { required: true, message: '试用天数不能为空'}
			      
				      
	
				    ]">

		<el-input type="number" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-model.number="result.trialDay" auto-complete="off"></el-input>

	</el-form-item>

	<el-form-item>

		<el-button type="primary" @click="submitForm('result')">创建</el-button>

		<el-button @click="cancelone('result')" class='quxiao'>取消</el-button>

	</el-form-item>

	</el-form>

	</span>

	<!--<span slot="footer" class="dialog-footer">
	
		    <el-button type="primary" @click="dialogVisible">创建</el-button>
	
		    <el-button  @click="dialogVisible = false">取消</el-button>
	
		  </span>-->

	</el-dialog>

	<el-table :data="tableData" style="width: 100%;margin-top: 20px;" v-loading="loading2" element-loading-text="拼命加载中" element-loading-background="rgba(255,255,255,0.5)">

		<!--<el-table-column prop="index" label="编号" width="62">
	
		      <template slot-scope="scope">
		         	<span class="black" v-if="scope.row.status.text !='Invalid'">{{scope.row.index}}</span>
		         	<span class="gayss" v-if="scope.row.status.text =='Invalid'">{{scope.row.index}}</span> 
		         	
			    </template>
		    </el-table-column>-->
		<el-table-column prop="userName" label="用户名" width="120">
			<template slot-scope="scope">
				<span class="fblue" style="cursor: pointer;" @click="enterone(scope.row.id)">{{scope.row.userName}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="email" label="电子邮箱" width='220'>
			<template slot-scope="scope">
				<span class="black" v-if="scope.row.status.text !='Invalid'">{{scope.row.email}}</span>

				<span class="gayss" v-if="scope.row.status.text =='Invalid'">{{scope.row.email}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="mobile" label="联系方式" width='130'>
			<template slot-scope="scope">
				<span class="black" v-if="scope.row.status.text !='Invalid'">{{scope.row.mobile}}</span>

				<span class="gayss" v-if="scope.row.status.text =='Invalid'">{{scope.row.mobile}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="company" label="公司名称" width='120'>
			<template slot-scope="scope">
				<span class="black" v-if="scope.row.status.text !='Invalid'">{{scope.row.company}}</span>

				<span class="gayss" v-if="scope.row.status.text =='Invalid'">{{scope.row.company}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="createdTime" label="创建时间" width='180'>
			<template slot-scope="scope">
				<span class="black" v-if="scope.row.status.text !='Invalid'">{{scope.row.createdTime}}</span>

				<span class="gayss" v-if="scope.row.status.text =='Invalid'">{{scope.row.createdTime}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="" label="操作" width='150'>
			<template slot-scope="scope">
				<span class="fblue" style="cursor: pointer;margin-right: 20px;" @click="enterone(scope.row.id)">详情</span>

				<span class="fblue" style="cursor: pointer;" v-if="scope.row.status.text=='Invalid'" @click="using(scope.row.id)">启用</span>

				<span class="fblue" style="cursor: pointer;" v-if="scope.row.status.text !='Invalid'" @click="forbidden(scope.row.id)">禁用</span>
			</template>
		</el-table-column>
	</el-table>
	<div class="hasMore">
		<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" layout="prev, pager, next" :total="pagess.totalRows">
		</el-pagination>
	</div>

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

					callback();
				}
				//				var strRegex = /^1[358][0-9]{9}$/;
				var strRegex = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;

				var re = new RegExp(strRegex);

				if(re.test(value)) {

					callback();

				} else {

					//					callback(new Error("联系方式格式不正确"));
					callback(new Error("联系方式格式不正确,固话需加区号和符号‘-’"));

					return false;

				}

			};

			return {
				loading2: true,
				nowpaging: 0,
				pagess: '',

				rules2: {
					mobile: [{

						validator: validatePass,

						trigger: "blur"

					}]

				},

				tableData: [],

				dialogVisible: false,

				result: {

					userName: "",

					password: "",

					mobile: "",

					email: "",

					company: "",

					trialDay: "7"

				},

				trial: "true",

				currentPage: 1,

				pagesize: 10

			};

		},

		created() {

			this.getuser();

		},

		methods: {

			//请求用户列表
			getuser() {
				var url = "/apis/users?offset=" + this.nowpaging;

				axiosGetAPI(url).then(res => {
					this.loading2 = false;
					for(var i = 0; i < res.result.length; i++) {
						res.result[i].index = i + 1 + this.nowpaging;
					}
					this.pagess = res.page;
					this.tableData = res.result;
				});

			},

			handleClose(done) {

				this.$confirm("确认关闭？")

					.then(_ => {

						done();

					})

					.catch(_ => {});

			},
			dialogVisibleopen() {
				this.dialogVisible = true;
			},
			//创建取消
			cancelone(formName) {
				this.dialogVisible = false;
				this.$refs[formName].resetFields();
			},

			submitForm(formName) {

				this.$refs[formName].validate(valid => {

					if(valid) {

						let url = "/apis/users";

						axiosPostAPI(url, this.result).then(res => {
							this.$message({
								showClose: true,
								message: '创建成功',
								type: 'success',
								duration: 3000
							});

							this.dialogVisible = false;

							this.getuser();

							this.result.userName = "";

							this.result.password = "";

							this.result.mobile = "";

							this.result.email = "";

							this.result.company = "";

							this.result.trialDay = "";

							this.trial = "true";
						});

					}

				});

			},

			//分页

			handleSizeChange: function(size) {

				this.pagesize = size;

			},

			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				this.nowpaging = (this.currentPage - 1) * 10;
				this.getuser()
			},

			//进入个人应用

			enterone(userId) {

				var url = "/apis/users/" + userId;

				axiosGetAPI(url).then(res => {

					var objtwo = res.result;

					localStorage.setItem("usercenter", JSON.stringify(objtwo));
					localStorage.setItem('registeruserId', JSON.stringify(userId))
					this.$router.push({
						//						path: "/main/personal"
						name: "Personal",
						params: {
							userId: userId
						}
					});

				});

			},

			//using启用

			using(id) {

				var url = "/apis/users/" + id + "/status?disable=false";

				axiosPutAPI(url).then(res => {

					this.getuser();

				});

			},

			forbidden(id) {

				var url = "/apis/users/" + id + "/status?disable=true";

				axiosPutAPI(url).then(res => {

					this.getuser();

				});
			}

		}

	};
</script>

<style scoped>
	.usecontrol .el-button {
		padding: 12px 20px;
	}
	
	.usecontrol .el-form-item {
		margin-bottom: 19px;
		margin-left: 50px;
	}
	
	.usecontrol .el-dialog__body .el-button {
		padding: 12px 45px;
	}
	
	.usecontrol .el-dialog__body {
		padding-left: 50px;
	}
	
	.black {
		color: #323c4d;
	}
	
	.gayss {
		color: #b0b9cd;
	}
	
	.hasMore {
		text-align: center;
		margin-left: -250px;
	}
</style>