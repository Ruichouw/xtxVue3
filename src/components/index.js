import Xtxsku from './XtxSku/index.vue'
import imgView from './imgView.vue'

export const componentPlugin = {
  install(app) {
    app.component('Xtxsku', Xtxsku)
    app.component('XtximgView', imgView)
  }
}
