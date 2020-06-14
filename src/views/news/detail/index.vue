<template>
    <div class="news_detail">
        <div class="recommend">
            <div class="title">
                <span>海宝资讯</span>
            </div>
            <Recommend></Recommend>
        </div>
        <div class="news_content">
            <div class="title">
                <p class="ellipsisLineTwo">
                    中华人民共和国海事局关于发布《船舶技术法规体系框架（2020）》的公告
                </p>
            </div>
            <div class="organization">
                <span>中国海事局</span>
                <span>2020-01-03</span>
            </div>
            <div class="content">
                <p>
                    为贯彻落实《交通强国建设纲要》工作部署，充分发挥船舶技术法规在推进造船业和航运业健康有序发展
                    中的指导、规范、引领和保障作用，针对船舶技术法规跨行业、跨领域、跨专业的特点，以需求为导向、
                    以技术为支撑、以服务为根本，建立适应新时代需要的涵盖船舶、海上设施和船运货物集装箱全生命周
                    期的船舶技术法规体系，制定本体系框架。
                    船舶技术法规体系是促进我国船舶技术法规科学化、合理化的重要基础，是今后一段时期开展船舶技
                    术法规制定修订工作和编具体工作计划的基本遵循，是促进我国水上运输及相关行业安全、便捷、高
                    效、绿色、经济发展的重要抓手。 01 法律依据
                    船舶技术法规是指为保障水上人命财产安全、防止环境污染、保障船员的工作和生活条件以及满足管
                    理基本需要，由中华人民共和国海事局根据有关法律行政法规授权组织制定的关于船舶、海上设施、
                    船运货物集装箱和船用产品等的国家强制性的技术和检验制度性要求。
                    制定船舶技术法规依据的法律行政法规主要有： 1.《中华人民共和国海上交通安全法》；
                    2.《中华人民共和国行政许可法》； 3.《中华人民共和国海洋环境保护法》；
                    4.《中华人民共和国水污染防治法》； 5.《中华人民共和国大气污染防治法》；
                    6.《中华人民共和国渔业法》； 7.《中华人民共和国特种设备安全法》；
                    8.《中华人民共和国标准化法》； 9.《中华人民共和国船舶和海上设施检验条例》；
                    10.《中华人民共和国渔业船舶检验条例》；
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import Recommend from "./recommend";
export default {
    data() {},
    components: {
        Recommend
    }
};
</script>

<style lang="less">
.news_detail {
    display: flex;
    .recommend {
        width: 364px;
        .title {
            height: 55px;
            line-height: 55px;
            background: #fff;
            padding-left: 16px;
            font-size: 18px;
            font-family: MicrosoftYaHei;
            color: rgba(0, 0, 0, 1);
        }
    }
    .news_content {
        flex: 1;
        background: #fff;
        margin-left: 16px;
        padding: 25px;
        .title {
            font-size: 18px;
            font-family: MicrosoftYaHei;
            color: rgba(0, 0, 0, 1);
            line-height: 24px;
        }
        .organization {
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: rgba(153, 153, 153, 1);
            line-height: 16px;
            margin-top: 16px;
            margin-bottom: 24px;
        }
        .content {
            p {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 21px;
                letter-spacing: 1px;
            }
        }
    }
}
</style>
