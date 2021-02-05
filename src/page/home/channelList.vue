<template>
  <div>
    <div class="channelListContainer" @scroll="updateScrollBar">
      <!--    TODO 由于for循环，无论下面的v-if是否生效，都会生产节点，所有会有很多空的div节点-->
      <div class="channelList" v-for="(item, index) in channelList" :key="index">
        <div v-if="index < channelList.length && index % 2 === 0">
          <a>
            <img :src="require('../../image/' + item.imgName + '.png')" :alt="item.name">
            <span>{{ item.name }}</span>
          </a>
          <a v-if="index < channelList.length - 1">
            <img :src="require('../../image/' + channelList[index + 1].imgName + '.png')"
                 :alt="channelList[index + 1].name">
            <span>{{ channelList[index + 1].name }}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="scrollBarContainer">
      <div class="scrollBarBg" :style="{width: scrollBarInfo.bgWidth}">
        <div class="scrollBar"
             :style="{width: scrollBarInfo.width, transform: 'translateX(' + scrollBarInfo.translateX + ')'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "channelList",
  data() {
    return {
      channelList: [
        {name: '天猫新品', imgName: 'home-item-1'},
        {name: '充值中心', imgName: 'home-item-2'},
        {name: '今日爆款', imgName: 'home-item-3'},
        {name: '机票酒店', imgName: 'home-item-4'},
        {name: '天猫国际', imgName: 'home-item-5'},
        {name: '金币庄园', imgName: 'home-item-6'},
        {name: '饿了么', imgName: 'home-item-7'},
        {name: '阿里拍卖', imgName: 'home-item-8'},
        {name: '天猫超市', imgName: 'home-item-9'},
        {name: '淘宝吃货', imgName: 'home-item-10'},
        {name: '分类', imgName: 'home-item-11'},
        {name: '闲鱼', imgName: 'home-item-12'},
        {name: '天猫美食', imgName: 'home-item-13'},
        {name: '会员中心', imgName: 'home-item-14'},
        {name: '阿里健康', imgName: 'home-item-15'},
        {name: '造点新货', imgName: 'home-item-16'},
        {name: '口碑生活', imgName: 'home-item-17'},
        {name: '土货鲜食', imgName: 'home-item-18'}
      ],
      scrollBarInfo: {translateX: 0, scale: null, width: '20px', bgWidth: '50px'}
    }
  },

  methods: {
    updateScrollBar: function (e) {
      let
          scrollBarInfo = this.scrollBarInfo,
          channelListContainer = e.target;
      if (scrollBarInfo.scale === null) {
        scrollBarInfo.scale = (channelListContainer.scrollWidth - channelListContainer.offsetWidth) / (parseInt(scrollBarInfo.bgWidth) - parseInt(scrollBarInfo.width));
      }
      scrollBarInfo.translateX = channelListContainer.scrollLeft / scrollBarInfo.scale + 'px';
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

.channelListContainer {
  display: flex;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}

.channelList {
  div {
    margin-left: 11px;

    a {
      @include wh(61px, 67px);
      display: flex;
      flex-direction: column;

      &:nth-child(1) {
        margin-top: 3px;
      }

      &:nth-child(2) {
        margin-top: 13px;
      }

      img {
        @include wh(61px, 48px)
      }

      span {
        font-size: 11px;
        line-height: 15px;
        color: #666666;
        margin-top: 4px;
      }
    }
  }
}

.scrollBarContainer {
  @include wh(100%, 20px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;

  .scrollBarBg {
    height: 3px;
    border-radius: 4px;
    background-color: #d4d8de;

    .scrollBar {
      height: 3px;
      border-radius: 4px;
      background-color: #ff6d2a;
    }
  }
}
</style>