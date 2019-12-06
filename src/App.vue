<template>
	<div id="root">
		<el-container>
			<el-header>
				<div class="main">
					<div class="head-left">
						<img v-bind:src="'../static/images/' + $domain + '.png'" style="margin-top: 24px;"/>
						<h2>开发者平台</h2>
					</div>
					<div class="head-right">
						<ul>
							<li><a v-bind:href="'http://apis.' + $domain + '.com/doc/'" target="_blank">文档</a></li>
							<!--<li><span style="cursor:pointer" @click="developing">社区</span></li>-->
							<!--<li class="head-last"><span style="cursor:pointer" @click="developing">账号申请</span></li>-->
						</ul>
					</div>
				</div>
			</el-header>
			<el-main>
				<keep-alive>
					<router-view></router-view>

				</keep-alive>
			</el-main>
			<div class="di">
				<el-footer>
					<p style="margin-bottom:10px" >Copyright © 2018 {{$corp}}. All Rights Reserved</p>
				</el-footer>
			</div>
		</el-container>
	</div>
</template>
<script>
	export default {
		data() {
			return {
	
			}
		},
		created() {
			// document.title = this.$site;	
		},
		methods:{
			
		}
	}
</script>

<style>
.below ul li{float: left;width: 224px;margin: 0 auto;width: 1200px;}
	 
</style>
<!--{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }
  ],
    "stage-2"
  ],
  "plugins": ["transform-vue-jsx", "transform-runtime"]
}-->
