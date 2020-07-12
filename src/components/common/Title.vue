<template>
    <div class="title-box">
        <div class="title">
            <span>{{ title }}</span>
        </div>
        <div class="more" v-if="isMore">
            <span @click="dispatchEvent">更多</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        title: {
            // 显示的文字
            type: String,
            default: ""
        },
        onClick: {
            // 点击之后的回调
            type: Function,
            default: () => {}
        },
        isMore: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        dispatchEvent() {
            if (this.onClick && typeof this.onClick === "function") {
                this.onClick();
            }
        }
    }
};
</script>

<style lang="less">
.title-box {
    height: 55px;
    background: #fff;
    border-bottom: 1px solid rgba(245, 245, 245, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    .title {
        span {
            font-size: 18px;
            font-family: MicrosoftYaHei;
            color: rgba(0, 0, 0, 1);
            line-height: 24px;
            -webkit-background-clip: text;
        }
    }
    .more {
        span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(15, 79, 168, 1);
            line-height: 19px;
            -webkit-background-clip: text;
        }
    }
}
</style>
