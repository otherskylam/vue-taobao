<template>
  <div>
    <div class="columnList" :style="{height: columnListHeight()}">
      <div class="columnListLeft">
        <div class="leftFirst">
          <div class="leftContainer leftFirstLeft">
            <div class="leftContainerTitle"></div>
            <div class="leftContainerImg">
              <span>品牌折扣</span>
              <div></div>
            </div>
          </div>
          <div class="leftContainer leftFirstRight">
            <div class="leftContainerTitle"></div>
            <div class="leftContainerImg">
              <span>划算好货</span>
              <div></div>
            </div>
          </div>
        </div>
        <div class="leftSecond">
          <div class="leftContainer leftSecondLeft">
            <div class="leftContainerTitle"></div>
            <div class="leftContainerImg">
              <span>限时半价</span>
              <div></div>
            </div>
          </div>
          <div class="leftContainer leftSecondRight">
            <div class="leftContainerTitle"></div>
            <div class="leftContainerImg">
              <span>9.9包邮</span>
              <div></div>
            </div>
          </div>
        </div>
        <div class="containerB leftThird">
          <div class="containerBTitle leftThirdTitle"></div>
          <div class="containerBLeft leftThirdLeft">
            <div class="containerBLeftBox leftThirdLeftBox">
              <span><span>挖深藏的店</span></span>
              <div></div>
            </div>
          </div>
          <div class="containerBRight leftThirdRight">
            <div></div>
          </div>
        </div>
      </div>
      <!--      TODO 标题是图片，有对不齐的情况，考虑是布局问题-->
      <div class="columnListRight">
        <div class="containerB" v-for="(item, index) in containerB" :key="index">
          <div class="containerBTitle"
               :style="{backgroundImage: 'url(' + require('../../image/' + item.title.imgName) + ')'}"></div>
          <div class="containerBLeft">
            <div class="containerBLeftBox">
              <!--              flex布局下，text-overflow: ellipsis无效，所以暂时先嵌套多一个span-->
              <span><span :style="{color: item.secTitle.color}">{{ item.secTitle.data }}</span></span>
              <div :style="{backgroundImage: 'url(' + require('../../image/' + item.leftImg.name) + ')'}"></div>
            </div>
          </div>
          <div class="containerBRight">
            <div :style="{backgroundImage: 'url(' + require('../../image/' + item.rightImg.name) + ')'}"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="touTiao" :style="{height: touTiaoHeight()}">
      <div class="touTiaoLogo">
        <div></div>
      </div>
      <div class="touTiaoList" id="touTiaoList"
           :style="{transform: 'translateY(' + touTiaoListInfo.translateY + 'px)', transitionDuration: touTiaoListInfo.duration}">
        <a class="touTiaoItem" v-for="(item, index) in touTiaoList" :key="index">
          <div class="touTiaoItemTag">{{ item.tag }}</div>
          <div class="touTiaoItemTitle">{{ item.title }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "columnList",
  data() {
    return {
      baseUrl: '../../image/',
      containerB: [
        {
          title: {imgName: 'columnList_tbzb.png'},
          secTitle: {data: '好物传送门', color: '#ff507d'},
          leftImg: {name: 'columnList_hwcsmimg1.png'},
          rightImg: {name: 'columnList_hwcsmimg2.jpg'}
        },
        {
          title: {imgName: 'columnList_yhh.png'},
          secTitle: {data: '全民口碑推荐', color: '#50bdff'},
          leftImg: {name: 'columnList_qmkbtjimg1.png'},
          rightImg: {name: 'columnList_qmkbtjimg2.jpg'}
        },
        {
          title: {imgName: 'columnList_wwsp.png'},
          secTitle: {data: '粉丝都爱看', color: '#ff611d'},
          leftImg: {name: 'columnList_fsdakimg1.png'},
          rightImg: {name: 'columnList_fsdakimg2.jpg'}
        }
      ],
      touTiaoList: [
        {tag: '摄影', title: '1分钟 |轻松解决8个手机摄影技巧'},
        {tag: '萌宠', title: '为什么唤猫的名字，它总不搭理？'},
        {tag: '摄影', title: '专治镜头尴尬症，7个女生通用pose'},
        {tag: '评测', title: '实测：五款最强防霾滤芯安利给你'}
      ],
      touTiaoListInfo: {
        height: 0,
        translateY: 0,
        currentIndex: 0,
        duration: '200ms',
        scrollTime: 1600,
        scrollId: ''
      },
      heightScale: 1.033,
      styleScale: {columnHeightScale: 1.033, tuTiaoHeightScale: 9.375}
    }
  },
  methods: {
    columnListHeight: function () {
      return (window.innerWidth / this.styleScale.columnHeightScale) + 'px';
    },

    touTiaoHeight: function () {
      this.touTiaoListInfo.height = window.innerWidth / this.styleScale.tuTiaoHeightScale;
      return this.touTiaoListInfo.height + 'px';
    },

    touTiaoAddEvent: function () {
      //TODO 考虑滚动到，才开始动画(不过淘宝本来也没这样做）
      let
          self = this,
          info = self.touTiaoListInfo,
          touTiaoListE = document.getElementById('touTiaoList');
      touTiaoListE.addEventListener('transitionend', function () {
        let cIndex = info.currentIndex;
        switch (cIndex) {
          case self.touTiaoList.length:
            clearInterval(info.scrollId);
            info.currentIndex = -1;
            info.translateY = info.height;
            info.duration = '1ms';
            break;
          case -1 :
            info.currentIndex = 0;
            info.translateY = 0;
            info.duration = '40ms';
            break;
          case 0 :
            self.initTouTiaoScroll();
        }
      });
    },

    initTouTiaoScroll: function () {
      this.touTiaoListInfo.scrollId = setInterval(this.setTouTiaoScroll, this.touTiaoListInfo.scrollTime);
    },

    setTouTiaoScroll: function () {
      let
          info = this.touTiaoListInfo,
          cIndex = info.currentIndex;
      info.duration = '200ms';
      info.currentIndex = cIndex + 1;
      info.translateY += -info.height;
    }
  },
  mounted() {
    this.touTiaoAddEvent();
    this.initTouTiaoScroll();
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

$borderRadius: 12px;
$bgColor: #fff;

.columnList {
  @include wh(calc(100% - 20px), 200px);
  margin: 10px 10px 2px 10px;
  display: flex;
  justify-content: space-between;

  > div {
    @include wh(calc(50% - 1px), 100%);
    background: $bgColor;
  }

  .columnListLeft {
    border-top-left-radius: $borderRadius;

    > div {
      @include wh(100%, 32.8%);
      display: flex;
    }

    .leftContainer {
      @include wh(50%, 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .leftContainerTitle {
        @include wh(100%, 22%);
        background-position: left bottom;
        background-size: contain;
      }

      .leftContainerImg {
        @include wh(81%, 76%);
        //background-color: #fdf5f2;
        margin-left: 2%;
        border-radius: 6px;

        > span {
          @include wh(100%, 30%);
          display: flex;
          align-items: center;
          color: #fe4e50;
          font: {
            size: 0.8125rem;
            weight: bold;
          };
          margin-left: 0.5rem;
        }

        > div {
          @include wh(100%, 70%);
          //@include bg("../../image/columnList_hshhimg.png");
          background: {
            size: contain;
            position: center;
          }
        }
      }
    }

    .leftFirstLeft {
      //justify-content: space-around;
      //align-items: center;

      .leftContainerTitle {
        @include bg("../../image/columnList_jhs.png");
        background-size: 200%;
      }

      .leftContainerImg {
        background-color: #fdf5f2;

        > span {
          color: #fe4e50;
        }

        > div {
          @include bg("../../image/columnList_ppzkimg.png");
        }
      }
    }

    .leftFirstRight {
      //justify-content: space-around;
      align-items: flex-start;

      .leftContainerImg {
        background-color: #fcf9f3;

        > span {
          color: #ff7518;
        }

        > div {
          @include bg("../../image/columnList_hshhimg.png");
        }
      }
    }

    .leftSecondLeft {
      .leftContainerTitle {
        @include bg("../../image/columnList_tqg.png");
      }

      .leftContainerImg {
        background-color: #fff8fa;

        > span {
          color: #fa2a59;
        }

        > div {
          @include bg("../../image/columnList_xsbjimg.png");
        }
      }
    }

    .leftSecondRight {
      align-items: flex-start;

      .leftContainerTitle {
        @include bg("../../image/columnList_tttm.png");
      }

      .leftContainerImg {
        background-color: #fff8f3;

        > span {
          color: #ff4c09;
        }

        > div {
          @include bg("../../image/columnList_99byimg.png");
        }
      }
    }

    .leftThird {
      //display: flex;
      //flex-wrap: wrap;
      //align-content: space-between;

      .leftThirdTitle {
        //@include wh(100%, 22%);
        @include bg("../../image/columnList_mrhd.png");
        //background: {
        //  size: contain;
        //  position: left bottom;
        //};
      }

      .leftThirdLeft {
        .leftThirdLeftBox {
          > span {
            color: #f9a500;
          }

          > div {
            @include bg("../../image/columnList_wscddimg1.png");
          }
        }
      }

      .leftThirdRight {
        //@include wh(50%, 76%);

        > div {
          @include wh(81%, 100%);
          @include bg("../../image/columnList_wscddimg2.jpg");
          background: {
            size: contain;
            position: center;
          };
        }
      }
    }
  }

  .containerB {
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;

    .containerBTitle {
      @include wh(100%, 22%);
      background: {
        repeat: no-repeat;
        size: contain;
        position: left bottom;
      };
    }

    .containerBLeft {
      @include wh(50%, 76%);
      display: flex;
      justify-content: space-around;

      .containerBLeftBox {
        @include wh(81%, 100%);
        margin-left: 2%;
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: flex-end;

        > span {
          //@include wh(100%, 30%);
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
          //align-items: center;
          //color: #f9a500;
          //font: {
          //  size: 0.8125rem;
          //  //weight: bold;
          //};
          margin-left: 0.25rem;
          //overflow: hidden;
          //text-overflow: ellipsis;
          //white-space: nowrap;
          > span {
            align-items: center;
            color: #f9a500;
            font: {
              size: 0.8125rem;
              //weight: bold;
            };
            //margin-left: 0.25rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        > div {
          @include wh(100%, 70%);
          background: {
            repeat: no-repeat;
            size: contain;
            position: center;
          }
        }
      }
    }

    .containerBRight {
      @include wh(50%, 76%);

      > div {
        @include wh(81%, 100%);
        margin: 0 auto;
        background: {
          repeat: no-repeat;
          size: contain;
          position: center;
        };
      }
    }
  }

  .columnListRight {
    border-top-right-radius: 12px;

    > div {
      @include wh(100%, 32.8%);
      display: flex;
    }
  }
}

.touTiao {
  @include wh(calc(100% - 20px), 40px);
  margin: 0 auto 300px auto;
  background: $bgColor;
  display: flex;
  overflow: hidden;

  .touTiaoLogo {
    @include wh(24%, 100%);
    border-bottom-left-radius: $borderRadius;

    > div {
      @include wh(75%, 100%);
      margin: 0 auto;
      @include bg("../../image/tbtoutiao.png");
      background: {
        size: contain;
        position: center;
      };
    }
  }

  .touTiaoList {
    @include wh(76%, 100%);
    border-bottom-right-radius: $borderRadius;
    //background: #666666;

    .touTiaoItem {
      @include wh(87%, 100%);
      display: flex;
      align-items: center;
      font-size: 0.8125rem;

      .touTiaoItemTag {
        justify-content: center;
        background-color: #feefec;
        color: #e86217;
        padding: 2px 6px;
        border-radius: 4px;
      }

      .touTiaoItemTitle {
        width: 77%;
        padding: 2px 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>