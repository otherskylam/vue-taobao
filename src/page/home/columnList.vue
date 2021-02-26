<template>
  <div>
    <div class="columnList" :style="{height: columnListHeight()}">
      <div class="columnListLeft">
        <div class="leftFirst">
          <div>
            <div></div>
          </div>
          <div>
            <div>
              <span>品牌折扣</span>
              <div></div>
            </div>
          </div>
          <div></div>
        </div>
        <div class="leftSecond"></div>
        <div class="leftThird"></div>
      </div>
      <div class="columnListRight"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "columnList",
  data() {
    return {
      heightScale: 1.033,
      styleScale: {columnHeightScale: 1.033}
    }
  },
  methods: {
    columnListHeight: function () {
      return (window.innerWidth / this.styleScale.columnHeightScale) + 'px';
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

.columnList {
  @include wh(calc(100% - 20px), 200px);
  margin: 10px;
  display: flex;
  justify-content: space-between;
  //background: #fff;

  > div {
    @include wh(calc(50% - 1px), 100%);
    background: #fff;
  }

  .columnListLeft {
    border-top-left-radius: 12px;

    > div {
      @include wh(100%, 33.333%);
      display: flex;
    }

    .leftFirst {
      flex-wrap: wrap;

      > div {
        &:nth-child(1) {
          @include wh(100%, 24%);
          //background: red;
          display: flex;
          align-items: flex-end;

          > div {
            @include wh(100%, 67%);
            @include bg("../../image/columnList_jhs.png");
            background: {
              size: cover;
              position: center;
            };
          }
        }

        &:nth-child(2) {
          @include wh(50%, 76%);
          //background: blue;
          display: flex;
          justify-content: flex-end;

          > div {
            @include wh(85%, 100%);
            background-color: #fdf5f2;
            margin-right: 2px;
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
              @include bg("../../image/columnList_ppzkimg.png");
              background: {
                size: contain;
                position: center;
              }
            }
          }
        }

        &:nth-child(3) {
          @include wh(50%, 76%);
          background: gold;
        }
      }
    }
  }

  .columnListRight {
    border-top-right-radius: 12px;
  }
}
</style>