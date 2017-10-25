<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
}

</script>
<style>
body,
html {
  height: 100%;
  background-color: #fafafa;
  -webkit-overflow-scrolling: touch;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}
body {
    margin: 0;
    font-size: 14px;
    font-family: Helvetica Neue,Helvetica,STHeiTi,Arial,sans-serif;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  margin: 0;
  padding: 0;
}
.flex {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    display: box;
    display: -webkit-flex;
    display: flex;
}

.flex-1 {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-box-flex: 1;
    box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}
.top-bg{
  width: 100vw;
  height: 59.73vw;
  background: url(assets/images/top-bg.png) no-repeat center center;
  background-size: 100% 100%;
}
.nav-bar{
  height: 11.73vw;
  overflow: hidden;
  zoom: 1;
}

.help-navbar{
  background: url(assets/images/help-navbar.jpg) no-repeat center center;
  background-size: 100% 100%;
}

.nav-title{
  float: left;
  width: 82.93vw;
  height: 100%;
  line-height: 100%;
  text-align: center;
  font-size: 4.66vw;
  color: #fff;
  line-height: 11.73vw;
}
.back{
  float: left;
  width: 3.06vw;
  height: 5.6vw;
  margin: 3.065vw 2.66vw;
}
.back img{
  height: 100%;
}
</style>
