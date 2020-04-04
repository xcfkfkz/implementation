class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash';
    this.routes = options.routes || [];
    this.routeMap = this.createMap(this.routes);
    this.history = { current: null };
    this.init()
  }
  createMap(routes) {
    return routes.reduce((pre, cur) => {
      pre[cur.path] = cur.component;
      return pre;
    }, {})
  }
  init() {
    if(this.mode === 'hash') {
      // location.hash = location.hash || '/';
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1)
      });
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1)
      })
    } else if(this.mode === 'history') {
        // location.pathname ? null : location.pathname = '/';
        window.addEventListener('load', () => {
          this.history.current = location.pathname
        });
        window.addEventListener('popstate', () => {
          this.history.current = location.pathname
        })
    }
  }
}
VueRouter.install = function (_Vue) {
  _Vue.mixin({
    beforeCreate() {
      if(this.$options && this.$options.router) {
        this.$router = this.$options.router;
        // _Vue.util.defineReactive()
        let history = new _Vue({
          data: {
            history: this.$options.router.history
          }
        }).history;
        Object.defineProperty(this, '$route', {
          get() { return history.current }
        })
      } else {
        console.log(this.$parent);
        this.$router = this.$parent && this.$parent.$router;
        Object.defineProperty(this, '$route', {
          get() { return this.$router.history.current }
        })
      }
    }
  });
  _Vue.component('router-link', {
    props: {
      to: String
    },
    render() {
      let mode = this._self.$router.mode;
      return <a href={ mode === 'hash' ? `#${this.to}` : this.to }>{this.$slots.default}</a>;
    }
  });
  _Vue.component('router-view', {
    render(h) {
      return h(this._self.$router.routeMap[this._self.$route])
    }
  })
};
export default VueRouter