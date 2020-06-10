<template>
    <nav>
        <ul>
            <li v-for="(item, index) in navList" :key="index">
                <span>技术解读</span>
                <i></i>
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
                    icon: "",
                    path: "",
                    background: "rgba(253,178,133,1)"
                },
                {
                    text: "专业英语",
                    icon: "",
                    path: "",
                    background: "rgba(253,144,147,1)"
                },
                {
                    text: "训练模拟",
                    icon: "",
                    path: "",
                    background: "rgba(153, 193, 254, 1)"
                },
                {
                    text: "待加模块",
                    icon: "",
                    path: "",
                    background: "rgba(97, 221, 160, 1)"
                }
            ]
        };
    }
};
</script>

<style lang="less">
nav {
    ul {
        li {
            width: 203px;
            height: 120px;
            border-radius: 12px;
        }
    }
}
</style>
