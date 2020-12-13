<template>
    <nav>
        <ul>
            <li
                v-for="(item, index) in listNav"
                :key="index"
                :class="[$route.query.name === item.title ? 'active' : '']"
                @click="handClick(item)"
                :style="{ 'background-image': `url(${globalConfig.imagePath + item.bgColor})` }"
                class="cursor"
            >
                <span>{{ item.title }}</span>
                <!-- <i class="iconfont" :class="[item.icon ? item.icon : '']"></i> -->
            </li>
        </ul>
    </nav>
</template>

<script>
import itemVue from "../../views/my/message/item.vue";
export default {
    data() {
        return {
            // list: [
            //     {
            //         title: "技术解读",
            //         icon: "icontubiaoweb-411",
            //         path: "",
            //         bgColor: "/pano/static/app/module/module_01.png",
            //         sort: 1
            //     },
            //     {
            //         title: "专业英语",
            //         icon: "icontubiaoweb-431",
            //         path: "",
            //         bgColor: "/pano/static/app/module/module_02.png",
            //         sort: 2
            //     },
            //     {
            //         title: "模拟训练",
            //         icon: "icontubiaoweb-42",
            //         path: "",
            //         bgColor: "/pano/static/app/module/module_03.png",
            //         sort: 3
            //     }
            // ]
            list: globalConfig.defaultInfo.APP_DEFAULT_MODULE.map(item => JSON.parse(item)).map(
                item => ({
                    title: item.title,
                    bgColor: item.image
                })
            )
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
            return (this.modulesList || [])
                .map(item => ({
                    ...item,
                    ...this.list.find(k => k.title === item.name)
                }))
                .sort((a, b) => a.sort - b.sort);
        }
    },
    methods: {
        handClick(data) {
            const { title, children } = data;
            const query = {
                name: title
            };
            if (children && children.length > 0) {
                query.moduleId = children[1].id;
                query.blockId = children[1].blockId;
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
            width: 170px;
            height: 119px;
            // border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            padding-left: 25px;
            padding-right: 14px;
            justify-content: center;
            margin-right: 38px;
            margin-bottom: 40px;
            background-size: cover;
            background-position: center;
            font-weight: bold;
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
