<template>
  <div id="notice">
    <div class="notice-header">
      <div class="nav-bar help-navbar">
        <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
        <div class="nav-title">通知中心</div>
      </div>
    </div>
    <div class="notice-content">
      <div v-if="!isEmpty">
        <ul class="notice-lists">
          <li class="notice-item" v-for="(item,index) in noticeList" :key="index">
            <div class="notice-info">
              <div class="notice-icon">
                <img src="../assets/images/notice.png" alt="">
              </div>
              <div class="info">
                <p class="name-time">
                  <span class="name">{{item.title}}</span>
                  <span class="time">{{moment(item.createTime).format('MM-DD hh:mm')}}</span>
                </p>
                <p class="desc">{{item.content}}</p>
              </div>
            </div>
            <div class="delete-btn" @click="deleteNotice(item.noticeId,index)">删除</div>
          </li>
        </ul>
        <div v-show="canLoad" class="loadmore" @click="loadBottom">点击加载</div>
      </div>
      <div v-else class="empty">
        <img src="../assets/images/empty-img.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import {getNoticeLists,deleteNoticeById} from '@/api/api';
  export default {
    name: 'notice',
    data: function(){
      return {
        init: true,
        allLoaded: false,
        current: 1,
        pageId: 1,
        counts: 0,
        canLoad: false,
        noticeList: null,
        isEmpty: false
      }
    },
    created: function(){
      this.getNoticeList({pageId: this.pageId});
    },
    methods: {
      getNoticeList: function(notice){
        this.$indicator.open();
        getNoticeLists({params: {pageSize: 10, pageId: notice.pageId}}).then(res=>{
          console.log(res);
          if(this.init){
            this.noticeList = res.list;
          }else{
            this.noticeList = [].concat.apply(this.noticeList,res.list);
          }
          this.counts = res.count;
          this.$indicator.close();
          if(res.count == 0){
            this.allLoaded = true;
            this.isEmpty = true
          }else{
            this.canLoad = true;
            this.isEmpty = false
          }

          if(Math.ceil(this.counts / 10) == this.pageId){
            this.allLoaded = true;
            this.canLoad = false;
            return;
          }
        })
      },
      loadBottom: function(){
        this.allLoaded = false;
        this.pageId += 1;
        this.init = false;
        this.getNoticeList({pageId: this.pageId})
      },
      deleteNotice: function(id,index){
        this.$messagebox.confirm('确定删除该通知?').then(action => {
          console.log(id,index);
          deleteNoticeById(id,index).then(() => {
            this.$toast({message:'删除成功',duration: 1000});
            this.noticeList.splice(index,1);

            if(this.noticeList.length == 0){
              this.isEmpty = true;
            }
          })
        }).catch(() => {
          this.$toast({message:'已取消',duration: 1000})
        });
      }
    }
  }
</script>
<style scoped>
  #notice {
    min-height: 100%;
    background-color: #f2f2f2;
  }
  .notice-header {
    width: 100%;
    position: fixed;
    z-index: 999;
  }
  .notice-content {
    padding: 12vw 0 0;
  }
  .notice-lists{
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: #fff;
  }
  .notice-item{
    overflow: hidden;
    zoom: 1;
    height: 18vw;
    font-size: 4.26vw;
  }
  .notice-item:not(:last-child){
    border-bottom: 1px solid #eee;
  }
  .notice-info{
    width: 80vw;
    height: 18vw;
    float: left;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .notice-icon{
    width: 10.66vw;
    height: 5.6vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .notice-icon img{
    width: 5.6vw;
    height: 5.6vw;
    border-radius: 2px;
  }
  .info{
    width: 67vw;
    padding-right: 2.24vw;
    float: left;
  }
  .name-time,.desc{
    margin: 0 0 2px;
    overflow: hidden;
  }
  .name-time{
    line-height: 5vw;
  }
  .desc{
    float: none;
    font-size: 2.93vw;
    color: #999;
    line-height: 4vw;
  }
  .name{
    display: inline-block;
    float: left;
    font-size: 3.73vw;
    color: #666;
  }
  .time{
    display: inline-block;
    float: right;
    font-size: 2.93vw;
    color: #999;
  }
  .delete-btn{
    width: 20vw;
    float: left;
    text-align: center;
    line-height: 18vw;
    background-color: #ef4f4f;
    color: #fff;
  }
  .loadmore{
    text-align: center;
    padding: 2.66vw;
  }
</style>
