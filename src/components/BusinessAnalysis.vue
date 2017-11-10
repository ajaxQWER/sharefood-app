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
          <div class="column-item flex-1">
            <img src="" alt="">
            <div class="column-name">新客户</div>
          </div>

          <div class="column-item flex-1">
            <img src="" alt="">
            <div class="column-name">订单量</div>
          </div>

          <div class="column-item flex-1">
            <img src="" alt="">
            <div class="column-name">营业额</div>
          </div>

        </div>
        <div class="column flex">
          <div class="column-item flex-1">
            <img src="" alt="">
            <div class="column-name">销售量</div>
          </div>

          <div class="column-item flex-1">
            <img src="" alt="">
            <div class="column-name">销售量排行</div>
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
  }
  .column-item:nth-child(3n+2){
    margin: 0 2.67vw;
  }
  .column-item img{
    width: 13.73vw;
    height: 13.73vw;
    border-radius: 100%;
    margin: 5.06vw auto;
  }
  .column-name{
    font-size: 3.73vw;
    text-align: center;
  }
  .column-null{
    background-color: #f2f2f2;
  }
</style>
