<template>
  <div>
    <header>
      <head-search></head-search>
      <head-image></head-image>
    </header>
    <channelList></channelList>
  </div>
</template>

<script>
import headSearch from "@/page/home/headSearch";
import headImage from "@/page/home/headImage";
import channelList from "@/page/home/channelList";
import '../../plugins/iconfont'

export default {
  name: "home",
  components: {
    headSearch,
    headImage,
    channelList
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

</style>