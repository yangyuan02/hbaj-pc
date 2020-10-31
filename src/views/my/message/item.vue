<!--
 * @Author: yangyuan
 * @Date: 2020-04-19 18:58:59
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-01 21:25:43
 * @Description: 
 -->
<template>
    <div class="message-item-content cursor" @click="message(item)">
        <div class="role">
            <div class="role-type">
                <div class="thumb"></div>
                <div class="text">
                    <span>系统管理员</span>
                </div>
            </div>
            <div class="role-info">
                <div class="type-thumb-bg">
                    <i class="iconfont icontubiao-17"></i>
                </div>
                <div class="tags">
                    <span>{{ item.messageType | formMessageText }} </span>
                </div>
            </div>
        </div>
        <div class="digest">
            <p>{{ item.content }}</p>
        </div>
    </div>
</template>
<script>
import { messageDetail } from "@/model/api";

export default {
    props: {
        item: {
            type: Object,
            default: {}
        },
        onSuccess: {
            type: Function,
            default: () => {}
        }
    },
    methods: {
        message(item) {
            const { id, status } = item;
            if (status === 1) {
                return this.$message.error("消息是已读状态");
            }
            messageDetail(
                {
                    type: "PATCH"
                },
                `${id}/read`
            ).then(res => {
                if (res.suceeded) {
                    item.status = 0;
                    this.onSuccess && this.onSuccess();
                    this.$message.success("消息已读");
                }
                console.log(res);
            });
        }
    }
};
</script>

<style lang="less">
.message-item-content {
    // width: 363px;
    height: 181px;
    // margin: 0 auto;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1 2px 0px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    filter: blur(0px);
    &:last-child {
        margin-bottom: 0;
    }
    &.unread {
        background: rgba(238, 238, 238, 1);
    }
    .role {
        height: 90px;
        background: rgba(96, 175, 255, 1);
        display: flex;
        border-radius: 5px 5px 0 0;
        position: relative;
        .role-type {
            display: flex;
            align-items: center;
            margin-left: 16px;
            .thumb {
                width: 52px;
                height: 52px;
                border-radius: 50%;
                background: url("./images/admin.png") no-repeat;
                background-size: 100%;
            }
            .text {
                margin-left: 18px;
                span {
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    color: rgba(22, 61, 163, 1);
                    line-height: 18px;
                    -webkit-background-clip: text;
                }
            }
        }
        .role-info {
            flex: 1;
            position: relative;
            .type-thumb-bg {
                position: absolute;
                bottom: 0;
                right: 75px;
                i {
                    font-size: 60px;
                    color: rgba(0, 126, 255, 0.26);
                }
            }
            .tags {
                position: absolute;
                right: 0;
                top: 18px;
                width: 75px;
                height: 20px;
                background: rgba(224, 32, 32, 1);
                border-radius: 10px 0px 0px 10px;
                text-align: center;
                line-height: 20px;
                span {
                    font-size: 12px;
                    font-family: MicrosoftYaHei;
                    color: rgba(255, 255, 255, 1);
                    line-height: 15px;
                    -webkit-background-clip: text;
                }
            }
        }
    }
    .digest {
        padding: 14px 17px;
        p {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(51, 51, 51, 1);
            line-height: 19px;
            letter-spacing: 1;
            -webkit-background-clip: text;
        }
    }
}
</style>
