<template>
    <div id="printSetting">
        <div class="setting-header">
            <div class="nav-bar help-navbar">
                <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
                <div class="nav-title">打印设置</div>
                <router-link to="/addPrinter" class="print-add-btn"><img src="../assets/images/add.png" alt=""></router-link>
            </div>
        </div>
        <div class="print-content">
            <div v-if="!isEmpty">
                <ul class="print-lists">
                    <li class="print-item" v-for="(item,index) in printerList" :key="index" @click="toUpdatePrinter(item.printerId)">
                        <div class="print-info">
                            <p class="item">
                                <span class="title">设备名称</span>
                                <span class="name">{{item.deviceName}}</span>
                                <span class="type">{{formatType(item.printerType)}}</span>
                            </p>
                            <p class="item" v-if="item.deviceRemark">
                                <span class="title">设备备注</span>
                                <span class="name remark">{{item.deviceRemark}}</span>
                            </p>
                            <p class="item">
                                <span class="title">设备状态</span>
                                <span class="name">
                                    <span>{{formatPageType(item.printerPageType)}}/</span>
                                    <span>{{item.copies}}份/</span>
                                    <span>{{formatStatus(item.printerStatus)}}</span>
                                </span>
                                <span class="delete-btn" @click.stop="deletePrinter(item.printerId,index)">删除设备</span>
                            </p>
                        </div>
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
    import { getPrinterLists, deletePrinterById } from '@/api/api';
    export default {
        name: 'printer',
        data: function() {
            return {
                init: true,
                allLoaded: false,
                current: 1,
                pageId: 1,
                counts: 0,
                canLoad: false,
                printerList: null,
                isEmpty: false
            }
        },
        created: function() {
            this.getPrinterList({ pageId: this.pageId });
        },
        methods: {
            getPrinterList: function(printer) {
                this.$indicator.open();
                getPrinterLists({ params: { pageSize: 10, pageId: printer.pageId } }).then(res => {
                    console.log(res);
                    if (this.init) {
                        this.printerList = res.list;
                    } else {
                        this.printerList = [].concat.apply(this.printerList, res.list);
                    }
                    this.counts = res.count;
                    this.$indicator.close();
                    if (res.count == 0) {
                        this.allLoaded = true;
                        this.isEmpty = true
                    } else {
                        this.canLoad = true;
                        this.isEmpty = false
                    }

                    if (Math.ceil(this.counts / 10) == this.pageId) {
                        this.allLoaded = true;
                        this.canLoad = false;
                        return;
                    }
                })
            },
            loadBottom: function() {
                this.allLoaded = false;
                this.pageId += 1;
                this.init = false;
                this.getPrinterList({ pageId: this.pageId })
            },
            toUpdatePrinter: function (printerId) {
                this.$router.push('/updatePrinter?printerId=' + printerId);
            },
            deletePrinter: function(id, index) {
                this.$messagebox.confirm('确定删除该通知?').then(action => {
                    console.log(id, index);
                    deletePrinterById(id, index).then(() => {
                        this.$toast({ message: '删除成功', duration: 1000 });
                        this.pageId = 1;
                        this.getPrinterList({ pageId: this.pageId });

                    })
                }).catch(() => {
                    this.$toast({ message: '已取消', duration: 1000 })
                });
            },
            formatStatus: function (status) {
                switch (status){
                    case 'UNBIND':
                        return '未绑定';
                    case 'ONLINE':
                        return '在线';
                    case 'OFFLINE':
                        return '离线';
                    case 'ABNORMALITY':
                        return '异常';
                    case 'PAPER_DEFICIENCY':
                        return '缺纸';
                    default:
                        return '';
                }
            },
            formatType: function (type) {
                switch (type){
                    case 'CLOUD_YILIANYUN_K4':
                        return '易联云K4';
                    case 'USB':
                        return 'USB';
                    default:
                        return '';
                }
            },
            formatPageType: function (type) {
                switch (type){
                    case 'MM58':
                        return '58mm';
                    case 'MM80':
                        return '80mm';
                    default:
                        return '';
                }
            }
        }
    }

</script>
<style scoped>
    #printSetting {
        min-height: 100%;
        background-color: #f2f2f2;
    }

    .setting-header {
        width: 100%;
        position: fixed;
        z-index: 999;
    }
    .print-add-btn{
        display: inline-block;
        float: left;
        width: 4vw;
        height: 4vw;
        padding: 3.865vw 2.345vw;
    }
    .print-add-btn img{
        width: 4vw;
        height: 4vw;
    }

    .print-content {
        padding: 12vw 0 0;
    }

    .print-lists {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .print-item {
        overflow: hidden;
        zoom: 1;
        font-size: 4.26vw;
        margin-top: 2.66vw;
        background-color: #fff;
    }

    .print-item:not(:last-child) {
        border-bottom: 1px solid #eee;
    }

    .item{
        margin: 0;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        font-size: 3.73vw;
        color: #4b4b4b;
        padding: 0 2.66vw;
    }
    .title, .name, .type{
        display: inline-block;
        float: left;
        line-height: 12vw;
    }
    .name {
        margin-left: 3.73vw;
    }
    .remark{
        font-size: 3.73vw;
        color: #999;
    }
    .type{
        float: right;
        font-size: 3.73vw;
        color: #999;
    }
    .delete-btn {
        width: 20vw;
        display: inline-block;
        float: right;
        text-align: center;
        background-color: #ef4f4f;
        border-radius: 5px;
        line-height: 8vw;
        color: #fff;
        margin-top: 2vw;
    }

    .loadmore {
        text-align: center;
        padding: 2.66vw;
    }

</style>
