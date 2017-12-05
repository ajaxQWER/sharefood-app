<template>
    <div id="agreement">
        <div class="agreement-header">
            <div class="nav-bar help-navbar">
                <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
                <div class="nav-title">商家入驻告知书</div>
            </div>
        </div>
        <div class="agreement-lists">
            <div class="help-contain" v-if="article">
                <h3 class="article-title">{{article.articleTitle}}</h3>
                <p class="article-content" v-html="formatContent(article.articleContent)"></p>
            </div>
        </div>
    </div>
</template>
<script>
    import { getAgreementArticleById } from '@/api/api'
    export default {
        name: 'agreement',
        data: function() {
            return {
                article: null
            }
        },
        methods: {
            formatContent: function(content) {
                return content.replace(/\n/g, '<br>')
            }
        },
        created: function() {
            try {
                getAgreementArticleById().then(res => {
                    console.log(res)
                    this.article = res;
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

</script>
<style soped>
    #agreement {
        min-height: 100%;
        background-color: #f2f2f2;
    }

    .agreement-lists {
        margin: 2.66vw 0;
        background-color: #fff;
    }

    .help-contain {
        padding: 5.33vw 2.66vw;
    }

    .article-title {
        font-size: 4vw;
        line-height: 2;
        margin: 0;
    }

    .article-content {
        font-size: 3.73vw;
    }

</style>
