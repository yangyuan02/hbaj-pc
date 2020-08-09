<template>
    <el-dialog
        title="添加动作"
        :visible.sync="visible"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="600px"
        append-to-body
    >
        <main class="SelectAction">
            <SelectAction placeholder="图片描述" title="人物或动画形象选择"></SelectAction>
            <SelectAction placeholder="图片描述" title="人物或动画形象选择"></SelectAction>
        </main>
    </el-dialog>
</template>

<script>
import SelectAction from "@/components/SelectAction";

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        SelectAction
    },
    data() {
        return {};
    },
    methods: {
        open() {
            console.log("打开");
        },
        close() {
            this.$emit("update:visible", false);
        },
        save() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.addAudio();
                }
            });
            console.log("保存");
        }
    }
};
</script>

<style lang="less">
.SelectAction {
    display: flex;
    justify-content: space-between;
}
</style>
