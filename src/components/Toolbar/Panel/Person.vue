<template>
    <!-- <el-drawer
        title="我是标题"
        :visible.sync="drawerPerson"
        :with-header="false"
        :modal="true"
        :size="296"
        :before-close="handleClose"
    > -->
    <div class="panel_sidebar" v-if="drawerPerson">
        <div class="person common">
            <h2>课件制作人员</h2>
            <div class="course_item_person" v-for="(item, index) in params.userList" :key="index">
                <div
                    class="thumb ui-lazyLoad-pic"
                    v-lazy
                    :data-src="globalConfig.imagePath + item.avatar"
                ></div>
                <div class="info">
                    <div class="name">{{ item.sgname }}</div>
                    <div class="role">
                        <div class="title">角色:</div>
                        <div class="roles">
                            <span>{{ item.departmentName }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- </el-drawer> -->
</template>

<script>
import "@/widget/lazyLoad";
import { mapState } from "vuex";
import { projectDetail } from "@/model/api";

export default {
    name: "Person",
    data() {
        return {
            params: {
                userList: []
            }
        };
    },
    computed: {
        ...mapState({
            drawerPerson: state => state.toolbarStore.drawerPerson
        })
    },
    watch: {
        drawerPerson(newVal, oldVal) {
            if (newVal) {
                this.getProjectDetail();
            }
        }
    },
    methods: {
        handleClose(done) {
            done();
            this.$store.commit("TOGGLE_DRAWER", "drawerPerson");
        },
        getProjectDetail() {
            // 获取课件参与人员列表
            const projectId = this.$route.params.projectId;
            projectDetail(
                {
                    type: "GET"
                },
                projectId
            ).then(res => {
                if (res.suceeded) {
                    this.params.userList = res.data.userList;
                } else {
                }
            });
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
