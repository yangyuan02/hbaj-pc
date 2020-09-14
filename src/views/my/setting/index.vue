<template>
    <div class="message_container">
        <div class="message_info">
            <Title title="编辑信息" :isMore="false"></Title>
            <div class="message_list">
                <my-header
                    :info="user"
                    :onUploadSuccess="onUploadSuccess"
                    :isOnUplaod="true"
                    :isEdit="false"
                ></my-header>
                <div class="setting-edit-box">
                    <div class="info">
                        <ul>
                            <li>
                                <i class="iconfont icontubiao-18"></i>
                                <div class="border">
                                    <span>昵称</span>
                                    <input
                                        type="text"
                                        placeholder="请输入昵称"
                                        v-model="user.sgname"
                                    />
                                </div>
                            </li>
                            <li>
                                <i class="iconfont icontubiao-19"></i>
                                <div class="border">
                                    <span>邮箱</span>
                                    <input
                                        type="text"
                                        placeholder="请输入邮箱"
                                        v-model="user.email"
                                    />
                                </div>
                            </li>
                            <li>
                                <i class="iconfont icontubiao-20"></i>
                                <div class="border">
                                    <span>电话</span>
                                    <input
                                        type="text"
                                        placeholder="请输入电话"
                                        v-model="user.mobile"
                                        disabled
                                    />
                                </div>
                            </li>
                            <li>
                                <i class="iconfont icontubiao-21"></i>
                                <div class="border">
                                    <span>区域</span>
                                    <input
                                        type="text"
                                        placeholder="请输入区域"
                                        v-model="user.address"
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="digest">
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            v-model="user.description"
                        ></textarea>
                    </div>
                    <div class="save">
                        <button @click="updateUser">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <BgNav></BgNav>
    </div>
</template>

<script>
import Title from "@/components/common/Title";
import BgNav from "@/components/common/BgNav";
import MyHeader from "@/components/my-header";
import { user } from "@/model/api";
import store from "@/widget/store";
export default {
    data() {
        return {
            user: {
                user: {}
            }
        };
    },
    components: {
        Title,
        BgNav,
        MyHeader
    },
    methods: {
        getUserDetail() {
            const userId = store.get("userId", "local");
            user(
                {
                    type: "get"
                },
                userId
            ).then(res => {
                if (res.suceeded) {
                    this.user = res.data;
                }

                console.log(res);
            });
        },
        onUploadSuccess(data) {
            this.user.avatar = data.path;
        },
        updateUser() {
            const userId = store.get("userId", "local");
            user(
                {
                    type: "put",
                    data: this.user
                },
                `${userId}/profile`
            ).then(res => {
                if (res.suceeded) {
                    this.$router.push("/my/person");
                }
                console.log(res);
            });
        }
    },
    mounted() {
        this.getUserDetail();
    }
};
</script>

<style lang="less">
.message_container {
    display: flex;
    height: 100%;
    overflow: hidden;
    .message_info {
        width: 363px;
        background: #fff;
        .message_list {
            .setting-edit-box {
                .info {
                    ul {
                        padding: 0 0.24rem;
                        li {
                            // padding: 0.24rem 0;
                            display: flex;
                            align-items: center;
                            i {
                                font-size: 0.32rem;
                                &.icontubiao-18 {
                                    color: rgba(0, 126, 255, 1);
                                }
                                &.icontubiao-19 {
                                    color: rgba(238, 27, 27, 1);
                                }
                                &.icontubiao-20 {
                                    color: rgba(255, 157, 59, 1);
                                }
                                &.icontubiao-21 {
                                    color: rgba(255, 213, 26, 1);
                                }
                            }
                            .border {
                                margin-left: 0.24rem;
                                display: flex;
                                flex: 1;
                                padding: 0.24rem 0;
                                border-bottom: 0.01rem solid rgba(151, 151, 151, 1);
                                font-size: 0.28rem;
                                font-family: MicrosoftYaHei;
                                color: rgba(51, 51, 51, 1);
                                line-height: 0.49rem;
                                -webkit-background-clip: text;
                                input {
                                    flex: 1;
                                    padding-left: 0.24rem;
                                }
                            }
                        }
                    }
                }
                .digest {
                    margin: 0 auto;
                    margin-top: 0.24rem;
                    padding: 0 0.24rem;
                    height: 2.7rem;
                    textarea {
                        width: 100%;
                        height: 100%;
                        border-radius: 0.08rem;
                        border: 0.01rem solid rgba(221, 221, 221, 1);
                        font-size: 0.28rem;
                        padding: 0.1rem;
                        &:focus {
                            outline: none;
                        }
                    }
                }
                .save {
                    padding: 0 0.24rem;
                    height: 0.84rem;
                    margin: 0.24rem 0;
                    button {
                        width: 100%;
                        height: 0.84rem;
                        line-height: 0.84rem;
                        text-align: center;
                        background: rgba(15, 79, 168, 1);
                        border-radius: 0.1rem;
                        color: #fff;
                        font-size: 0.28rem;
                    }
                }
            }
        }
    }
    .message_right {
        flex: 1;
        background: #fff;
        margin-left: 15px;
    }
}
</style>
