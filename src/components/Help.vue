<template>
    <div id="help">
        <div class="nav-bar help-navbar">
            <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
            <div class="nav-title" v-if="title">{{title}}</div>
        </div>
        <div class="help-lists">
            <router-link v-for="(item,index) in articleLists" :to="'/helpDetail?id='+ item.articleId+'&title='+title" :key="index" class="list-item">
                <div class="list-title">{{item.articleTitle}}</div>
            </router-link>
        </div>
    </div>
</template>
<script>
import { getArticleListByCategoryId } from '@/api/api'
export default {
    name: 'help',
    data: function() {
        return {
            articleLists: [],
            title: ''
        }
    },
    methods: {

    },
    created: function() {
        var articleCategoryId = this.$route.query.id;
        var title = this.$route.query.title;
        this.title = title;
        getArticleListByCategoryId({ params: { articleCategoryId: articleCategoryId } }).then(res => {
            console.log(res)
            this.articleLists = res.list
        })
    }
}

</script>
<style soped>
#help {
    min-height: 100%;
    background-color: #f2f2f2;
}

.help-lists {
    margin: 2.66vw 0;
    background-color: #fff;
}

.list-item {
    display: block;
    height: 10.66vw;
    line-height: 10.66vw;
    padding: 0 2.66vw;
    border-bottom: 1px solid #f2f2f2;
    text-decoration: none;
    position: relative;
}

.list-item:after {
    content: '';
    display: inline-block;
    width: 2vw;
    height: 3.73vw;
    background: url(../assets/images/list-more.png) no-repeat center center;
    background-size: cover;
    position: absolute;
    right: 2.66vw;
    top: 50%;
    margin-top: -1.86vw;
}

.list-title {
    font-size: 4.26vw;
    color: #333;
}

</style>
