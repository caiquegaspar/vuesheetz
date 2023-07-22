import { h } from 'vue'
import Theme from 'vitepress/theme'

import '../style/vars.css'

import { VueSheetzComponent } from '../../../lib/main'
import FeaturesList from '../components/FeaturesList.vue'
import DemoPlayground from '../components/DemoPlayground.vue'
import CreatorSection from '../components/CreatorSection.vue'

export default {
  ...Theme,

  Layout() {
    return h(Theme.Layout, null, {
      'home-features-after': () => h(CreatorSection)
    })
  },

  enhanceApp({ app }) {
    app.component('VueSheetzComponent', VueSheetzComponent)
    app.component('FeaturesList', FeaturesList)
    app.component('DemoPlayground', DemoPlayground)
  }
}
