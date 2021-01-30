<template>
<!--  <header>-->
    <div class="home_header">
      <!--      <input class="searchBox" type="text" placeholder="寻找宝贝店铺">-->
      <a class="searchBox">
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

export default {
  name: "headSearch"
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
  padding: 6px 9px 6px 42px;
}

.searchBox {
  @include wh(324px, 25px);
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