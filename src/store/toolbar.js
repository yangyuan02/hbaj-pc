const state = {
    drawerIntro: false, // 简介
    drawerPerson: false, // 制作人员
    drawerAttachment: false, // 附件
    drawerHotContent: false, // 热点内容
    drawerGuideContent: false, // 引导内容
    drawerComment: false, // 课件评论
    drawerPlatGuide: false, // 启动引导
    drawerPlatGuide: false, // 启动引导
    drawerDigest: false, // 内容摘要
    drawerTrack: false, // 快速通道
    openScene: false, // 场景热点列表
    id: "" // 场景热点列表id
};

const mutations = {
    TOGGLE_DRAWER(state, type) {
        state[type] = !state[type];
    },
    SETSCENELIST(state, id) {
        state["openScene"] = true;
        state["id"] = id;
    }
};

export default {
    state,
    mutations
};
