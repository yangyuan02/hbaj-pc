<template>
    <div class="submenu">
        <div class="submenu_list">
            <ul>
                <li v-for="(item, index) in list" :key="index">
                    <img :src="item.src" :alt="item.text" />
                    <div class="mask">
                        <span>{{ item.text }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="three_menu_list">
            <ul>
                <li
                    v-for="(item, index) in three_list"
                    :key="index"
                    :class="[index === 0 ? 'active' : '']"
                >
                    <span>{{ item.text }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import img1 from "./images/01.png";
import img2 from "./images/02.png";
import img3 from "./images/03.png";
import img4 from "./images/04.png";
export default {
    data() {
        return {
            list: [
                {
                    src: img1,
                    text: "豪华游轮"
                },
                {
                    src: img2,
                    text: "散货船"
                },
                {
                    src: img3,
                    text: "游船"
                },
                {
                    src: img4,
                    text: "集装箱船"
                }
            ],
            three_list: [
                {
                    text: "全部分类"
                },
                {
                    text: "救生"
                },
                {
                    text: "消防"
                },
                {
                    text: "无线电"
                },
                {
                    text: "航行安全"
                },
                {
                    text: "防污染"
                },
                {
                    text: "安全靠港"
                },
                {
                    text: "专项检查"
                }
            ]
        };
    }
};
</script>

<style lang="less">
.submenu {
    .submenu_list {
        ul {
            display: flex;
            justify-content: space-between;
            li {
                // width: 190px;
                height: 112px;
                max-width: 190px;
                position: relative;
                flex: 1;
                img {
                    width: 100%;
                    height: 100%;
                }
                .mask {
                    position: absolute;
                    left: 19px;
                    top: 19px;
                    width: 77px;
                    height: 21px;
                    text-align: center;
                    line-height: 21px;
                    color: #fff;
                    border-radius: 10px;
                    background: rgba(0, 0, 0, 0.3);
                }
            }
        }
    }
    .three_menu_list {
        margin: 20px 0;
        ul {
            display: flex;
            li {
                margin-right: 25px;
                &.active {
                    span {
                        color: rgba(255, 157, 59, 1);
                    }
                }
                span {
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    color: rgba(102, 102, 102, 1);
                    line-height: 19px;
                }
            }
        }
    }
}
</style>
