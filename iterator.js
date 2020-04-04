function createIterator(items) {
  items[Symbol.iterator] = function () {
    let i = 0
    let done = false
    let that = this
    return {
      next() {
        done = i >= that.length
        return {
          value: that[i++],
          done
        }
      }
    }
  }
}

