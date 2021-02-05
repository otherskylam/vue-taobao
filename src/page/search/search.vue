<template>
  <div class="searchBarBg" :style="{height: setSearchBarBgHeight()}">
    <div class="searchBarContainer">
      <div class="searchBar" :style="{width: style.searchBar.width, marginLeft: style.searchBar.marginLeft}">
        <div class="searchTabContainer">
          <div class="searchTab" @click="isShowSearchTabList">{{ searchTab.curTab }}</div>
          <div class="searchTabList" v-show="searchTab.showTabList">
            <ul>
              <li v-for="(tab, index) in searchTab.tabList" :key="index" @click="updateCurTab(tab.name)">
                <span></span>{{ tab.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="searchInputContainer">
          <input type="text" v-model="searchInput.content">
          <div class="searchDelBtn" v-show="searchInput.showDelBtn" @click="clearSearchInput"><span></span></div>
          <div class="searchBtn"><span></span></div>
        </div>
      </div>
      <a class="cancelBtn" ref="cancelBtn" @click="goHome">取消</a>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "search",
  data() {
    return {
      searchTab: {curTab: '宝贝', showTabList: false, tabList: [{name: '宝贝'}, {name: '店铺'}, {name: '天猫'}]},
      searchInput: {content: '', showDelBtn: false},
      style: {searchBar: {width: '0px', marginLeft: '12px'}}
    }
  },
  mounted() {
    this.style.searchBar.width = window.innerWidth - this.$refs.cancelBtn.clientWidth - parseInt(this.style.searchBar.marginLeft) + 'px';
  },
  watch: {
    'searchInput.content': function (val) {
      val === '' ? this.searchInput.showDelBtn = false : this.searchInput.showDelBtn = true;
    }
  },
  methods: {
    goHome: function () {
      router.push('/');
    },

    setSearchBarBgHeight: function () {
      return window.innerHeight + 'px';
    },

    /**
     * 控制tabList（宝贝，店铺，天猫）显示和隐藏
     */
    isShowSearchTabList: function () {
      this.searchTab.showTabList = !this.searchTab.showTabList;
    },

    /**
     * 跟新当前选择的tab
     */
    updateCurTab: function (tabName) {
      this.isShowSearchTabList();
      this.searchTab.curTab = tabName;
    },

    /**
     * 清空输入框
     */
    clearSearchInput: function () {
      this.searchInput.content = '';
    }
  }
}
</script>

<style>

</style>

<style lang="scss" scoped>
@import "../../style/mixin";

.searchBarBg {
  width: 100%;
  background: #eee;
}

.searchBarContainer {
  @include wh(100%, 32px);
  padding: 6px 0;
  display: flex;
  font-size: 14px;
  background: #fff;
  border-bottom: 1px solid #dbdbdb;

  .searchBar {
    height: 100%;
    background: #e3e3e5;
    border-radius: 4px;
    position: relative;
    display: flex;

    .searchTabContainer {
      position: relative;

      .searchTab {
        width: 56px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #999;
        position: relative;

        &::after {
          content: '';
          @include wh(6px, 3px);
          @include bg('../../image/search_dropdown.png');
          background-size: 6px 3px;
          position: absolute;
          top: 14px;
          right: 5px;
        }
      }

      .searchTabList {
        position: absolute;
        left: 0;
        top: 30px;
        padding: 10px;

        ul {
          width: 140px;
          background: #484d50;
          color: #c7c8c9;
          border-radius: 6px;

          li {
            border-top: 1px solid #707476;
            height: 35px;
            line-height: 37px;
            display: flex;

            span {
              @include bg('../../image/iconList.png');
              background-size: 106px, 543px;
              display: block;
              margin: 9px 10px;
            }

            &:nth-child(1) {
              border: none;

              span {
                @include wh(20px, 22px);
                background-position: -3px -164px;
                margin-top: 7px;
              }
            }

            &:nth-child(2) {
              span {
                @include wh(21px, 19px);
                background-position: -3px -245px;
              }
            }

            &:nth-child(3) {
              span {
                @include wh(21px, 20px);
                background-position: -3px -192px;
              }
            }
          }

          &::after {
            content: '';
            @include wh(10px);
            position: absolute;
            top: 5px;
            left: 20px;
            background: #484d50;
            transform: rotate(45deg);
          }
        }
      }
    }

    .searchInputContainer {
      display: flex;
      align-items: center;

      input {
        width: 100%;
        height: 22px;
        padding: 0 60px 0 5px;
        border: none;
        background: none;

        &:focus {
          outline: none;
        }
      }

      .searchDelBtn {
        @include wh(40px, 32px);
        position: absolute;
        right: 30px;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          @include wh(14px);
          @include bg('../../image/search_delete.png');
          background-size: 14px 14px;
          display: block;
        }
      }

      .searchBtn {
        @include wh(30px, 32px);
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;

        span {
          @include wh(18px);
          @include bg('../../image/iconList.png');
          background-size: 106px, 543px;
          background-position: -3px -372px;
          display: block;
        }
      }
    }
  }


  .cancelBtn {
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
}
</style>