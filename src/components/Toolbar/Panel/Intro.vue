<template>
    <el-drawer
        title="我是标题"
        :visible="drawerIntro"
        :with-header="false"
        :modal="false"
        :size="296"
        :before-close="handleClose"
    >
        <div class="panel_sidebar">
            <div class="intro common">
                <h2>课件详情</h2>
                <el-form label-position="top" :model="params">
                    <el-form-item label="上传图片">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img
                                v-if="params.project.imageUrl"
                                :src="globalConfig.imagePath + params.project.imageUrl"
                                class="avatar"
                            />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="发起时间">
                        <el-date-picker
                            v-model="params.startDate"
                            type="date"
                            placeholder="选择日期"
                            class="w100"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-date-picker
                            v-model="params.expireDate"
                            type="date"
                            placeholder="选择日期"
                            class="w100"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="课件标题">
                        <el-input v-model="params.name" class="w100"></el-input>
                    </el-form-item>
                    <el-form-item label="课件简介">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="params.project.detail"
                            class="w100"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" class="w100">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import { mapState } from "vuex";
import { taskDetail } from "@/model/api";
export default {
    name: "Intro",
    data() {
        return {
            params: {
                project: {
                    detail: "", // 课件简介
                    imageUrl: "" // 图片
                },
                startDate: "", // 任务开始时间
                expireDate: "", // 任务结束时间
                name: "" // 课件标题
            }
        };
    },
    computed: {
        ...mapState({
            drawerIntro: state => state.toolbarStore.drawerIntro
        })
    },
    watch: {
        drawerIntro(newVal, oldVal) {
            if (newVal) {
                this.getTaskDetail();
            }
        }
    },
    methods: {
        handleClose(done) {
            done();
            this.$store.commit("TOGGLE_DRAWER", "drawerIntro");
        },
        getTaskDetail() {
            const taskId = this.$route.params.taskId;
            // 通过任务id获取项目的有关信息
            taskDetail(
                {
                    type: "GET"
                },
                taskId
            ).then(res => {
                if (res.suceeded) {
                    this.params = res.data;
                    console.log(res, "taskId", this.loading);
                } else {
                }
            });
        }
    }
};
</script>

<style lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
