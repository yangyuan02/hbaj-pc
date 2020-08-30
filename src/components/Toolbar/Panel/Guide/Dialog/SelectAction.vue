<template>
    <el-dialog
        title="添加动作"
        :visible.sync="visible"
        :close-on-click-modal="false"
        @open="open"
        @close="close"
        width="600px"
        append-to-body
    >
        <main class="SelectAction" v-loading="loading">
            <SelectAction
                placeholder="图片描述"
                title="人物或动画形象选择"
                :list="guideHotspotImage"
                :onSelect="url => onSelect('img1', url)"
            ></SelectAction>
            <SelectAction
                placeholder="动作描述"
                title="动作"
                :list="actionList"
                :onSelect="url => onSelect('img2', url)"
            ></SelectAction>
        </main>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>
import SelectAction from "@/components/SelectAction";
import { home } from "@/model/api";

import flashaction from "../../images/action/flashaction.png";
import jumpaction from "../../images/action/jumpaction.png";
import leftaction from "../../images/action/flashaction.png";
import narrowaction from "../../images/action/flashaction.png";
import none from "../../images/action/flashaction.png";
import rightaction from "../../images/action/flashaction.png";
import rotateaction from "../../images/action/flashaction.png";
import swingaction from "../../images/action/flashaction.png";
import upaction from "../../images/action/flashaction.png";
import yrotateaction from "../../images/action/flashaction.png";

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        onConfirm: {
            type: Function,
            default: () => {}
        }
    },
    components: {
        SelectAction
    },
    data() {
        return {
            guideHotspotImage: [],
            loading: false,
            checkedData: {},
            actionList: [
                flashaction,
                jumpaction,
                leftaction,
                narrowaction,
                none,
                rightaction,
                rotateaction,
                swingaction,
                upaction,
                yrotateaction
            ]
        };
    },
    methods: {
        open() {
            this.getActionList();
        },
        close() {
            this.$emit("update:visible", false);
        },
        save() {
            this.close();
            this.onConfirm && this.onConfirm(this.checkedData);
        },
        getActionList() {
            this.loading = true;
            home({ type: "get" }, "/pageInfo").then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    this.guideHotspotImage = res.data.guideHotspotImage || [];
                }
                console.log(res);
            });
        },
        onSelect(type, url) {
            this.checkedData[type] = url;
        }
    }
};
</script>

<style lang="less">
.SelectAction {
    display: flex;
    justify-content: space-between;
}
</style>
