<template>
    <el-dialog
        title="试听音频"
        :visible.sync="visible"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="680px"
        append-to-body
        class="addGuidedialog"
        top="0vh"
    >
        <main>
            <AudioHban
                src="static/enterprise/null/hotspot/HOTSPOT_AUDIO_null_1595746249823_mydream.mp3"
                title="试听音乐"
            ></AudioHban>
        </main>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import SelectAction from "./SelectAction.vue";
import AudioHban from "@/components/common/Audio";

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        SelectAction,
        AudioHban
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

<style scoped lang="less"></style>
