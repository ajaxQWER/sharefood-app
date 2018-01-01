<template>
    <div id="goodsDetail">
        <div class="goodsDetail-header">
            <div class="nav-bar help-navbar">
                <div class="back" @click="goodsGoBack"><img src="../assets/images/white-back.png" alt=""></div>
                <div class="nav-title">编辑商品</div>
            </div>
        </div>
        <div class="goodsDetail-content">
            <div class="content">
                <div class="goods-item">
                    <div class="row-title">商品图片</div>
                    <div class="row-value upload-img">
                        <img class="goods-imgage" :src="headerImage?headerImage:''" alt="">
                    </div>
                    <div class="row-value upload-img upload">
                        <div class="upload-bg"></div>
                        <input class="upload-btn" type="file" id="change" @change="change" ref="uploads" accept="image/*">
                        <label for="change"></label>
                    </div>
                </div>
                <div class="goods-item">
                    <div class="row-title">商品名称</div>
                    <div class="row-value">
                        <input type="text" placeholder="请输入商品名称" v-model="newGoods.info.goodsName" maxlength="12" @blur="savaGoodsName">
                    </div>
                </div>
                <router-link :to="'/setGoodsCategory?goodsId='+goodsId+'&goodsCategoryList='+JSON.stringify(newGoods.goodsCategoryIdList)" class="jump">
                    <div class="goods-item">
                        <div class="row-title">商品分类</div>
                        <div class="row-value value-after">{{goodsClassNames}}</div>
                    </div>
                </router-link>
                <div class="goods-standard">
                    <div class="standard-row">
                        <div class="row-title">商品规格</div>
                        <router-link to="/addGoodsSpecifications" class="standard-jump">添加规格</router-link>
                    </div>
                    <div v-if="newGoods.addSpecs">
                        <div class="standard-content" v-for="(item,index) in newGoods.addSpecs" :key="index">
                            <div class="standard-item">
                                <div class="standard-index">规格{{index+1}}</div>
                                <div class="standard-operation">
                                    <router-link :to="'/addGoodsSpecifications?id='+item.goodsSpecificationId+'&index='+index+'&item=' + JSON.stringify(item)">
                                        <button class="standard-btn update-standard-btn">修改</button>
                                    </router-link>
                                    <button class="standard-btn delete-standard-btn" @click="deleteStandardByIndex(index)">删除</button>
                                </div>
                            </div>
                            <div class="standard-item-row">
                                <div class="standard-key">规格名称：{{item.goodsSpecificationName}}</div>
                            </div>
                            <div class="standard-item-row">
                                <div class="standard-key">价格：{{item.goodsSpecificationPrice}}</div>
                                <div class="standard-value">库存：{{item.infiniteInventory?'无限':item.stock}}</div>
                            </div>
                            <div class="standard-item-row">
                                <div class="standard-key">餐盒数量：{{item.boxesNumber}}</div>
                                <div class="standard-value">餐盒价格：{{item.boxesMoney}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="goods-standard">
                    <div class="standard-row">
                        <div class="row-title">商品属性</div>
                        <router-link to="/goodsProperties" class="standard-jump">添加属性</router-link>
                    </div>
                    <div v-if="newGoods.goodsPropertys">
                        <div class="standard-content" v-for="(item,index) in newGoods.goodsPropertys" :key="index">
                            <div class="standard-item">
                                <div class="standard-index">属性{{index+1}}</div>
                                <div class="standard-operation">
                                    <router-link :to="'/goodsProperties?index='+index+'&item=' + JSON.stringify(item)">
                                        <button class="standard-btn update-standard-btn">修改</button>
                                    </router-link>
                                    <button class="standard-btn delete-standard-btn" @click="deletePropsByIndex(index)">删除</button>
                                </div>
                            </div>
                            <div class="standard-item-row">
                                <div class="standard-key">属性名称：{{item.goodsPropertyName}}</div>
                            </div>
                            <div v-if="item.goodsPropertyValueList.length" class="standard-item-row">
                                <div class="goods-property" v-for="(prop,propIndex) in item.goodsPropertyValueList" :key="propIndex">{{prop.value}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="goods-item">
                    <div class="row-title">商品特色</div>
                    <div class="row-value">
                        <div class="goods-property" v-for="(item,index) in goodsFeatures" :key="index" @click="setGoodsFeature(item.value)">{{item.label}}</div>
                    </div>
                </div> -->
                <div class="goods-item">
                    <div class="row-title">商品状态</div>
                    <div class="row-value">
                        <label for="up">
                            <input class="radio" type="radio" name="automatic" id="up" value="SOLD_OUT" v-model="newGoods.info.goodsStatus">下架</label>
                        <label for="down">
                            <input class="radio" type="radio" name="automatic" id="down" value="PUTAWAY" v-model="newGoods.info.goodsStatus">上架</label>
                    </div>
                </div>
                <div class="goods-item">
                    <div class="row-title">商品简介</div>
                    <div class="row-value">
                        <textarea class="goods-intro" placeholder="最多255字" name="" id="" maxlength="255" v-model="newGoods.info.goodsContent" @blur="savaGoodsIntro"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="save-goods" @click="updateGoods">保存</div>
        <mt-popup v-model="popupVisible" position="bottom">
            <!-- 遮罩层 -->
            <div class="container">
                <div>
                    <img id="image" :src="url">
                </div>
                <button type="button" id="buttonCancel" @click="cancel">取消</button>
                <button type="button" id="button" @click="crop">确定</button>
            </div>
            <div class="upload-wrap">
                <!-- <div class="close-popup" @click="closePopup">x</div>
                <div class="upload-bg"></div>
                <input class="upload-btn" type="file" id="change" @change="change" ref="uploads" accept="image/*">
                <label for="change"></label> -->
            </div>
        </mt-popup>
        <!--  <mt-popup v-model="goodsCategoryPopup" position="right" class="mint-popup-3" :modal="false">
            <div class="goodsDetail-header">
                <div class="nav-bar help-navbar">
                    <div class="back" @click="closeGoodsCategoryPopup"><img src="../assets/images/white-back.png" alt=""></div>
                    <div class="nav-title">商品分类</div>
                </div>
            </div>
            <div class="category-content">
                <mt-checklist align="right" class="page-part" :max="5" v-model="goodsCategoryList" :options="options">
                </mt-checklist>
            </div>
            <div class="saveBusiness" @click="saveBusiness">保存</div>
        </mt-popup> -->
    </div>
</template>
<script>
import Cropper from 'cropperjs'
import { getGoodsById, updateGoodsById, addGoods, getGoodsCategoryLists, uploadFiles } from '@/api/api'
export default {
    name: 'goodsDetail',
    data: function() {
        return {
            popupVisible: false,
            headerImage: '',
            picValue: '',
            cropper: '',
            croppable: false,
            url: '',
            newGoods: {
                info: {
                    goodsContent: "",
                    goodsImgUrl: "",
                    goodsName: "",
                    goodsStatus: "SOLD_OUT",
                },
                goodsCategoryIdList: [],
                goodsPropertys: [],
                addSpecs: []
            },
            goodsId: 0,
            goodsClassNames: '',
            goodsCategoryList: [],
            standardObj: null,
            propObj: null,
            deleteStandardObj: [],
            goodsFeatures: [{
                label: '无',
                value: ''
            }, {
                label: '招牌',
                value: ''
            }, {
                label: '新品',
                value: 'new'
            }]
        }
    },
    created: function() {
        var goodsId = this.$route.query.goodsId;
        var standardObj;
        var propObj;
        var goodsCategory;
        var goodsImgUrl;
        var goodsName;
        var goodsStatus;
        var goodsContent;
        var deleteStandardObj;

        if (goodsId) {
            this.$indicator.open();
            getGoodsById(goodsId).then(res => {
                console.log(res)
                this.goodsId = res.goodsId;
                this.goodsClassNames = res.goods.goodsClassNames;

                //规格
                standardObj = JSON.parse(localStorage.getItem('standardObj')) || [];
                if (standardObj.length) {
                    this.standardObj = standardObj;
                } else {
                    this.standardObj = [].concat(standardObj, res.goods.goodsSpecifications);
                }
                localStorage.setItem('standardObj', JSON.stringify(this.standardObj))

                //属性
                propObj = JSON.parse(localStorage.getItem('propObj')) || [];
                if (propObj.length) {
                    this.propObj = propObj;
                } else {
                    this.propObj = [].concat(propObj, res.goods.goodsPropertys);
                }
                localStorage.setItem('propObj', JSON.stringify(this.propObj))

                //分类
                goodsCategory = JSON.parse(localStorage.getItem('goodsCategory')) || [];
                if (goodsCategory.length) {
                    this.goodsCategoryList = goodsCategory;
                } else {
                    this.goodsCategoryList = [].concat(goodsCategory, res.goodsCategoryIdList);
                }
                localStorage.setItem('goodsCategory', JSON.stringify(this.goodsCategoryList))

                //删除的规格
                deleteStandardObj = JSON.parse(localStorage.getItem('deleteStandardObj')) || [];
                this.deleteStandardObj = deleteStandardObj;
                localStorage.setItem('deleteStandardObj', JSON.stringify(this.deleteStandardObj))

                //图片
                goodsImgUrl = localStorage.getItem('goodsImgUrl') || res.goods.goodsImgUrl;
                if (goodsImgUrl) {
                    this.headerImage = this.UPLOADURL + goodsImgUrl;
                } else {
                    this.headerImage = '';
                }
                this.newGoods.info.goodsImgUrl = goodsImgUrl;
                localStorage.setItem('goodsImgUrl', goodsImgUrl)

                //名称
                goodsName = localStorage.getItem('goodsName') || res.goods.goodsName;
                this.newGoods.info.goodsName = goodsName;
                localStorage.setItem('goodsName', goodsName)

                //备注
                goodsContent = localStorage.getItem('goodsContent') || res.goods.goodsContent;
                this.newGoods.info.goodsContent = goodsContent;
                localStorage.setItem('goodsContent', goodsContent)

                //状态
                goodsStatus = localStorage.getItem('goodsStatus') || res.goods.goodsStatus;
                this.newGoods.info.goodsStatus = goodsStatus;
                localStorage.setItem('goodsStatus', goodsStatus)


                this.newGoods = {
                    info: {
                        goodsContent: goodsContent,
                        goodsImgUrl: goodsImgUrl,
                        goodsStatus: goodsStatus,
                        goodsName: goodsName
                    },
                    goodsPropertys: this.propObj,
                    addSpecs: this.standardObj,
                    goodsCategoryIdList: this.goodsCategoryList
                }
                this.$indicator.close();
            })
        } else {
            standardObj = JSON.parse(localStorage.getItem('standardObj')) || [];
            propObj = JSON.parse(localStorage.getItem('propObj')) || [];
            goodsCategory = JSON.parse(localStorage.getItem('goodsCategory')) || [];
            goodsImgUrl = localStorage.getItem('goodsImgUrl') || '';
            goodsName = localStorage.getItem('goodsName') || '';
            goodsStatus = localStorage.getItem('goodsStatus') || 'SOLD_OUT';
            goodsContent = localStorage.getItem('goodsContent') || '';

            this.newGoods.info.goodsContent = goodsContent;
            this.newGoods.info.goodsImgUrl = goodsImgUrl;
            this.newGoods.info.goodsStatus = goodsStatus;
            this.newGoods.info.goodsName = goodsName;
            this.newGoods.addSpecs = standardObj;
            this.newGoods.goodsPropertys = propObj;
            this.newGoods.goodsCategoryIdList = goodsCategory;
            if (goodsImgUrl) {
                this.headerImage = this.UPLOADURL + goodsImgUrl;
            }
        }

        this.formatGoodsClassName()
    },
    watch: {
        'newGoods.info.goodsStatus': function(newVal, oldVal) {
            this.newGoods.info.goodsStatus = newVal;
            localStorage.setItem('goodsStatus', newVal)
        }
    },
    mounted: function() {
        var self = this;
        var image = document.getElementById('image');
        this.cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            background: false,
            zoomable: false,
            dragMode: 'move',
            ready: function() {
                self.croppable = true;
            }
        });
    },
    methods: {
        goodsGoBack: function() {
            var action = confirm('返回将导致该商品数据清空,请谨慎操作');
            if (action) {
                this.removeGoodsInfo();
                this.$router.isBack = true;
                this.$router.back()
            }
        },
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic  
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)  
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome  
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        change(e) {
            this.popupVisible = true;
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;

            this.picValue = files[0];

            this.url = this.getObjectURL(this.picValue);
            //每次替换图片要重新得到新的url  
            if (this.cropper) {
                this.cropper.replace(this.url);
            }
        },
        crop() {
            this.popupVisible = false;
            if (!this.croppable) {
                return;
            }
            // Crop
            // console.log(this.cropper)
            // Round

            var croppedCanvas = this.cropper.getCroppedCanvas();
            var roundedCanvas = this.getRoundedCanvas(croppedCanvas);
            this.headerImage = roundedCanvas.toDataURL('image/jpeg', 0.6);

            //上传
            this.postImg()

        },
        getRoundedCanvas(sourceCanvas) {

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var originWidth = sourceCanvas.width;
            var originHeight = sourceCanvas.height;
            var maxWidth = 600;
            var maxHeight = 600;
            // 目标尺寸
            var targetWidth = originWidth;
            var targetHeight = originHeight;
            // 图片尺寸超过400x400的限制
            if (originWidth > maxWidth || originHeight > maxHeight) {
                if (originWidth / originHeight > maxWidth / maxHeight) {
                    // 更宽，按照宽度限定尺寸
                    targetWidth = maxWidth;
                    targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                } else {
                    targetHeight = maxHeight;
                    targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                }
            }
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            context.imageSmoothingEnabled = true;
            context.drawImage(sourceCanvas, 0, 0, targetWidth, targetHeight);
            context.globalCompositeOperation = 'destination-in';
            context.beginPath();
            // context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);  
            context.fill();

            return canvas;
        },
        postImg() {
            //这边写图片的上传
            // console.log(this.url) //原始blob图片
            // console.log(this.picValue) //原始formdata图片对象
            // console.log(this.headerImage) //base64图片

            //this.headerImage是base64的图片，转换为blob对象进行formdata对象上传
            var bytes = window.atob(this.headerImage.split(',')[1]); //去掉url的头，并转换为byte

            //处理异常,将ascii码小于0的转换为大于0
            var ab = new ArrayBuffer(bytes.length);
            // var ia = new Uint8Array(ab);
            // for (var i = 0; i < bytes.length; i++) {
            //     ia[i] = bytes.charCodeAt(i);
            // }

            var obj = new Blob([ab], { type: 'image/jpeg' })

            var fd = new FormData();

            //formdata对象第3个参数为文件名，不传则默认使用文件名，这里是blob对象所以需要加一个后缀
            fd.append('file', obj, '*.jpg');

            fd.path = '/goods'
            this.$indicator.open();
            uploadFiles(fd).then(data => {
                this.$indicator.close();
                console.log(data)
                this.$toast({
                    message: '图片上传成功',
                    duration: 1000
                })
                this.newGoods.info.goodsImgUrl = data.originalUrl;
                localStorage.setItem('goodsImgUrl', data.originalUrl);
                this.cancel()
            }).catch(err => {
                this.$indicator.close();
                console.log(err)
                this.$toast({
                    message: err,
                    duration: 1000
                })
            })
        },
        closePopup: function() {
            this.cancel()
        },
        cancel: function() {
            this.cropper.destroy()
            this.popupVisible = false;
            this.croppable = false;
            this.picValue = '';
            this.url = '';
            this.$refs.uploads.value = '';
        },
        formatGoodsClassName: function() {
            var currentGoodsCategory = JSON.parse(localStorage.getItem('goodsCategory')) || [];
            var storeGoodsCategoryList = JSON.parse(localStorage.getItem('goodsCategoryList')) || [];
            var tempGoodsCategoryIdList = {};
            storeGoodsCategoryList.forEach((item, index) => {
                tempGoodsCategoryIdList[item.goodsCategoryId] = item.goodsCategoryName
            })

            var names = [];
            for (var goodsCategoryId in tempGoodsCategoryIdList) {
                if (currentGoodsCategory.indexOf(parseInt(goodsCategoryId)) != -1) {
                    names.push(tempGoodsCategoryIdList[goodsCategoryId]);
                }
            }

            this.goodsClassNames = names.join("、");
        },
        updateGoods: function() {

            if (this.newGoods.info.goodsImgUrl == '') {
                this.$toast({ message: '请上传商品图片', duration: 1000 })
                return;
            }
            if (this.newGoods.info.goodsName == '') {
                this.$toast({ message: '请输入商品名称', duration: 1000 })
                return;
            }
            if (this.newGoods.goodsCategoryIdList.length == 0) {
                this.$toast({ message: '请选择商品分类', duration: 1000 })
                return;
            }

            //编辑
            if (this.goodsId) {

                if (this.newGoods.addSpecs.length == 0 && this.newGoods.deleteSpecIds.length != 0) {
                    this.$toast({ message: '请添加商品规格', duration: 1000 })
                    return;
                }

                var updateSpecs = [];
                var addSpecs = [];
                this.standardObj.forEach((item) => {
                    if (item.goodsSpecificationId) {
                        updateSpecs.push(item)
                    } else {
                        addSpecs.push(item)
                    }
                })
                var params = {
                    addSpecs: addSpecs,
                    deleteSpecIds: this.deleteStandardObj,
                    goodsCategoryIdList: this.newGoods.goodsCategoryIdList,
                    goodsPropertys: this.newGoods.goodsPropertys,
                    info: {
                        goodsContent: this.newGoods.info.goodsContent,
                        goodsImgUrl: this.newGoods.info.goodsImgUrl,
                        goodsName: this.newGoods.info.goodsName,
                        goodsStatus: this.newGoods.info.goodsStatus
                    },
                    updateSpecs: updateSpecs
                }

                console.log(params)
                // return

                this.$indicator.open();
                updateGoodsById(this.goodsId, params).then(() => {
                    this.$toast({ message: '操作成功', duration: 1000 })
                    this.removeGoodsInfo();
                    this.$indicator.close();
                    this.$router.isBack = true;
                    setTimeout(() => {
                        this.$router.back()
                    }, 1500)
                })
            } else {
                //新增
                if (this.newGoods.addSpecs.length == 0) {
                    this.$toast({ message: '请添加商品规格', duration: 1000 })
                    return;
                }
                this.$indicator.open();
                addGoods(this.newGoods).then(() => {
                    this.$toast({ message: '操作成功', duration: 1000 })
                    this.$indicator.close();
                    this.removeGoodsInfo();
                    this.$router.isBack = true;
                    setTimeout(() => {
                        this.$router.back()
                    }, 1500)
                })
            }
        },
        showGoodsCategoryPopup: function() {
            this.goodsCategoryPopup = true;
        },
        closeGoodscategoryPopup: function() {
            this.goodsCategoryPopup = false;
        },
        closeGoodsCategoryPopup: function() {
            this.goodsCategoryPopup = false;
        },
        deleteStandardByIndex: function(index) {
            var deleteProps = confirm('确定删除该规格?');
            if (deleteProps) {
                if (this.standardObj[index]['goodsSpecificationId']) {
                    this.deleteStandardObj.push(this.standardObj[index]['goodsSpecificationId'])
                    localStorage.setItem('deleteStandardObj', JSON.stringify(this.deleteStandardObj));
                }
                this.standardObj.splice(index, 1);
                localStorage.setItem('standardObj', JSON.stringify(this.standardObj));
                this.$toast({ message: '删除成功', duration: 1000 })
            }
        },
        deletePropsByIndex: function(index) {
            var deleteProps = confirm('确定删除该属性?');
            if (deleteProps) {
                this.propObj.splice(index, 1);
                localStorage.setItem('propObj', JSON.stringify(this.propObj));
                this.$toast({ message: '删除成功', duration: 1000 })
            }
        },
        savaGoodsName: function() {
            localStorage.setItem('goodsName', this.newGoods.info.goodsName)
        },
        savaGoodsIntro: function() {
            localStorage.setItem('goodsContent', this.newGoods.info.goodsContent)
        },
        removeGoodsInfo: function() {
            localStorage.removeItem('standardObj');
            localStorage.removeItem('propObj');
            localStorage.removeItem('goodsCategory');
            localStorage.removeItem('goodsCategoryList');
            localStorage.removeItem('goodsImgUrl');
            localStorage.removeItem('goodsName');
            localStorage.removeItem('goodsIntro');
            localStorage.removeItem('goodsStatus');
            localStorage.removeItem('goodsContent');
            localStorage.removeItem('deleteStandardObj');
        }
    }
}

