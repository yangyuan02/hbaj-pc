<template>
    <nav>
        <ul>
            <li
                v-for="(item, index) in listNav"
                :key="index"
                :class="[$route.query.name === item.title ? 'active' : '']"
                @click="handClick(item)"
                :style="{ 'background-color': item.bgColor }"
            >
                <span>{{ item.title }}</span>
                <i class="iconfont" :class="[item.icon ? item.icon : '']"></i>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {
                    title: "技术解读",
                    icon: "icontubiaoweb-07",
                    path: "",
                    bgColor: "rgba(253,178,133,1)"
                },
                {
                    title: "专业英语",
                    icon: "icontubiaoweb-07",
                    path: "",
                    bgColor: "rgba(253,144,147,1)"
                },
                {
                    title: "模拟训练",
                    icon: "icontubiaoweb-07",
                    path: "",
                    bgColor: "rgba(153, 193, 254, 1)"
                }
            ]
        };
    },
    props: {
        modulesList: {
            type: Array,
            default: []
        },
        path: {
            type: String,
            default: ""
        }
    },
    computed: {
        listNav: function() {
            return (this.modulesList || []).map(item => ({
                ...item,
                ...this.list.find(k => k.title === item.name)
            }));
        }
    },
    methods: {
        handClick(data) {
            const { title, children } = data;
            const query = {
                name: title
            };
            if (children && children.length > 0) {
                query.moduleId = children[0].id;
                query.blockId = children[0].blockId;
                if (children[0].classList && children[0].classList.length > 0) {
                    query.classListId = children[0].classList[0].id;
                }
            }
            this.$router.push({
                path: this.path,
                query
            });
        }
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
