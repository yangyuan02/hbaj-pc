<!--
 * @Author: yangyuan
 * @Date: 2020-04-20 22:10:56
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-01 21:20:39
 * @Description: 
 -->
<template>
    <div
        class="task-item-content"
        @click="goToPedit(item.id, item.project.id, item.name, item.status)"
    >
        <div class="task-item-title">
            <div class="text">
                <p class="ellipsisLineTwo">{{ item.name }}</p>
            </div>
            <div class="status">
                <span>{{ item.status | formTaskText }}</span>
            </div>
        </div>
        <div class="task-item-detail">
            <div
                class="task-item-thumb ui-lazyLoad-pic"
                v-lazy
                :data-src="globalConfig.imagePath + item.project.imageUrl"
            >
                <div class="action">
                    <span>立即执行</span>
                </div>
            </div>
            <div class="task-item-digest">
                <div class="duty">
                    <span>负责人:</span><span>{{ item.creatorSgname }}</span>
                </div>
                <div class="start-time">
                    <span>发起时间:</span><span>{{ item.startDate | formaData }}</span>
                </div>
                <div class="end-time">
                    <span>结束时间:</span><span>{{ item.expireDate | formaData }}</span>
                </div>
                <div class="member-content">
                    <div class="text"><span>协作成员:</span></div>
                    <div class="member-item">
                        <span v-for="(k, index) in item.project.userList" :key="index">{{
                            k.sgname
                        }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/widget/lazyLoad";
import { projectDetail } from "@/model/api";

export default {
    props: {
        item: {
            type: Object,
            default: {}
        }
    },
    methods: {
        goToPedit(taskId, projectId, name, status) {
            if (status === 2) {
                return this.$message.error("任务已完成,修改请联系管理员");
            }
            const params = {
                taskId,
                projectId,
                from: "1",
                name
            };
            const getDetail = () => {
                // 通过任务id获取项目的有关信息
                projectDetail(
                    {
                        type: "GET"
                    },
                    projectId
                ).then(res => {
                    if (res.suceeded) {
                        const modules = res.data.moduleName;
                        params.modules = modules;
                        this.$router.push({
                            name: "panoEditor",
                            params
                        });
                        this.$store.commit("SETHISTROY", {
                            path: `${taskId}/${projectId}/1`,
                            params
                        });
                    }
                });
            };
            getDetail();
        }
    }
};
</script>

<style lang="less">
.task-item-content {
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0.01px 1px 0px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    filter: blur(px);
    margin-bottom: 9px;
    padding: 16px 8px 16px 8px;
    cursor: pointer;
    &:last-child {
        margin-bottom: 0;
    }
    .task-item-title {
        display: flex;
        .text {
            flex: 1;
            margin-right: 4px;
            p {
                font-size: 12px;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 20px;
                -webkit-background-clip: text;
            }
        }
        .status {
            // width: 35px;
            height: 18px;
            background: rgba(255, 157, 59, 1);
            // border-radius: 1px;
            text-align: center;
            line-height: 18px;
            padding: 0px 4px;
            span {
                font-size: 10px;
                font-family: MicrosoftYaHei;
                color: rgba(255, 255, 255, 1);
                line-height: 13px;
            }
        }
    }
    .task-item-detail {
        margin-top: 20px;
        display: flex;

        .task-item-thumb {
            width: 105px;
            height: 105px;
            // background: #f0f0f0;
            margin-right: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            cursor: pointer;
            background-size: cover !important;
            .action {
                width: 75px;
                height: 20px;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 10px;
                text-align: center;
                line-height: 20px;
                span {
                    font-size: 11px;
                    font-family: MicrosoftYaHei;
                    color: rgba(255, 255, 255, 1);
                    line-height: 15px;
                    -webkit-background-clip: text;
                }
            }
        }
        .task-item-digest {
            flex: 1;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
            line-height: 19px;
            -webkit-background-clip: text;
            .text {
                width: 60px;
            }
            .member-content {
                display: flex;
                flex: 1;
                .member-item {
                    display: flex;
                    flex-wrap: wrap;
                    flex: 1;
                    span {
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
</style>
