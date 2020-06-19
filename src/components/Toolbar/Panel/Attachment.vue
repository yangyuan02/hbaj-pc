<template>
    <el-drawer
        title="我是标题"
        :visible.sync="drawerAttachment"
        :with-header="false"
        :modal="false"
        :size="296"
        :before-close="handleClose"
    >
        <div class="panel_sidebar">
            <div class="person common">
                <h2>项目附件</h2>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "Person",
    data() {
        return {
            params: {}
        };
    },
    computed: {
        ...mapState({
            drawerAttachment: state => state.toolbarStore.drawerAttachment
        })
    },
    methods: {
        handleClose(done) {
            done();
            this.$store.commit("TOGGLE_DRAWER", "drawerAttachment");
        }
    }
};
</script>

<style lang="less"></style>
