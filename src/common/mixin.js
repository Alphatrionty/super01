

export const itemListerMixin = {
  mounted() {

    let newRefresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}