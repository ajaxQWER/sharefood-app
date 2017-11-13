<template>
  <div id="activity">
    <div class="activity-header">
      <div class="nav-bar help-navbar">
        <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
        <div class="nav-title">添加活动</div>
      </div>
    </div>
    <div class="activity-content">
      <div class="column-wrap">
        <div class="column flex">
          <!--<router-link to="/customerTendency" class="link">-->
            <div class="column-item flex-1">
              <img src="../assets/images/full-send.png" alt="">
            </div>
          <!--</router-link>-->
          <!--<router-link to="/orderQuantity" class="link">-->
            <div class="column-item flex-1">
              <img src="../assets/images/first-reduce.png" alt="">
            </div>
          <!--</router-link>-->
          <!--<router-link to="/turnover" class="link">-->
            <div class="column-item flex-1">
              <img src="../assets/images/full-reduce.png" alt="">
            </div>
          <!--</router-link>-->
        </div>
        <div class="column flex">
          <!--<router-link to="/salesVolume">-->
            <div class="column-item flex-1">
              <img src="../assets/images/bargain-goods.png" alt="">
            </div>
          <!--</router-link>-->
          <!--<router-link to="/salesRank">-->
            <div class="column-item flex-1">
              <img src="../assets/images/discount-goods.png" alt="">
            </div>
          <!--</router-link>-->
          <!--<router-link to="/salesRank">-->
          <div class="column-item flex-1">
            <img src="../assets/images/else-goods.png" alt="">
          </div>
          <!--</router-link>-->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #activity {
    min-height: 100%;
    background-color: #f2f2f2;
  }

  .activity-header {
    width: 100%;
  }

  .activity-content {
    margin-top: 2.66vw;
    height: 69.33vw;
  }

  .column-wrap {
    background-color: #fff;
    padding: 2.66vw 3.73vw;
  }

  .column {
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 2.67vw;
  }
  .column:last-child{
    margin-bottom: 0;
  }
  .column-item {
    width: 30.13vw;
    height: 27.46vw;
    border-radius: 2px;
  }

  .column-item {
    margin: 0 2vw 0 0;
  }

  .column-item img {
    width: 30.13vw;
    height: 27.46vw;
  }

  .column-null {
    background-color: #f2f2f2;
  }

</style>
