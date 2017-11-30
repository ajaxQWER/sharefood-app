<template>
    <div id="goodsDetail">
        <div class="goodsDetail-header">
            <div class="nav-bar help-navbar">
                <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
                <div class="nav-title">编辑商品</div>
            </div>
        </div>
        <div class="goodsDetail-content" v-if="goodsInfo">
            <div class="content">
                <div class="goods-item">
                    <div class="row-title">商品图片</div>
                    <div class="row-value upload-img">
                        <img class="goods-imgage" :src="headerImage?headerImage:UPLOADURL + goodsInfo.goods.goodsImgUrl" alt="商品图片">
                    </div>
                    <div class="row-value upload-img upload">
                        <img class="goods-imgage" src="../assets/images/upload-btn.jpg" alt="点击上传" @click="popupVisible=true">
                    </div>
                </div>
                <div class="goods-item">
                    <div class="row-title">商品名称</div>
                    <div class="row-value">
                        <input type="text" placeholder="请输入商品名称" v-model="goodsInfo.goods.goodsName" maxlength="12">
                    </div>
                </div>
                <router-link :to="'/setGoodsCategory?goodsId='+goodsInfo.goods.goodsId+'&goodsCategoryList='+goodsInfo.goodsCategoryIdList" class="jump">
                    <div class="goods-item">
                        <div class="row-title">商品分类</div>
                        <div class="row-value value-after">{{formatGoodsClass(goodsInfo.goods.goodsClassNames)}}</div>
                    </div>
                </router-link>
                <div class="goods-item">
                    <div class="row-title">商品价格</div>
                    <div class="row-value">
                        <input type="number" placeholder="请输入商品价格" v-model.number="goodsInfo.goods.goodsPrice" min="0">
                    </div>
                </div>
                <div class="goods-item">
                    <div class="row-title">餐盒费</div>
                    <div class="row-value">
                        <input type="number" placeholder="请输入餐盒费" v-model.number="goodsInfo.goods.feeMeals">
                    </div>
                </div>
                <div class="goods-item">
                    <div class="row-title">商品简介</div>
                    <div class="row-value">
                        <textarea class="goods-intro" placeholder="最多255字" name="" id="" maxlength="255" v-model="goodsInfo.goods.goodsContent"></textarea>
                    </div>
                </div>
                <div class="save-goods" @click="updateGoods">保存</div>
            </div>
        </div>
        <div class="goodsDetail-content" v-else>
            <div class="content">
                <div class="goods-item">
                    <div class="row-title">商品图片</div>
                    <div class="row-value upload-img">
                        <img class="goods-imgage" :src="headerImage?headerImage:''" alt="商品图片">
                    </div>
                    <div class="row-value upload-img upload">
                        <img class="goods-imgage" src="../assets/images/upload-btn.jpg" alt="点击上传" @click="popupVisible=true">
                    </div>
                </div>
                <div class="goods-item">
                    <div class="row-title">商品名称</div>
                    <div class="row-value">
                        <input type="text" placeholder="请输入商品名称" v-model="newGoods.goods.goodsName" maxlength="12">
                    </div>
                </div>
                <div class="goods-item" @click="showGoodsCategoryPopup">
                    <!-- <router-link to="/setGoodsCategory" class="jump"> -->
                    <div class="row-title">商品分类</div>
                    <div class="row-value value-after">{{newGoods.goods.goodsClassNames}}</div>
                    <!-- </router-link> -->
                </div>
                <div class="goods-item">
                    <div class="row-title">商品价格</div>
                    <div class="row-value">
                        <input type="number" placeholder="请输入商品价格" v-model.number="newGoods.goods.goodsPrice" min="0">
                    </div>
                </div>
                <div class="goods-item">
                    <div class="row-title">餐盒费</div>
                    <div class="row-value">
                        <input type="number" placeholder="请输入餐盒费" v-model.number="newGoods.goods.feeMeals" min="0">
                    </div>
                </div>
                <div class="goods-item">
                    <div class="row-title">商品简介</div>
                    <div class="row-value">
                        <textarea class="goods-intro" placeholder="最多255字" name="" id="" maxlength="255" v-model="newGoods.goods.goodsContent"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="save-goods" @click="updateGoods">保存</div>
        <mt-popup v-model="popupVisible" position="bottom">
            <!-- 遮罩层 -->
            <div class="container" v-show="panel">
                <div>
                    <img id="image" :src="url" alt="Picture">
                </div>
                <button type="button" id="buttonCancel" @click="cancel">取消</button>
                <button type="button" id="button" @click="crop">确定</button>
            </div>
            <div class="upload-wrap">
                <div class="close-popup" @click="closePopup">x</div>
                <div class="upload-bg"></div>
                <input class="upload-btn" type="file" id="change" @change="change" ref="uploads" accept="image/*">
                <label for="change"></label>
            </div>
        </mt-popup>
        <mt-popup v-model="goodsCategoryPopup" position="right" class="mint-popup-3" :modal="false">
            <div class="goodsDetail-header">
                <div class="nav-bar help-navbar">
                    <div class="back"></div>
                    <div class="nav-title">商品分类</div>
                </div>
            </div>
            <div class="category-content">
                <mt-checklist align="right" class="page-part" :max="5" v-model="goodsCategoryList" :options="options">
                </mt-checklist>
            </div>
            <div class="saveBusiness" @click="saveBusiness">保存</div>
        </mt-popup>
    </div>
