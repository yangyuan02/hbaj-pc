<template>
    <div class="item_comment">
        <div class="user_name">
            <span>用户123</span>
        </div>
        <div class="comment_content">
            <p class="ellipsisLineTwo">
                航运公司对网络安全的管理还在萌芽期，强烈建议所有公司根据自身的需求，在NIST 或者BIMCO
                网络安全框架下 的识别、保护、检测、响应和恢复五个功能上开始着手进行整改
            </p>
        </div>
        <div class="info">
            <div class="date">
                <span>今天：16：05</span>
            </div>
            <div class="like_content">
                <div class="like">
                    <i class="iconfont icondianzan"></i>
                    <span>20</span>
                </div>
                <div class="reply">
                    <span>回复</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style lang="less">
.item_comment {
    border-bottom: 1px solid #f5f5f5;
    padding: 15px 0px;
    .user_name {
        span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(15, 79, 168, 1);
            line-height: 19px;
        }
    }
    .comment_content {
        margin: 16px 0px;
        p {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
            line-height: 22px;
            letter-spacing: 1px;
        }
    }
    .info {
        display: flex;
        justify-content: space-between;
        color: rgba(153, 153, 153, 1);
        .like_content {
            display: flex;
            align-items: center;
            .like {
                span {
                    margin-left: 8px;
                }
            }
            .reply {
                margin-left: 14px;
            }
        }
    }
}
</style>
