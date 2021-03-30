<template>
  <div class="headImage" :style="{height: headImageHeight()}" @touchstart="touchStart" @touchmove="touchMove"
       @touchend="touchEnd">
    <div class="imgList">
      <ul>
        <li v-for="item in imgItems" :key="item.id"
            :style="{opacity: item.opacity, zIndex: item.zIndex, transitionDuration: item.transitionDuration, transform: 'translate(' + item.translate.x + ','  + item.translate.y + ')'}">
          <a>
            <img :src="require('../../image/' + item.name + '.jpg')" @click="goDetail">
          </a>
        </li>
      </ul>
    </div>
    <div class="circleList">
      <span v-for="circle in imgItems" :key="circle.id"
            :style="{background: circle.circleInfo.color, opacity: circle.circleInfo.opacity}"></span>
    </div>
<!--    TODO 在PC上测试时候（iPhoneX分辨率下），最下面不可以完全遮挡图片，暂时不知道什么问题，手机上查看暂时没问题-->
    <div class="imgBg"></div>
  </div>
</template>

<script>
export default {
  name: "headImage",
  data() {
    return {//TODO 考虑优化不需要放在data里面的变量，img数据以后考虑从数据库导入
      imgItems: [
        {
          id: '1',
          name: 'zz-1',
          zIndex: 99,
          translate: {x: '0px', y: '0px'},
          transitionDuration: '0ms',
          circleInfo: {color: '#fff', opacity: 0.3}
        },
        {
          id: '2',
          name: 'zz-2',
          zIndex: 97,
          translate: {x: '0px', y: '0px'},
          transitionDuration: '0ms',
          circleInfo: {color: '#fff', opacity: 0.3}
        },
        {
          id: '3',
          name: 'zz-3',
          zIndex: 97,
          translate: {x: '0px', y: '0px'},
          transitionDuration: '0ms',
          circleInfo: {color: '#fff', opacity: 0.3}
        },
        {
          id: '4',
          name: 'zz-4',
          zIndex: 97,
          translate: {x: '0px', y: '0px'},
          transitionDuration: '0ms',
          circleInfo: {color: '#fff', opacity: 0.3}
        },
        {
          id: '5',
          name: 'zz-5',
          zIndex: 97,
          translate: {x: '0px', y: '0px'},
          transitionDuration: '0ms',
          circleInfo: {color: '#fff', opacity: 0.3}
        },
        {
          id: '6',
          name: 'zz-6',
          zIndex: 97,
          translate: {x: '0px', y: '0px'},
          transitionDuration: '0ms',
          circleInfo: {color: '#fff', opacity: 0.3}
        },
        {
          id: '7',
          name: 'zz-7',
          zIndex: 97,
          translate: {x: '0px', y: '0px'},
          transitionDuration: '0ms',
          circleInfo: {color: '#fff', opacity: 0.3}
        },
        {
          id: '8',
          name: 'zz-8',
          zIndex: 97,
          translate: {x: '0px', y: '0px'},
          transitionDuration: '0ms',
          circleInfo: {color: '#fff', opacity: 0.3}
        },
      ],
      winWidth: '',
      currentIndex: 0,
      heightScale: 3.125,
      scrollTime: 2000,
      duration: '400ms',
      scrollId: '',
      touchInfo: {startX: 0, moveX: 0, endX: 0, disX: 0, preX: 0}
    }
  },
  methods: {
    /**
     * 获取浏览器宽度并保存
     * @returns {string}
     */
    headImageHeight: function () {
      this.winWidth = window.innerWidth;
      return (window.innerWidth / this.heightScale) + 'px';
    },

    /**
     * 根据浏览器宽度，初始化除第一张图以外的图片位移（最后一张在左边，其他在右边）
     */
    initTranslateX: function () {
      let
          items = this.imgItems,
          itemsLength = items.length,
          winWidth = this.winWidth;
      for (let i = 1; i < itemsLength; i++) {
        if (i === itemsLength - 1) {
          this.setItemTranslate(i, '-' + winWidth, false);
        } else {
          this.setItemTranslate(i, winWidth, false);
        }
      }
      items[0].circleInfo.color = '#ff5000';
      items[0].circleInfo.opacity = 1;
    },

    /**
     * 图片向左移动
     */
    scrollToLeft: function () {
      let
          cIndex = this.currentIndex,
          nIndex = this.getNIndex(),
          ntIndex = this.getNtIndex();
      //当前的向左移动，下一个图移动到中间，下下个图回到最右边
      this.setItemTranslate(cIndex, '-' + this.winWidth, true);
      this.setItemTranslate(nIndex, '0', true);
      this.setItemTranslate(ntIndex, this.winWidth, false);
      this.setCircleCss(nIndex, cIndex);
      this.currentIndex = nIndex;
    },

    /**
     * 取消图片向左移动
     */
    cancelScrollToLeft: function () {
      let
          cIndex = this.currentIndex,
          nIndex = this.getNIndex();
      this.setItemTranslate(cIndex, 0, true);
      this.setItemTranslate(nIndex, this.winWidth, true);
    },

    /**
     * 图片向右移动
     */
    scrollToRight: function () {
      let
          cIndex = this.currentIndex,
          pIndex = this.getPIndex(),
          ptIndex = this.getPtIndex();
      // 当前图向右移动，上一个图移动到中间，上上个图回到最左边
      this.setItemTranslate(cIndex, this.winWidth, true);
      this.setItemTranslate(pIndex, 0, true);
      this.setItemTranslate(ptIndex, '-' + this.winWidth, false);
      this.setCircleCss(pIndex, cIndex);
      this.currentIndex = pIndex;
    },

    /**
     * 取消图片向右移动
     */
    cancelScrollToRight: function () {
      let
          cIndex = this.currentIndex,
          pIndex = this.getPIndex();
      this.setItemTranslate(cIndex, 0, true);
      this.setItemTranslate(pIndex, '-' + this.winWidth, true);
    },

    /**
     * 获取下张图片的index
     */
    getNIndex: function () {
      return this.currentIndex === this.imgItems.length - 1 ? 0 : this.currentIndex + 1
    },

    /**
     * 获取下下张图片的index
     */
    getNtIndex: function () {
      let nIndex = this.getNIndex();
      return nIndex === this.imgItems.length - 1 ? 0 : nIndex + 1
    },

    /**
     * 获取上张图片的index
     */
    getPIndex: function () {
      return this.currentIndex === 0 ? this.imgItems.length - 1 : this.currentIndex - 1
    },

    /**
     * 获取上上张图片的index
     */
    getPtIndex: function () {
      let pIndex = this.getPIndex();
      return pIndex === 0 ? this.imgItems.length - 1 : pIndex - 1;
    },

    /**
     * 设置图片移动
     * @param itemIndex 图片的index
     * @param translateX x轴移动距离
     * @param setDuration 移动持续时间，可以直接传入时间，或者布尔值，true代表按默认时间移动，false代表按0ms移动
     */
    setItemTranslate: function (itemIndex, translateX, setDuration) {
      let
          item = this.imgItems[itemIndex],
          type = typeof setDuration;
      if (type === 'string') {
        item.transitionDuration = setDuration;
      } else if (type === 'boolean') {
        item.transitionDuration = setDuration === true ? this.duration : '0ms';
      }
      item.translate.x = translateX + 'px';
    },
    /**
     * 设置自动滚动
     */
    setScroll: function () {
      this.scrollId = setInterval(this.scrollToLeft, this.scrollTime);
    },

    /**
     * 设置小圆圈样式
     * @param setIndex
     * @param unsetIndex
     */
    setCircleCss: function (setIndex, unsetIndex) {
      let
          items = this.imgItems,
          setItemInfo = items[setIndex].circleInfo,
          unsetItemInfo = items[unsetIndex].circleInfo;
      setItemInfo.color = '#ff5000';
      setItemInfo.opacity = 1
      unsetItemInfo.color = '#fff';
      unsetItemInfo.opacity = 0.3;
    },

    /**
     * touch事件
     * @param e
     */
    touchStart: function (e) {
      clearInterval(this.scrollId);
      if (e.touches.length === 1) {
        this.touchInfo.startX = e.touches[0].clientX;
      }
    },

    touchMove: function (e) {
      if (e.touches.length === 1) {
        let
            info = this.touchInfo,
            items = this.imgItems,
            cIndex = this.currentIndex,
            //下一个index
            nIndex = this.getNIndex(),
            pIndex = cIndex === 0 ? items.length - 1 : cIndex - 1;
        info.moveX = e.touches[0].clientX;
        info.disX = info.moveX - info.startX;

        if (info.disX > 10) {// 左至右
          this.setItemTranslate(cIndex, info.disX, false);
          this.setItemTranslate(pIndex, info.disX - this.winWidth, false);
        } else if (info.disX < -10) {// 右至左,设置当前图片和下一张图片移动
          this.setItemTranslate(cIndex, info.disX, false);
          this.setItemTranslate(nIndex, this.winWidth + info.disX, false);
        }
      }
    },

    touchEnd: function () {
      let disX = this.touchInfo.disX;
      if (disX > 0) {
        // TODO 考虑优化Math.abs(disX) > this.winWidth / 8
        Math.abs(disX) > this.winWidth / 8 ? this.scrollToRight() : this.cancelScrollToRight();
      } else {
        Math.abs(disX) > this.winWidth / 8 ? this.scrollToLeft() : this.cancelScrollToLeft();
      }
      this.setScroll();
    },

    goDetail: function (e) {
      // TODO 点击事件
      console.log(e);
    }
  },
  mounted() {
    this.initTranslateX();
    this.setScroll();
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

.headImage {
  width: 100%;
  margin-top: 37px;
  position: relative;

  ul {
    @include wh(100%, 100%);
    overflow: hidden;

    li {
      @include wh(100%, 100%);
      display: block;
      position: absolute;

      img {
        @include wh(100%, 100%);
      }
    }
  }
}

.circleList {
  //@include wh(100%, 8px);
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 100;

  span {
    @include wh(8px);
    border-radius: 100%;
    display: inline-block;
    margin: 10px 2px;
    //transition-duration: 300ms;
  }
}

.imgBg {
  @include wh(100%, 10px);
  position: absolute;
  bottom: 0;
  z-index: 101;
  @include bg("../../image/headImgBg.png");
  background-position: center center;
  background-size: 100%;
}
</style>