</template>
<script>
import Cropper from 'cropperjs'
import { getGoodsById, updateGoodsById, addGoods, getGoodsCategoryLists, uploadFiles } from '@/api/api'
export default {
    name: 'goodsDetail',
    data: function() {
        return {
            goodsInfo: null,
            popupVisible: false,
            headerImage: '',
            picValue: '',
            cropper: '',
            croppable: false,
            panel: false,
            url: '',
            newGoods: {
                goods: {
                    feeMeals: '',
                    goodsClassNames: "",
                    goodsContent: "",
                    goodsImgUrl: "",
                    goodsName: "",
                    goodsPrice: '',
                    goodsStatus: "SOLD_OUT",
                },
                goodsCategoryIdList: []
            },
            goodsId: '',
            goodsCategoryPopup: false,
            goodsCategoryList: [],
            options: []
        }
    },
    created: function() {
        var goodsId = this.$route.query.goodsId;
        this.goodsId = goodsId;
        if (goodsId) {
            this.$indicator.open();
            getGoodsById(goodsId).then(res => {
                console.log(res)
                this.goodsInfo = res;
                this.$indicator.close();
            })
        }
        getGoodsCategoryLists().then(res => {
            res.list.forEach((item) => {
                this.options.push({
                    label: item.goodsCategoryName,
                    value: {
                        id: item.goodsCategoryId,
                        name: item.goodsCategoryName
                    }
                })
            })
        })
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
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.panel = true;
            this.picValue = files[0];

            this.url = this.getObjectURL(this.picValue);
            //每次替换图片要重新得到新的url  
            if (this.cropper) {
                this.cropper.replace(this.url);
            }
            this.panel = true;

        },
        crop() {
            this.panel = false;
            var croppedCanvas;
            var roundedCanvas;
            if (!this.croppable) {
                return;
            }
            // Crop  
            croppedCanvas = this.cropper.getCroppedCanvas();
            // console.log(this.cropper)
            // Round  
            roundedCanvas = this.getRoundedCanvas(croppedCanvas);
            this.headerImage = roundedCanvas.toDataURL();
            this.postImg()

        },
        getRoundedCanvas(sourceCanvas) {

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var width = sourceCanvas.width;
            var height = sourceCanvas.height;

            canvas.width = width;
            canvas.height = height;

            context.imageSmoothingEnabled = true;
            context.drawImage(sourceCanvas, 0, 0, width, height);
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
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }

            var obj = new Blob([ab], { type: 'image/jpeg' })

            var fd = new FormData();

            //formdata对象第3个参数为文件名，不传则默认使用文件名，这里是blob对象所以需要加一个后缀
            fd.append('file', obj, '*.jpg');

            fd.path = '/goods'
            uploadFiles(fd).then(data => {
                this.cancel()
                console.log(data)
                this.$toast({
                    message: '上传成功',
                    duration: 1000
                })
                if (this.goodsId) {
                    this.goodsInfo.goods.goodsImgUrl = data.originalUrl;
                } else {
                    this.newGoods.goods.goodsImgUrl = data.originalUrl;
                }
            }).catch(err => {
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
            this.panel = false;
            this.picValue = '';
            this.url = '';
            this.$refs.uploads.value = '';
        },
        updateGoods: function() {
            //编辑
            if (this.goodsId) {
                this.$indicator.open();
                updateGoodsById(this.goodsInfo.goods.goodsId, this.goodsInfo).then(() => {
                    this.$toast({ message: '操作成功', duration: 1000 })
                    this.$indicator.close();
                    setTimeout(() => {
                        this.$router.back()
                    }, 1500)
                })
            } else {
                //新增
                if (!this.newGoods.goods.goodsImgUrl) {
                    this.$toast({ message: '请上传商品图片', duration: 1000 })
                    return;
                }
                if (!this.newGoods.goods.goodsName) {
                    this.$toast({ message: '请输入商品名称', duration: 1000 })
                    return;
                }
                if (this.newGoods.goodsCategoryIdList.length == 0) {
                    this.$toast({ message: '请选择商品分类', duration: 1000 })
                    return;
                }
                if (this.newGoods.goods.goodsPrice === '') {
                    this.$toast({ message: '请输入商品价格', duration: 1000 })
                    return;
                }
                if (this.newGoods.goods.goodsPrice < 0 ) {
                    this.newGoods.goods.goodsPrice = ''
                    this.$toast({ message: '请输入正确的商品价格', duration: 1000 })
                    return;
                }
                if (this.newGoods.goods.feeMeals === '') {
                    this.$toast({ message: '请输入餐盒费', duration: 1000 })
                    return;
                }
                if (this.newGoods.goods.feeMeals < 0) {
                    this.newGoods.goods.feeMeals = ''
                    this.$toast({ message: '请输入正确的餐盒费', duration: 1000 })
                    return;
                }
                this.$indicator.open();
                addGoods(this.newGoods).then(() => {
                    this.$toast({ message: '操作成功', duration: 1000 })
                    this.$indicator.close();
                    localStorage.removeItem('goodsCategoryList')
                    setTimeout(() => {
                        this.$router.back()
                    }, 1500)
                })
            }
        },
        formatGoodsClass: function(className) {
            return className.replace(/,/g, '、')
        },
        showGoodsCategoryPopup: function() {
            this.goodsCategoryPopup = true;
        },
        closeGoodscategoryPopup: function() {
            this.goodsCategoryPopup = false;
        },
        saveBusiness: function() {
            if (this.goodsCategoryList.length == 0) {
                this.$toast({ message: '请选择分类', duration: 1000, className: 'goodscategory-toast' })
                return;
            }

            console.log(this.goodsCategoryList)
            var tempGoodsCategoryIdList = {};
            this.goodsCategoryList.forEach((item, index) => {
                tempGoodsCategoryIdList[item.id] = item.name
            })

            var names = [];
            this.newGoods.goodsCategoryIdList = []
            for (var id in tempGoodsCategoryIdList) {
                names.push(tempGoodsCategoryIdList[id]);
                this.newGoods.goodsCategoryIdList.push(+id)
            }

            this.newGoods.goods.goodsClassNames = names.join(",");
            this.goodsCategoryPopup = false;
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
    position: relative;
    width: 100vw;
    height: 100vh;
}

.upload-btn {
    width: 50vw;
    height: 50vw;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -25vw;
    margin-top: -25vw;
    opacity: 0;
    z-index: 2;
}

.upload-bg {
    width: 50vw;
    height: 50vw;
    background: url(../assets/images/upload-btn.jpg) no-repeat center center;
    background-size: contain;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -25vw;
    margin-top: -25vw;
    z-index: 1;
    color: #fff;
    text-align: center;
    line-height: 50vw;
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