</script>
<style scoped>
@import "/static/css/cropper.css";
#goodsDetail {
    min-height: 100%;
    background-color: #f2f2f2;
    overflow: hidden;
}

.goodsDetail-header {
    width: 100%;
    position: fixed;
}

.goodsDetail-content {
    box-sizing: border-box;
    height: 100vh;
    overflow: hidden;
    zoom: 1;
    padding-top: 11.73vw;
    padding-bottom: 13.2vw;
}

.content {
    height: 100%;
    overflow: scroll;
}

.goods-imgage {
    display: block;
    width: 100%;
    height: 100%;
    vertical-align: middle;
}

.goods-item {
    padding: 2.66vw;
    overflow: hidden;
    zoom: 1;
    color: #4d4d4d;
    background-color: #fff;
    margin: 1.33vw 0;
}

.row-title {
    width: 24vw;
    font-size: 4.26vw;
    display: inline-block;
    vertical-align: middle;
}

.row-value {
    width: 68vw;
    display: inline-block;
    margin-top: 0.4vw;
    text-align: right;
    font-size: 3.73vw;
    vertical-align: middle;
}

.goods-standard {
    margin: 1.33vw 0;
}

.standard-row {
    padding: 2.66vw;
    overflow: hidden;
    zoom: 1;
    color: #4d4d4d;
    background-color: #fff;
}

