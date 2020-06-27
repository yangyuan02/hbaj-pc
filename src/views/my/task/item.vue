<!--
 * @Author: yangyuan
 * @Date: 2020-04-20 22:10:56
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-01 21:20:39
 * @Description: 
 -->
<template>
    <div class="task-item-content">
        <div class="task-item-title">
            <div class="text">
                <p class="ellipsisLineTwo">2019年PSC集中大会站检要点-专题说明</p>
            </div>
            <div class="status">
                <span>未完成</span>
            </div>
        </div>
        <div class="task-item-detail">
            <div class="task-item-thumb ui-lazyLoad-pic">
                <div class="action">
                    <span>立即执行</span>
                </div>
            </div>
            <div class="task-item-digest">
                <div class="duty"><span>负责人:</span><span>yangyuan</span></div>
                <div class="start-time"><span>发起时间:</span><span>2020-06-06</span></div>
                <div class="end-time"><span>结束时间:</span><span>2020-06-06</span></div>
                <div class="member-content">
                    <div class="text"><span>协作成员:</span></div>
                    <div class="member-item">
                        <span>zhangsan</span>
                        <span>zhangsan</span>
                        <span>zhangsan</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/widget/lazyLoad";
export default {
    props: {
        item: {
            type: Object,
            default: {}
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
            width: 35px;
            height: 17px;
            background: rgba(255, 157, 59, 1);
            border-radius: 1px;
            text-align: center;
            line-height: 17px;
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
                width: 90px;
            }
            .member-content {
                display: flex;
                flex: 1;
                .member-item {
                    display: flex;
                    flex-wrap: wrap;
                    span {
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
</style>
