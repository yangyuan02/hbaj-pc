<template>
    <el-drawer
        title="我是标题"
        :visible="drawerIntro"
        :with-header="false"
        :modal="false"
        :size="296"
        :before-close="handleClose"
    >
        <div class="panel_sidebar" v-loading="loading">
            <div class="intro common">
                <h2>课件详情</h2>
                <el-form label-position="top" :model="params">
                    <el-form-item label="上传图片">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            limit="1"
                            class="w100"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="" />
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="发起时间">
                        <el-date-picker
                            v-model="params.value1"
                            type="date"
                            placeholder="选择日期"
                            class="w100"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-date-picker
                            v-model="params.value2"
                            type="date"
                            placeholder="选择日期"
                            class="w100"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="课件标题">
                        <el-input v-model="params.type" class="w100"></el-input>
                    </el-form-item>
                    <el-form-item label="课件简介">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="params.textarea"
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
                name: "",
                region: "",
                type: "",
                textarea: "",
                value1: "",
                value2: "",
                loading: false // 加载状态
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
            const taskId = this.$route.params.id;
            this.loading = true;
            console.log(taskId);
            // 通过任务id获取项目的有关信息
            taskDetail(
                {
                    type: "GET"
                },
                taskId
            ).then(res => {
                if (res.suceeded) {
                    this.$nextTick(() => {
                        this.loading = false;
                    });

                    console.log(res, "taskId", this.loading);
                } else {
                    this.loading = false;
                }
            });
        }
    }
};
</script>

<style lang="less"></style>