.standard-jump {
    display: block;
    font-size: 3.73vw;
    float: right;
    margin-top: 0.4vw;
    color: #09b745;
    text-decoration: none;
}

.standard-jump:before {
    content: '';
    display: inline-block;
    width: 3.6vw;
    height: 3.6vw;
    background: url(../assets/images/edit-icon.png) no-repeat;
    background-size: contain;
    vertical-align: middle;
    margin-top: -0.8vw;
    margin-right: 1vw;
}

.standard-content {
    background-color: #fff;
}

.standard-item {
    padding: 2vw 2.66vw;
    background-color: #eef9f3;
    font-size: 3.73vw;
    overflow: hidden;
    zoom: 1;
}

.standard-index {
    display: inline-block;
    float: left;
}

.standard-operation {
    display: inline-block;
    float: right;
}

.standard-btn {
    font-size: 3.73vw;
    background-color: transparent;
    border: none;
    outline: none;
}

.update-standard-btn {
    color: #05b645;
}

.delete-standard-btn {
    color: #e84747;
}

.standard-item-row {
    overflow: hidden;
    zoom: 1;
    padding: 2vw 2.66vw;
    font-size: 0;
    color: #999;
}

.standard-item-row:not(:last-child) {
    border-bottom: 1px solid #f2f2f2;
}

