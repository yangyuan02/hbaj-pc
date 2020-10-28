<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 22:21:06
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-04 00:20:31
 * @Description: 
 -->
<template>
    <div class="course-content-item cursor" @click="goDetail(item)">
        <div
            class="course-item-thumb ui-lazyLoad-pic"
            v-lazy
            :data-src="globalConfig.imagePath + item.imageUrl"
        >
            <!-- <img :src="globalConfig.imagePath + item.imageUrl" alt="" /> -->
        </div>
        <div class="course-item-detail">
            <div class="course-item-title">
                <div class="text">
                    <p class="ellipsis2">{{ item.name }}</p>
                </div>
                <div :class="`status status${item.publicFlg}`">
                    <span>{{ item.publicFlg | formPublicFlg }}</span>
                </div>
            </div>
            <div class="course-item-digest">
                <p class="ellipsis">
                    {{ item.detail }}
                </p>
            </div>
            <div class="course-item-source">
                <div class="organization" style="margin-right:10px">
                    <!-- <span>发布机构:</span> -->
                    <span>{{ item.oriEnterpriseName }}</span>
                </div>
                <div class="publishTime">
                    <!-- <span>发布时间:</span> -->
                    <span>{{ item.publishDate | formaData }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "@/widget/lazyLoad";
export default {
    data() {
        return {};
    },
    props: {
        item: {
            type: Object,
            default: {}
        }
    },
    methods: {
        goDetail({ id, name }) {
            if (!window.localStorage.getItem("authorization")) {
                return this.$store.commit("TOGGLE_LOGIN");
            }
            const params = {
                taskId: "0",
                projectId: id,
                from: "2",
                name
            };
            this.$router.push({
                name: "panoEditor",
                params
            });
            this.$store.commit("SETHISTROY", {
                path: `0/${id}/1`,
                params
            });
        }
    }
};
</script>
<style lang="less" scope>
.course-content-item {
    display: flex;
    padding-top: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(221, 221, 221, 1);
    &:last-child {
        border: none;
    }
    .course-item-thumb {
        width: 70px;
        height: 70px;
        flex-shrink: 0;
        margin-right: 11px;
        background-size: cover !important;
        img {
            width: 100%;
            height: 100%;
            max-width: 100%;
        }
    }
    .course-item-detail {
        flex: 1;
        width: 222px;
        position: relative;
        .course-item-title {
            display: flex;
            .text {
                flex: 1;
                height: 40px;
                p {
                    font-size: 16px;
                    font-family: MicrosoftYaHei;
                    color: rgba(51, 51, 51, 1);
                    line-height: 20px;
                    letter-spacing: 1px;
                    -webkit-background-clip: text;
                }
            }
            .status {
                width: 36px;
                height: 17px;
                display: flex;
                justify-content: center;
                align-content: center;
                line-height: 17px;
                font-size: 10px;
                color: #fff;
                text-align: center;

                border-radius: 1px;
                &.status0 {
                    background: red;
                }
                &.status1 {
                    background: rgba(59, 206, 180, 1);
                }
            }
        }
        .course-item-digest {
            margin-top: 2px;
            margin-bottom: 2px;
            height: 34px;
            p {
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                line-height: 16px;
                letter-spacing: 1px;
                -webkit-background-clip: text;
            }
        }
        .course-item-source {
            display: flex;
            align-content: center;
            justify-content: space-between;
            margin-top: 8px;
            position: absolute;
            bottom: 0;
            span {
                font-size: 10px;
                font-family: MicrosoftYaHei;
                color: rgba(153, 153, 153, 1);
                line-height: 13px;
                -webkit-background-clip: text;
            }
        }
    }
}
</style>
