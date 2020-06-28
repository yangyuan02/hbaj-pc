<template>
    <div class="message_container">
        <div class="message_info">
            <Title title="用户中心"></Title>
            <div class="message_list">
                <my-header :info="user"></my-header>
                <div class="person-box">
                    <div class="role common" v-for="(item, index) in [1, 2]" :key="index">
                        <div class="thumb"></div>
                        <div class="name">
                            <span>海宝安检</span>
                        </div>
                        <div class="tag">
                            <span>角色</span>
                        </div>
                    </div>
                    <div class="organization common" v-for="(item, index) in [1, 2]" :key="index">
                        <div class="thumb">
                            <!-- <img :src="globalConfig.imagePath + item.avatar" alt="" /> -->
                        </div>
                        <div class="name">
                            <span>{{ item.name }}</span>
                        </div>
                        <div class="tag">
                            <span>机构</span>
                        </div>
                    </div>
                    <div class="auth-box" v-for="(item, Pindex) in blocks" :key="Pindex">
                        <div class="title">
                            <span class="ellipsis">{{ item.name }}访问权限</span>
                        </div>
                        <div class="major-box">
                            <div class="left-major">
                                <ul>
                                    <li
                                        class="ellipsis"
                                        v-for="(moduleItem, _moduleIndex) in item.moduleList"
                                        :key="_moduleIndex"
                                        :class="[_moduleIndex === ModuleIndex ? 'active' : '']"
                                        @click="setModuleIndex(Pindex, _moduleIndex)"
                                    >
                                        {{ moduleItem.name }}
                                    </li>
                                </ul>
                            </div>
                            <div class="right-major">
                                <div
                                    class="item"
                                    v-for="(itemClass, index) in item.classList"
                                    :key="index"
                                >
                                    <span class="ellipsis">{{ itemClass.name }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="tag">
                            <span>权限</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BgNav></BgNav>
    </div>
</template>

<script>
import Title from "@/components/common/Title";
import BgNav from "@/components/common/BgNav";
import MyHeader from "@/components/my-header";
export default {
    data() {
        return {};
    },
    components: {
        // MessageItem,
        Title,
        BgNav,
        MyHeader
    }
};
</script>

<style lang="less">
.message_container {
    display: flex;
    height: 100%;
    .message_info {
        width: 363px;
        .message_list {
            .person-box {
                padding: 14px 17px;
                background: #fff;
                min-height: 100%;
                .common {
                    display: flex;
                    align-items: center;
                    background: rgba(15, 79, 168, 1);
                    padding: 8px;
                    position: relative;
                    .thumb {
                        width: 60px;
                        height: 60px;
                        background: #f0f0f0;
                        margin-left: 25px;
                        margin-right: 15px;
                        border-radius: 5px;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 5px;
                            max-width: 100%;
                        }
                    }
                    .name {
                        font-size: 14px;
                        font-family: MicrosoftYaHei;
                        color: rgba(255, 255, 255, 1);
                        line-height: 19px;
                        -webkit-background-clip: text;
                    }
                    .tag {
                        width: 65px;
                        height: 20px;
                        background: rgba(224, 32, 32, 1);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 10px 0px 0px 10px;
                        position: absolute;
                        right: 0;
                        top: 8px;
                        span {
                            color: #fff;
                        }
                    }
                }
                .role {
                    margin-bottom: 8px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
                .organization {
                    margin: 8px 0;
                    .tag {
                        background: rgba(255, 213, 26, 1);
                    }
                }
                .auth-box {
                    position: relative;
                    // width: 6.8rem;
                    height: 175px;
                    background: rgba(15, 79, 168, 1);
                    border-radius: 5px;
                    padding-left: 10px;
                    padding-top: 10px;
                    margin-bottom: 8px;
                    &:last-child {
                        margin-bottom: 0rem;
                    }
                    .title {
                        span {
                            color: #fff;
                        }
                    }
                    .major-box {
                        display: flex;
                        margin-top: 10px;
                        .left-major {
                            ul {
                                display: flex;
                                flex-direction: column;
                                justify-content: space-around;
                                height: 100%;
                                li {
                                    color: #fff;
                                    position: relative;
                                    padding-left: 5px;
                                    &.active {
                                        &::before {
                                            content: "";
                                            height: 100%;
                                            width: 2px;
                                            position: absolute;
                                            left: 0;
                                            top: 0;
                                            background: rgba(255, 157, 59, 1);
                                        }
                                    }
                                }
                            }
                        }
                        .right-major {
                            width: 4.63rem;
                            height: 2.6rem;
                            background: rgba(0, 145, 255, 1);
                            border-radius: 0.1rem;
                            margin-left: 0.16rem;
                            padding: 0.1rem;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                            .item {
                                width: 1.28rem;
                                height: 0.4rem;
                                border-radius: 0.04rem;
                                border: 0.01rem solid rgba(255, 255, 255, 1);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                span {
                                    color: #fff;
                                    font-size: 0.24rem;
                                }
                            }
                        }
                    }
                    .tag {
                        position: absolute;
                        width: 1.3rem;
                        height: 0.4rem;
                        background: rgba(255, 157, 59, 1);
                        border-radius: 0.2rem 0px 0px 0.2rem;
                        right: 0;
                        top: 0.2rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        span {
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
    .message_right {
        flex: 1;
        background: #fff;
        margin-left: 15px;
    }
}
</style>
