<template>
  <footer class="site-footer">
    <div class="page-shell footer-inner">
      <RevealOnScroll from="left"><router-link class="brand footer-brand" :to="{ name: 'home', hash: '#about' }"><span class="brand-mark" aria-hidden="true">𝓶</span><span>Introduce me Meg</span></router-link></RevealOnScroll>
      <RevealOnScroll v-if="content.message || content.contact" from="up" class="footer-copy-reveal"><div class="footer-copy"><p>{{ content.message }}</p><a v-if="content.contact" :href="content.contact" class="footer-contact">Say hello ↗</a></div></RevealOnScroll>
      <RevealOnScroll from="right"><router-link :to="{ name: 'home', hash: '#about' }" class="back-to-top"><span aria-hidden="true">↑</span> Back to top</router-link></RevealOnScroll>
    </div>
  </footer>
</template>

<script>
import RevealOnScroll from './RevealOnScroll.vue'

export default { name: 'FooterSection', components: { RevealOnScroll }, props: { content: { type: Object, required: true } } }
</script>
