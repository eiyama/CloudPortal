<template>
	<div class="center page">
		<p class="title">管理中心</p>

		<div class="guanli">

			<div class="center-left">

				<p>开发者用户</p>

				<h3>{{usernum}}</h3>

				<router-link to="/main/usecontrol"><span class="chakan">查看</span></router-link>

			</div>

			<div class="center-left">

				<p>已创建应用</p>

				<h3>{{appnum}}</h3>

				<router-link to="/main/manage"><span class="chakan">查看</span></router-link>

			</div>

		</div>
	</div>
</template>

<script>
	import { axiosPostAPI, axiosGetAPI, axiosPutAPI } from "../../common/Axios";
	export default {

		data() {

			return {
				appnum: "",

				usernum: ""
			};
		},

		created() {
			var url = "/apis/apps";

			axiosGetAPI(url).then(res => {
				this.appnum = res.page.totalRows;
			});

			var url = "/apis/users";

			axiosGetAPI(url).then(res => {
				this.usernum = res.page.totalRows;
			});
		}
	};
</script>
<style>
	.center .guanli {
		width: 916px;
		height: 150px;
	}
	
	.center h2 {
		font-size: 22px;
		color: #323c4d;
		letter-spacing: 0;
		font-weight: normal;
		padding-bottom: 30px;
	}
	
	.center-left {
		float: left;
		width: 300px;
	}
	
	.center-left p {
		font-size: 16px;
		color: #757e97;
		letter-spacing: 0;
		line-height: 25px;
	}
	
	.center-left h3 {
		font-size: 40px;
		color: #323c4d;
		letter-spacing: 0;
		font-weight: 500;
		line-height: 60px;
	}
	
	.chakan:hover {
		cursor: pointer;
	}
	
	p {
		font-size: 14px;
		color: #757e97;
	}
	
	nowu {
		margin: 0 auto;
	}
</style>