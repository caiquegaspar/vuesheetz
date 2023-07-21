import DefaultTheme from 'vitepress/theme'

import '../style/vars.css'

// import { VueSheetzComponent } from 'vuesheetz';
// import 'vuesheetz/dist/style.css';

import { VueSheetzComponent } from '../../../lib/main'
import FeaturesList from '../components/FeaturesList.vue'

export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    app.component('VueSheetzComponent', VueSheetzComponent)
    app.component('FeaturesList', FeaturesList)
  }
}
