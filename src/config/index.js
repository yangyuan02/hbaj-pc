import { home } from "@/model/api";
import Vue from "vue";

export const getDefaultInfo = async () => {
    try {
        const data = await home(
            {
                type: "get"
            },
            "defaultBlocks"
        );
        Vue.prototype.globalConfig.defaultBlocks = data.data || [];
        return data;
    } catch (error) {
        console.log(error);
    }
};
