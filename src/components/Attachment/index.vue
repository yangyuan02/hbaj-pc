<template>
    <el-dialog
        :title="dialogTitle"
        :visible="visible"
        width="700px"
        @open="open"
        @close="close"
        append-to-body
        :close-on-click-modal="false"
        lock-scroll
        top="0vh"
    >
        <Components :hotspotId="hotspotId" :orderList="orderList" :engType="engType" />
    </el-dialog>
</template>

<script>
import Components from "./components";
export default {
    components: {
        Components
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        hotspotId: {
            type: [String, Number],
            required: true
        },
        orderList: {
            type: Array
        },
        dialogTitle: {
            type: String,
            default: "附件参考内容编辑"
        },
        engType: {
            // 是否是专业英语
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    methods: {
        open() {},
        close() {
            this.$emit("update:visible", false);
        }
    }
};
</script>
<style lang="less" scoped>
/deep/ .el-dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>
