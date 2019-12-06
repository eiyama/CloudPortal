<template>
	<div class="mainone">
		<el-header>
		
			<div class="main">
				<div class="head-left">
					<img v-bind:src="'../../../static/images/' + $domain + '.png'" style="margin-top: 24px;" />
					<h2>开发者平台</h2>
				</div>
				<div class="head-right">
					<ul>
						<li>
							<a v-bind:href="'http://apis.' + $domain + '.com/doc/'" target="_blank">文档</a>
						</li>
						<!--<li><span style="cursor:pointer" @click="developing">社区</span></li>-->
						<!--<li><span style="cursor:pointer" @click="developing">管理中心</span></li>-->
						<li>
							<el-dropdown >
								<span class="el-dropdown-link" style='height: 80px;display: block;padding-left:5px ;'>
		 	 						<img style="height: 30px;width: 30px;" src="../../../static/images/uesr_default.png"/>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>
										<p @click="persondetail"><i class="iconfont icon-icon" style="margin-right: 2px;"></i>个人信息</p>
									</el-dropdown-item>
									<el-dropdown-item>
										<p @click="tiao"><i class="iconfont icon-tuichu" style="margin-right: 2px;"></i>退出</p>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</li>
					</ul>
				</div>
			</div>
		</el-header>
		<div class="bian" style="background: #F5F5F5;">
		<div class="main">
			<el-container>
				<el-main>
					<div class="rout">
						<!--<router-link to="/main/usercenter" class="tab" v-if='userinfo'>
							<p class="router">用户中心</p>
						</router-link>-->
						<router-link to="/main/center" class="tab" v-if="this.getdata.isAdministrator">
							<p class="router">管理中心</p>
						</router-link>
						<router-link to="/main/usecontrol" class="tab" v-if="this.getdata.isAdministrator">
							<p class="router">用户管理</p>
						</router-link>
						<router-link to="/main/manage" class="tab">
							<p class="router">应用管理</p>
						</router-link>
					</div>
					<!--<keep-alive>-->
					<router-view></router-view>
					<!--</keep-alive>--> 
				</el-main>
			</el-container>
			
		</div>
		</div>
		
		<el-footer>
			<p>Copyright © 2018 {{$corp}}. All Rights Reserved</p>
		</el-footer>
		
	</div>
</template>

<script>
	import axios from "axios";
	import Personal from "../../components/user/Personal.vue";
	import Manage from "../../components/user/Manage.vue";
	import Usecontrol from "../../components/user/Usecontrol.vue";
	import Center from "../../components/management/Center.vue";
	import {axiosPostAPI,axiosGetAPI,axiosPutAPI,axiosDeleteAPI} from "../../common/Axios";

	export default {
		data() {
			return {
				userinfo: false,

				tabPosition: "left",

				getdata: "",

				userId: ""
			};
		},

		created() {
			var obj = JSON.parse(localStorage.getItem("register"));

			this.userId = obj.userId;

			var url = "/apis/users/" + obj.userId;

			axiosGetAPI(url).then(res => {
				if(res.result.isAdministrator == false) {
					this.userinfo = true;

					this.$router.push({
						path: "/main/manage"
					});
				} else {
					this.$router.push({
						path: "/main/center"
					});
				}

				this.getdata = res.result;

				var objtwo = res.result;

				localStorage.setItem(
					"isAdministrator",

					JSON.stringify(objtwo.isAdministrator)
				);
				localStorage.setItem("userId", JSON.stringify(objtwo.id));
				localStorage.setItem("usercenter", JSON.stringify(objtwo));
			});
		},

		methods: {
			tiao: function() {
				this.$router.push({
					path: "/"
				});
			},
			persondetail() {
				this.$router.push({
					path: "/main/usercenter"
				});
			}
		}
	};
</script>

<style scoped>
.mainone .head-right li:last-child img {
	transform: translateY(8px);
}

.mainone .el-main .el-container h2 {
	width: 206px;
	text-align: center;
	font-family: PingFangSC-Regular;
	font-size: 18px;
	color: #757e97;
	font-weight: normal;
	line-height: 25px;
	padding-top: 30px;
}

.mainone .el-main .min-top p {
	width: 206px;
	text-align: center;
	color: #d9dde7;
	padding-bottom: 8px;
}

.mainone .el-main .min-top {
	position: absolute;
	z-index: 10;
	background: #fbfbfb;
	height: 87px;
}

.mainone .el-dropdown-menu {
	position: absolute;
	top: 50px !important;
}

.mainone .el-dropdown-link {
	margin-right: 10px;
	cursor: pointer;
}
.el-popper[x-placement^=bottom]{top: 68px !important;} 
	
</style>