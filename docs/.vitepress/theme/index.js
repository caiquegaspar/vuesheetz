import DefaultTheme from 'vitepress/theme'

import { VueSheetzComponent } from 'vuesheetz';

import 'vuesheetz/dist/style.css';
import '../style/vars.css'

export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    app.component('VueSheetzComponent', VueSheetzComponent)
  }
}
