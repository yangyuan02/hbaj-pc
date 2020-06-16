<template>
    <div id="toolbar">
        <div class="item-toolbar" v-for="(item, index) in toolbarList" :key="index">
            <el-tooltip class="item" effect="dark" :content="item.text" placement="left">
                <i class="iconfont" :class="[item.icon ? item.icon : '']"></i>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            toolbarList: [
                {
                    text: "简介",
                    icon: "icontubiaoweb-12"
                },
                {
                    text: "制作人员",
                    icon: "icontubiaoweb-13"
                },
                {
                    text: "附件参考",
                    icon: "icontubiaoweb-14"
                },
                {
                    text: "热点内容",
                    icon: "icontubiaoweb-15"
                },
                {
                    text: "引导内容",
                    icon: "icontubiaoweb-16"
                },
                {
                    text: "课件评论",
                    icon: "icontubiaoweb-17"
                },
                {
                    text: "启动引导",
                    icon: "icontubiaoweb-18"
                },
                {
                    text: "内容摘要",
                    icon: "icontubiaoweb-19"
                },
                {
                    text: "快速通道",
                    icon: "icontubiaoweb-20"
                }
            ]
        };
    }
};
</script>

<style lang="less">
#toolbar {
    width: 72px;
    height: 100%;
    background: rgba(54, 64, 68, 1);
    padding-top: 60px;
    .item-toolbar {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        i {
            font-size: 26px;
            color: #fff;
            cursor: pointer;
        }
    }
}
</style>
