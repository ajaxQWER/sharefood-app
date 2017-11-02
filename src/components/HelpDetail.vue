<template>
  <div id="help">
	<div class="nav-bar help-navbar">
	  <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
	  <div class="nav-title">登录遇到问题</div>
	</div>
	<div class="help-lists">
		<div class="help-contain" v-if="article">
			<h3 class="article-title">{{article.articleTitle}}</h3>
			<p class="article-content" v-html="formatContent(article.articleContent)"></p>
		</div>
	</div>
  </div>
</template>
<script>
import {getArticleById} from '@/api/api'
export default {
  name: 'help',
  data: function() {
	return {
		article: null
	}
  },
  methods: {
  	formatContent: function(content){
  		return content.replace(/\n/g,'<br>')
  	}
  },
  created: function(){
  	var articleId = this.$route.query.id;
  	try{
  		getArticleById(articleId).then(res => {
  			console.log(res)
  			this.article = res;
  		})
  	}catch(e){
  		console.log(e)
  	}
  }
}

</script>
<style soped>
#help{
	min-height: 100%;
	background-color: #f2f2f2;
}
.help-lists{
	margin: 2.66vw 0;
	background-color: #fff;
}
.help-contain{
	padding: 5.33vw 2.66vw;
}
.article-title{
	font-size: 4vw;
	line-height: 2;
	margin: 0;
}
.article-content{
	font-size: 3.73vw;
}
</style>
