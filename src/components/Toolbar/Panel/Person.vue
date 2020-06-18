<template>
    <el-drawer
        title="我是标题"
        :visible.sync="drawerPerson"
        :with-header="false"
        :modal="false"
        :size="296"
        :before-close="handleClose"
    >
        <div class="panel_sidebar">
            <div class="person common">
                <h2>课件参与人员</h2>
                <div class="course_item_person" v-for="(item, index) in [1, 2, 3, 4]" :key="index">
                    <div class="thumb"></div>
                    <div class="info">
                        <div class="name">船福</div>
                        <div class="role">
                            <div class="title">角色:</div>
                            <div class="roles">
                                <span>船员</span>
                            </div>
                        </div>
                    </div>
                </div>
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
            drawerPerson: state => state.toolbarStore.drawerPerson
        })
    },
    methods: {
        handleClose(done) {
            done();
            this.$store.commit("TOGGLE_DRAWER", "drawerPerson");
        }
    }
};
</script>

<style lang="less">
.person {
    & > h2 {
        margin-bottom: 20px;
    }

    .course_item_person {
        background: rgba(248, 248, 248, 1);
        width: 222px;
        height: 64px;
        display: flex;
        align-items: center;
        margin: 0 auto;
        margin-bottom: 24px;
        &:last-child {
            margin-bottom: 0px;
        }
        .thumb {
            width: 60px;
            height: 60px;
            background: url("./images/role.png");
            background-size: 100%;
        }
        .info {
            margin-left: 26px;
            .name {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 21px;
                margin-bottom: 10px;
            }
            .role {
                font-size: 12px;
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                line-height: 16px;
                display: flex;
            }
        }
    }
}
</style>
