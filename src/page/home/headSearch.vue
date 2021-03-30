<template>
  <!--  <header>-->
  <div class="home_header"
       :style="{paddingTop: style.homeHeader.padding.top, paddingRight: style.homeHeader.padding.right, paddingBottom: style.homeHeader.padding.bottom, paddingLeft: style.homeHeader.padding.left}">
    <!--      <input class="searchBox" type="text" placeholder="寻找宝贝店铺">-->
    <a class="searchBox" :style="{width: style.searchBox.width}" @click="goSearch">
      <svg class="icon icon_search" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      寻找宝贝店铺
    </a>
  </div>
  <!--  </header>-->
</template>

<script>
import '../../plugins/iconfont'
import router from "@/router";

export default {
  name: "headSearch",
  data() {
    return {
      style: {searchBox: {width: '0px'}, homeHeader: {padding: {top: '6px', right: '9px', bottom: '6px', left: '42px'}}}
    }
  },
  mounted() {
    //TODO 考虑优化，这样写padding很不好
    let paddingData = parseInt(this.style.homeHeader.padding.left) + parseInt(this.style.homeHeader.padding.right);
    this.style.searchBox.width = window.innerWidth - paddingData + 'px';
  },
  methods: {
    goSearch: function () {
      router.push('search');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

.home_header {
  width: 100%;
  @include bg("../../image/home_logo.png");
  background: {
    color: #FF852A;
    size: 27px 20px;
    position: 9px center;
  };
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

.searchBox {
  height: 25px;
  display: block;
  border-radius: 4px;
  background: #ff4e22;
  text-align: center;
  font-size: 13px;
  line-height: 25px;
  color: #fff;
}

.icon_search {
  font-size: 15px;
  color: #fff;
}
</style>