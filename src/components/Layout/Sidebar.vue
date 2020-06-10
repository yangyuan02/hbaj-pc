<template>
    <aside>
        <div class="login">
            <div class="person">
                <div class="thumb"></div>
                <div class="name">船福</div>
            </div>
        </div>
        <div class="menu">
            <ul>
                <li v-for="(item, index) in menu" :key="index">
                    <i></i>
                    <span>{{ item.text }}</span>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            menu: [
                {
                    text: "主页",
                    icon: "",
                    path: ""
                },
                {
                    text: "公共课件",
                    icon: "",
                    path: ""
                },
                {
                    text: "海宝资讯",
                    icon: "",
                    path: ""
                },
                {
                    text: "我的课件",
                    icon: "",
                    path: ""
                },
                {
                    text: "我的任务",
                    icon: "",
                    path: ""
                },
                {
                    text: "我的通知",
                    icon: "",
                    path: ""
                }
            ]
        };
    }
};
</script>

<style lang="less">
aside {
    width: 255px;
    height: 100%;
    background: rgba(15, 79, 168, 1);
    .login {
        width: 100%;
        .person {
            width: 100%;
            .thumb {
                width: 76px;
                height: 76px;
                background: rgba(216, 216, 216, 1);
                border-radius: 50%;
                margin: 0 auto;
                margin-top: 26px;
                margin-bottom: 4px;
            }
            .name {
                margin: 0 auto;
                text-align: center;
                font-size: 20px;
                font-family: MicrosoftYaHei;
                color: rgba(255, 255, 255, 1);
                line-height: 26px;
                -webkit-background-clip: text;
            }
        }
    }
    .menu {
        margin-top: 77px;
        text-align: center;
        span {
            font-size: 24px;
            font-family: MicrosoftYaHei;
            color: rgba(255, 255, 255, 1);
            line-height: 31px;
            -webkit-background-clip: text;
        }
    }
}
</style>
