<template>
    <nav>
        <ul>
            <li
                v-for="(item, index) in navList"
                :key="index"
                :style="{ 'background-color': item.background }"
            >
                <span>{{ item.text }}</span>
                <i class="iconfont" :class="[item.icon ? item.icon : '']"></i>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            navList: [
                {
                    text: "技术解读",
                    icon: "icontubiaoweb-07",
                    path: "",
                    background: "rgba(253,178,133,1)"
                },
                {
                    text: "专业英语",
                    icon: "icontubiaoweb-07",
                    path: "",
                    background: "rgba(253,144,147,1)"
                },
                {
                    text: "训练模拟",
                    icon: "icontubiaoweb-07",
                    path: "",
                    background: "rgba(153, 193, 254, 1)"
                }
            ]
        };
    }
};
</script>

<style lang="less">
nav {
    height: 100%;
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            width: 203px;
            height: 120px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            color: #fff;
            padding-left: 25px;
            padding-right: 14px;
            justify-content: space-between;
            margin-right: 38px;
            margin-bottom: 40px;
            cursor: default;
            span {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: rgba(255, 255, 255, 1);
                line-height: 21px;
                letter-spacing: 1px;
                -webkit-background-clip: text;
            }
            i {
                font-size: 65px !important;
            }
        }
    }
}
</style>
