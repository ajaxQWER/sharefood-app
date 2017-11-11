<template>
  <div id="analysis">
    <div class="analysis-header">
      <div class="nav-bar help-navbar">
          <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
          <div class="nav-title">营业分析</div>
      </div>
    </div>
    <div class="analysis-content">
      <div class="column-wrap">
        <div class="column flex">
          <router-link to="/customerTendency" class="link">
            <div class="column-item flex-1">
              <img src="../assets/images/new-customer.png" alt="">
            </div>
          </router-link>


          <div class="column-item flex-1">
            <img src="../assets/images/order.png" alt="">
          </div>

          <div class="column-item flex-1">
            <img src="../assets/images/business-volume.png" alt="">
          </div>

        </div>
        <div class="column flex">
          <div class="column-item flex-1">
            <img src="../assets/images/sales.png" alt="">
          </div>

          <div class="column-item flex-1">
            <img src="../assets/images/sales-rank.png" alt="">
          </div>
          <div class="column-item flex-1 column-null"></div>

        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #analysis{
    min-height: 100%;
    background-color: #f2f2f2;
    overflow: hidden;
  }
  .analysis-header{
    width: 100%;
  }
  .analysis-content{
    padding: 2.67vw;
  }
  .column-wrap{
    background-color: #f2f2f2;
    padding-bottom: 4vw;
  }
  .column{
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 2.67vw;
  }
  .column-item{
    width: 29.73vw;
    height: 30.13vw;
    background-color: #fff;
    border-radius: 2px;
  }
  .column-item:nth-child(3n+2){
    margin: 0 2.67vw;
  }
  .column-item img{
    width: 29.73vw;
    height: 30.13vw;
  }
  .column-null{
    background-color: #f2f2f2;
  }
</style>
