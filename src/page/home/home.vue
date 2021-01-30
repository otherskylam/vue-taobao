<template>
  <header>
    <head-search></head-search>
    <head-image></head-image>
    <!--    <div class="home_header">-->
    <!--      <a class="searchBox">-->
    <!--        <svg class="icon icon_search" aria-hidden="true">-->
    <!--          <use xlink:href="#icon-sousuo"></use>-->
    <!--        </svg>-->
    <!--        寻找宝贝店铺-->
    <!--      </a>-->
    <!--    </div>-->
  </header>
</template>

<script>
import headSearch from "@/page/home/headSearch";
import headImage from "@/page/home/headImage";
import '../../plugins/iconfont'

export default {
  name: "home",
  components: {
    headSearch,
    headImage
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

</style>