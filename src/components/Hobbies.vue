<template>
  <section id="hobbies" :class="['hobbies-section', 'anchor-section', 'section-band', { 'hobbies-section--lightbox-open': lightboxOpen }]" aria-labelledby="hobbies-title">
    <div class="page-shell">
      <RevealOnScroll from="up">
        <div class="section-heading">
          <p class="eyebrow">02 / HOBBIES</p>
          <h2 id="hobbies-title">Hobbies</h2>
        </div>
      </RevealOnScroll>

      <div class="hobby-layout">
        <section class="hobby-topic listening-block" aria-labelledby="listening-title">
          <div class="listening-intro">
            <RevealOnScroll from="up">
              <div class="subsection-heading listening-heading">
                <span class="subsection-icon" aria-hidden="true">&#9835;</span>
                <h3 id="listening-title">Listening to Music</h3>
              </div>
            </RevealOnScroll>
            <RevealOnScroll v-if="musicIntro" from="up">
              <p class="listening-description">{{ musicIntro }}</p>
            </RevealOnScroll>
            <div class="listening-art" aria-hidden="true"><span>♫</span><i>♪</i></div>
          </div>
          <MusicCorner :tracks="tracks" />
        </section>
        <FoodGallery :photos="foodPhotos" @lightbox-change="lightboxOpen = $event" />
      </div>
    </div>
  </section>
</template>

<script>
import RevealOnScroll from './RevealOnScroll.vue'
import MusicCorner from './MusicCorner.vue'
import FoodGallery from './FoodGallery.vue'

export default {
  name: 'HobbySection',
  components: { RevealOnScroll, MusicCorner, FoodGallery },
  props: {
    tracks: { type: Array, required: true },
    foodPhotos: { type: Array, required: true },
    musicIntro: { type: String, required: true }
  },
  data () { return { lightboxOpen: false } }
}
</script>
