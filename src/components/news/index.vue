<!--
 * @Author: yangyuan
 * @Date: 2020-04-16 21:03:29
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-28 17:37:11
 * @Description: 
 -->
<template>
    <div class="news-content-item cursor" @click="toNewsDetail(item.id)">
        <div class="news-item-detail">
            <div class="news-item-title">
                <div class="text">
                    <p class="ellipsisLineTwo">{{ item.title }}</p>
                </div>
            </div>
            <div class="news-item-digest">
                <p class="ellipsis">
                    {{ item.summary }}
                </p>
            </div>
            <div class="news-item-source">
                <div class="organization">
                    <!-- <span>发布机构:</span> -->
                    <span>{{ item.author }}</span>
                </div>
                <div class="publishTime">
                    <!-- <span>发布时间:</span> -->
                    <span>{{ item.publishTime | formaData }}</span>
                </div>
            </div>
        </div>
        <div
            class="news-item-thumb ui-lazyLoad-pic"
            v-lazy
            :data-src="globalConfig.imagePath + item.imageUrl"
        >
            <!-- <img :src="globalConfig.imagePath + item.imageUrl" :alt="item.title"> -->
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
        toNewsDetail(id) {
            this.$router.push({
                name: "newsDetail",
                params: {
                    id
                }
            });
        }
    }
};
</script>

<style lang="less">
.news-content-item {
    display: flex;
    padding: 20px 0px;
    border-bottom: 1px solid rgba(221, 221, 221, 1);
    &:last-child {
        border: none;
    }
    .news-item-detail {
        flex: 1;
        width: 198px;
        .news-item-title {
            width: 100%;
            .text {
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
        }
        .news-item-digest {
            width: 100%;
            margin-top: 2px;
            margin-bottom: 2px;
            p {
                font-size: 12px;
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                line-height: 16px;
                -webkit-background-clip: text;
            }
        }
        .news-item-source {
            display: flex;
            align-content: center;
            justify-content: space-between;
            width: 100%;
            span {
                font-family: MicrosoftYaHei;
                color: rgba(153, 153, 153, 1);
                line-height: 13px;
                -webkit-background-clip: text;
                word-break: break-all;
            }
        }
    }
    .news-item-thumb {
        width: 70px;
        height: 70px;
        margin-left: 11px;
        flex-shrink: 0;
        background-size: cover !important;

        // background: #f0f0f0;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
