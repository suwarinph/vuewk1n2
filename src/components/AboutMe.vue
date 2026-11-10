<template>
  <section id="about" class="about-section anchor-section" aria-labelledby="about-title">
    <div class="page-shell about-layout">
      <div class="about-row about-row--profile">
        <RevealOnScroll>
          <div class="portrait-media">
            <img v-if="content.image && !imageUnavailable" :src="content.image" :alt="content.imageAlt" class="portrait-image" @error="imageUnavailable = true">
          </div>
        </RevealOnScroll>
        <div class="about-copy">
          <p class="eyebrow">01 / ABOUT ME</p>
          <RevealOnScroll :style="{ '--reveal-delay': '100ms' }"><h1 id="about-title">About Me</h1></RevealOnScroll>
          <RevealOnScroll :style="{ '--reveal-delay': '150ms' }"><p class="name-pill">{{ content.name }}</p></RevealOnScroll>
          <RevealOnScroll :style="{ '--reveal-delay': '200ms' }"><p class="about-intro">{{ content.intro }}</p></RevealOnScroll>
          <RevealOnScroll :style="{ '--reveal-delay': '250ms' }">
            <div class="education-copy glass-panel">
              <span class="education-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v6c4 3 8 3 12 0v-6M22 9v7" /></svg></span>
              <div><h2>Education</h2><p>{{ content.education }}</p></div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <SectionNavigation />
    </div>
  </section>
</template>

<script>
import RevealOnScroll from './RevealOnScroll.vue'
import SectionNavigation from './SectionNavigation.vue'

export default {
  name: 'AboutMe',
  components: { RevealOnScroll, SectionNavigation },
  props: { content: { type: Object, required: true } },
  data () { return { imageUnavailable: false, educationImageUnavailable: false } },
  watch: {
    'content.image' () { this.imageUnavailable = false },
    'content.educationImage' () { this.educationImageUnavailable = false }
  }
}
</script>
