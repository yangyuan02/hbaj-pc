<template>
    <!-- <el-drawer
        title="我是标题"
        :visible="drawerIntro"
        :with-header="false"
        :modal="false"
        :size="296"
        :before-close="handleClose"
    > -->
    <div class="panel_sidebar" v-if="drawerIntro">
        <div class="intro common">
            <h2>编辑课件简介</h2>
            <el-form label-position="top" :model="params">
                <el-form-item :label="uploadTitle">
                    <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img
                            v-if="params.project.imageUrl && staticPath"
                            :src="globalConfig.imagePath + params.project.imageUrl"
                            class="avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="时间">
                    <!-- <el-date-picker
                        v-model="params.startDate"
                        type="date"
                        placeholder="选择日期"
                        class="w100"
                        format="yyyy-MM-dd"
                        value-format="timestamp"
                    >
                    </el-date-picker> -->
                    <span
                        >{{ formaData(params.startDate) }}-{{ formaData(params.expireDate) }}</span
                    >
                </el-form-item>
                <!-- <el-form-item label="发起时间">
                    <el-date-picker
                        v-model="params.startDate"
                        type="date"
                        placeholder="选择日期"
                        class="w100"
                        format="yyyy-MM-dd"
                        value-format="timestamp"
                    >
                    </el-date-picker>
                    <span></span>
                </el-form-item> -->
                <!-- <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="params.expireDate"
                        type="date"
                        placeholder="选择日期"
                        class="w100"
                        format="yyyy-MM-dd"
                        value-format="timestamp"
                    >
                    </el-date-picker>
                </el-form-item> -->
                <el-form-item label="课件标题">
                    <el-input v-model="params.project.name" class="w100"></el-input>
                </el-form-item>
                <el-form-item label="课件简介" class="intro_textarea">
                    <el-input
                        type="textarea"
                        :rows="5"
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
    <!-- </el-drawer> -->
</template>

<script>
import { mapState } from "vuex";
import { taskDetail, projectDetail } from "@/model/api";
import utils from "@/widget/utils";
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
            },
            isUpload: false, // 是否显示上传按钮
            staticPath: "" // 原路径
        };
    },
    computed: {
        ...mapState({
            drawerIntro: state => state.toolbarStore.drawerIntro
        }),
        uploadUrl() {
            const url = `/api/file/upload?fileName=default&relatedId=${this.$route.params.projectId}&fileType=PROJECT_IMAGE`;
            return url;
        },
        uploadTitle() {
            const { blockName, moduleName, className } = this.params.project;
            return "课件路径:" + (blockName || "") + (moduleName || "") + (className || "");
        }
    },
    watch: {
        drawerIntro(newVal, oldVal) {
            if (newVal) {
                this.getTaskDetail();
            }
        }
    },
    methods: {
        formaData(dateTime) {
            var date = new Date(dateTime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var year = date.getFullYear(),
                month = ("0" + (date.getMonth() + 1)).slice(-2),
                sdate = ("0" + date.getDate()).slice(-2),
                hour = ("0" + date.getHours()).slice(-2),
                minute = ("0" + date.getMinutes()).slice(-2),
                second = ("0" + date.getSeconds()).slice(-2);
            // 拼接
            var result =
                year + "-" + month + "-" + sdate + " " + hour + ":" + minute + ":" + second;
            // 返回
            return result.slice(0, 10);
        },
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
                    this.staticPath = res.data.project.imageUrl;
                    this.params.project.imageUrl = this.staticPath;
                    console.log(res, "taskId", this.loading);
                } else {
                }
            });
        },
        handleAvatarSuccess(res, file) {
            this.staticPath = res.data.path;
            this.params.project.imageUrl = res.data.path;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        onSubmit() {
            // 更新附件信息
            const projectId = this.$route.params.projectId;
            const {
                name,
                startDate,
                expireDate,
                project: { imageUrl, detail }
            } = this.params;
            const data = {
                name,
                startDate: utils.format(new Date(startDate), "yyyy-MM-dd"),
                expireDate: utils.format(new Date(expireDate), "yyyy-MM-dd"),
                imageUrl: this.staticPath,
                detail
            };
            projectDetail({ type: "get" }, projectId).then(res => {
                if (res.suceeded) {
                }
                const { moduleId, oriEnterpriseId, classId } = res.data;
                Object.assign(data, { moduleId, oriEnterpriseId, classId });
                projectDetail(
                    {
                        type: "PUT",
                        data
                    },
                    projectId
                ).then(res => {
                    if (res.suceeded) {
                        this.$message.success("操作成功");
                    }
                });
            });
        }
    }
};
</script>

<style lang="less">
.avatar-uploader {
    display: flex;
    justify-content: center;
    align-items: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    min-width: 478px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    // width: 178px;
    height: 178px;
    display: block;
}
.intro_textarea {
    textarea {
        resize: none;
    }
}
</style>