.standard-key {
    display: inline-block;
    width: 50%;
    font-size: 3.73vw;
}

.standard-value {
    display: inline-block;
    width: 50%;
    font-size: 3.73vw;
}

.goods-property {
    display: inline-block;
    font-size: 3.73vw;
    /*width: 18vw;*/
    padding: 0 2vw;
    height: 8vw;
    line-height: 8vw;
    text-align: center;
    color: #4c4c4c;
    background-color: #f5f5f5;
    margin: 1.2vw;
    border-radius: 1px;
}

.value-after:after {
    content: '';
    display: inline-block;
    width: 2vw;
    height: 3.73vw;
    background: url(../assets/images/list-more.png) no-repeat;
    background-size: contain;
    vertical-align: middle;
    margin-top: -0.4vw;
    margin-left: 2.66vw;
}

.row-value input {
    width: 100%;
    font-size: 3.73vw;
    padding: 0.66vw;
    box-sizing: border-box;
    border: none;
    outline: none;
}

.row-value .radio {
    width: auto;
    margin: 0;
}

.row-value label {
    padding: 1vw;
    margin-left: 3vw;
    vertical-align: middle;
}

.goods-intro {
    width: 100%;
    height: 35vw;
    font-size: 3.73vw;
    padding: 0.26vw;
    resize: none;
    vertical-align: middle;
    box-sizing: border-box;
    border: none;
    outline: none;
}

