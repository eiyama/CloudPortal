<template>
	<div class="usercenter page">

		<div v-if="isAdministrator">

			<span class="fanhui" @click="backone" style="display: inline-block;"><i class="el-icon-arrow-left"></i>返回</span>

			<h2 class="title" style="margin-top: 0;padding-top: 0;">用户管理</h2>

		</div>

		<h2 class="title" v-if="isAdministrator==false">用户中心</h2>

		<div class="usergay">

			<div class="useleft">

				<p>账号名：{{obj.userName}}</p>

				<span style="color: #757E97;font-size: 12px;">状态：{{obj.status.display}}<span v-if="obj.status.text=='Trial'">(剩余{{obj.trialDay}}天)</span></span>

			</div>

			<h4 class="userright"><span @click="amend"><i class="el-icon-edit"></i>修改</span></h4>

		</div>

		<div style="height: 50px;line-height: 50px;width: 910px;border-bottom: 1px solid #F5F7F9;">

			<div class="userright">

				<span style="cursor: pointer;margin-right: 15px;" @click="entire">全部应用</span>

			</div>

		</div>

	</div>
</template>

<script>
	import {
		axiosPostAPI,
		axiosGetAPI,
		axiosPutAPI

	} from "../../common/Axios";
	export default {

		data() {

			return {
				obj: {
					userName: '',
					status: {
						display: '',
						text: ''
					},
					trialDay: ''

				},

				isAdministrator: ''

			};

		},

		created() {

			var obj = JSON.parse(localStorage.getItem('usercenter'));
			this.obj = obj;
			this.isAdministrator = JSON.parse(localStorage.getItem('isAdministrator'));
			this.obj.id=JSON.parse(localStorage.getItem('userId'));
			var url = "/apis/users/" + this.obj.id;
			axiosGetAPI(url).then(res => {
				this.obj = res.result;
			});

		},

		methods: {

			amend() {

				localStorage.setItem('registeruserId', JSON.stringify(this.obj.id))

				this.$router.push({

					path: "/main/personal"

				});

			},

			backone() {

				window.history.back();

			},

			entire() {

				var obj = {};

				obj.userName = this.obj.userName;

				this.$router.push({

					path: "/main/manage",

					query: obj

				});

			}

		}

	}
</script>

<style>
	.usercenter .usergay {
		background: #F5F7F9;
		border-radius: 4px;
		width: 910px;
		height: 80px;
	}
	
	.usercenter .useleft {
		float: left;
	}
	
	.usercenter .useleft {
		margin-top: 16px;
		margin-left: 17px;
	}
	
	.usercenter .useleft p {
		margin-bottom: 5px;
		font-size: 16px;
		color: #323C4D;
	}
	
	.usercenter .userright {
		float: right;
		font-size: 14px;
	}
	
	.usercenter .el-icon-edit {
		color: #B0B9CD;
	}
	
	.usercenter h4 {
		font-size: 14px;
		margin-right: 30px;
		font-weight: normal;
		line-height: 80px;
	}
	.usercenter h4 span {
		cursor: pointer;
	}
</style>