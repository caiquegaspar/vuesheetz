<script setup lang="ts">
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://github.com/caiquegaspar.png',
    name: 'Caíque Gaspar',
    title: 'A passionate self-taught software developer',
    desc: 'Creator and mantainer of VueSheetz',
    links: [
      { icon: 'github', link: 'https://github.com/caiquegaspar' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/caiquegaspar/' }
    ]
  }
]
</script>

<template>
  <div class="creator_section">
    <h2 class="section_title">Meet The Creator</h2>

    <div class="section_members">
      <VPTeamMembers size="medium" :members="members" />
    </div>
  </div>
</template>

<style scoped>
.creator_section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.section_title {
  margin: 48px 0 16px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  letter-spacing: -0.02em;
  line-height: 32px;
  font-size: 24px;
}

.section_members {
  width: 100%;
  padding: 2.5rem;
}
</style>
