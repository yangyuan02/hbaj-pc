<template>
    <div class="news_detail">
        <div class="recommend">
            <div class="title">
                <span>海宝资讯</span>
            </div>
            <Recommend></Recommend>
        </div>
        <div class="news_content" v-loading="loading">
            <div class="detail">
                <div class="title">
                    <p class="ellipsisLineTwo">
                        {{ data.title }}
                    </p>
                </div>
                <div class="organization">
                    <span>{{ data.author }}</span>
                    <span>{{ data.publishTime | formaData }}</span>
                </div>
                <div class="content" v-html="data.contentHtml"></div>
            </div>
            <!-- <div class="announcement">
                <div class="announcement_title">
                    <h2>相关公告</h2>
                </div>
                <div class="announcement_content">
                    <a class="ellipsis">船员换班冰火两重天！阿联酋允许换班, 马士基继续禁止！</a>
                </div>
            </div> -->
            <div class="news_detail_comment">
                <div class="cmmment_title">
                    <h2>评论区</h2>
                </div>
                <div class="comment_input">
                    <input type="text" placeholder="写下您的评论……" v-model="content" />
                    <button @click="addComment">评论</button>
                </div>
                <Comment ref="comment"></Comment>
            </div>
        </div>
    </div>
</template>

<script>
import Recommend from "./recommend";
import Comment from "./comment";
import { newsDetail, addComment } from "@/model/api";
import store from "@/widget/store";
export default {
    data() {
        return {
            data: {},
            loading: false,
            content: ""
        };
    },
    components: {
        Recommend, // 一些修改
        Comment
    },
    watch: {
        $route: function() {
            this.getNewsDetail();
        }
    },
    methods: {
        getNewsDetail() {
            this.loading = true;
            const { id } = this.$route.params;
            newsDetail(
                {
                    type: "get"
                },
                id
            ).then(res => {
                this.loading = false;
                if (res.suceeded) {
                    this.data = res.data;
                }
            });
        },
        addComment() {
            if (!window.localStorage.getItem("authorization")) {
                this.$store.commit("TOGGLE_LOGIN");
                return false;
            }
            const { id } = this.$route.params;
            const { content } = this;
            addComment({
                type: "POST",
                data: {
                    content,
                    relatedId: id,
                    type: "NEWS",
                    userId: store.get("userId", "local")
                }
            }).then(res => {
                this.$refs.comment.getComment();
            });
        }
    },
    mounted() {
        this.getNewsDetail();
    }
};
</script>

<style lang="less">
.news_detail {
    display: flex;
    height: 100%;
    .recommend {
        height: 100%;
        width: 364px;
        .title {
            height: 55px;
            line-height: 55px;
            background: #fff;
            padding-left: 16px;
            font-size: 18px;
            font-family: MicrosoftYaHei;
            color: rgba(0, 0, 0, 1);
        }
    }
    .news_content {
        flex: 1;
        background: #fff;
        margin-left: 16px;
        padding: 25px;
        height: 100%;
        overflow-y: scroll;
        .detail {
            .title {
                font-size: 18px;
                font-family: MicrosoftYaHei;
                color: rgba(0, 0, 0, 1);
                line-height: 24px;
            }
            .organization {
                font-size: 12px;
                font-family: MicrosoftYaHei;
                color: rgba(153, 153, 153, 1);
                line-height: 16px;
                margin-top: 16px;
                margin-bottom: 24px;
            }
            .content {
                p {
                    font-size: 16px;
                    font-family: MicrosoftYaHei;
                    color: rgba(51, 51, 51, 1);
                    line-height: 30px;
                    letter-spacing: 1px;
                }
            }
        }
        .news_detail_comment {
            margin-top: 50px;
            .cmmment_title {
                h2 {
                    font-size: 18px;
                    font-family: MicrosoftYaHei;
                    color: rgba(0, 0, 0, 1);
                    line-height: 24px;
                    letter-spacing: 1px;
                    position: relative;
                    padding-left: 10px;
                    &::before {
                        content: "";
                        width: 4px;
                        height: 24px;
                        background: rgba(15, 79, 168, 1);
                        position: absolute;
                        left: 0;
                    }
                }
            }
            .comment_input {
                display: flex;
                margin-top: 23px;
                input {
                    flex: 1;
                    height: 49px;
                    line-height: 49px;
                    border: 1px solid rgba(221, 221, 221, 1);
                    color: rgba(153, 153, 153, 1);
                    font-size: 12px;
                    padding-left: 10px;
                }
                button {
                    width: 119px;
                    height: 48px;
                    background: rgba(22, 61, 163, 1);
                    color: #fff;
                }
            }
        }
        .announcement {
            margin: 40px 0;
            .announcement_title {
                h2 {
                    font-size: 18px;
                    font-family: MicrosoftYaHei;
                    color: rgba(0, 0, 0, 1);
                    line-height: 24px;
                    letter-spacing: 1px;
                    position: relative;
                    padding-left: 10px;
                    &::before {
                        content: "";
                        width: 4px;
                        height: 24px;
                        background: rgba(15, 79, 168, 1);
                        position: absolute;
                        left: 0;
                    }
                }
            }
            .announcement_content {
                margin-top: 17px;
                padding-left: 10px;
                a {
                    font-size: 16px;
                    font-family: MicrosoftYaHei;
                    color: rgba(15, 79, 168, 1);
                    line-height: 21px;
                    letter-spacing: 1px;
                }
            }
        }
    }
}
</style>