.upload-img {
    width: 32vw;
    height: 32vw;
    line-height: 32vw;
    text-align: center;
}

.upload {
    margin-left: 2vw;
    position: relative;
}

.save-goods {
    width: 100%;
    height: 13.2vw;
    line-height: 13.2vw;
    text-align: center;
    background-color: #27bb43;
    font-size: 4.8vw;
    color: #fff;
    position: fixed;
    bottom: 0;
}




/*图片裁剪*/

#button {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 80px;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: #fff;
}

#buttonCancel {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 80px;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: #ef4f4f;
    color: #fff;
}

.container {
    z-index: 99;
    position: fixed;
    padding-top: 60px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 1);
}

#image {
    max-width: 100%;
}

.upload-wrap {
    /*position: relative;*/
    width: 100vw;
    height: 100vh;
}

.upload-btn {
    width: 32vw;
    height: 32vw;
    position: absolute;
    left: 0;
    opacity: 0;
    z-index: 2;
}

.upload-bg {
    width: 32vw;
    height: 32vw;
    background: url(../assets/images/upload-btn.jpg) no-repeat center center;
    background-size: contain;
    position: absolute;
    z-index: 1;
    color: #fff;
    text-align: center;
    line-height: 32vw;
}

.close-popup {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 10px;
    top: 10px;
    text-align: center;
    font-size: 8vw;
    background-color: #ef4f4f;
    color: #fff;
    border-radius: 50%;
}

.jump {
    display: block;
    text-decoration: none;
    color: #4d4d4d;
}

.category-content {
    padding-top: 11.73vw;
}

.mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;
}

.mint-popup-3 .mint-button {
    position: absolute;
    width: 60px;
    top: 0;
    left: 0;
}

.saveBusiness {
    width: 100%;
    height: 10.66vw;
    text-align: center;
    line-height: 10.66vw;
    background-color: #0eb745;
    color: #fff;
    font-size: 4.26vw;
    position: fixed;
    bottom: 0;
}

</style>
