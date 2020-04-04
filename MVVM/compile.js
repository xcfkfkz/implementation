class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    if(this.el) {
      let fragment = this.node2fragment(this.el);
      this.compile(fragment);
      this.el.appendChild(fragment)
    }
  }
  isElementNode(node) {
    return node.nodeType === 1
  }
  isDirective(name) {
    return name.indexOf('v-') === 0
  }

  node2fragment(el) {
    let fragment = document.createDocumentFragment();
    while(el.firstChild) {
      fragment.appendChild(el.firstChild)
    }
    return fragment
  }
  compileElement(node) {
    Array.from(node.attributes).forEach(attr => {
      if(this.isDirective(attr.name)) {
        CompileUtil[attr.name.slice(2)](node, this.vm, attr.value)
      }
    })
  }
  compileText(node) {
    node.textContent = node.textContent.replace(/\{\{([^}]+)\}\}/g, (match, $) => {
      return CompileUtil.getVal(this.vm, $.trim());
    })
  }
  compile(fragment) {
    // for(let node of fragment.childNodes) { console.log(node) }
    Array.from(fragment.childNodes).forEach(node => {
      if(this.isElementNode(node)) {
        this.compileElement(node);
        this.compile(node)
      } else {
        this.compileText(node)
      }
    })
  }
}
