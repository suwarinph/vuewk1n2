<template>
  <section :id="id" :class="['content-section', 'anchor-section', `content-section--${tone}`]" :aria-labelledby="`${id}-title`">
    <div class="page-shell">
      <RevealOnScroll v-if="isLikes" from="up"><div class="section-heading"><p class="eyebrow">{{ eyebrow }}</p><h2 :id="`${id}-title`">{{ title }}</h2><p class="section-intro">{{ intro }}</p></div></RevealOnScroll>
      <div v-else class="section-heading"><p class="eyebrow">{{ eyebrow }}</p><h2 :id="`${id}-title`">{{ title }}</h2><p class="section-intro">{{ intro }}</p></div>
      <template v-if="isDislikes">
        <div v-if="showDislikeControls" class="dislike-controls">
          <span class="sr-only" aria-live="polite">Showing items {{ visibleRange }}</span>
          <button type="button" class="dislike-arrow" :aria-label="`Show previous ${title.toLowerCase()} cards`" :aria-controls="`${id}-cards`" @click="showPreviousPage">‹</button>
          <button type="button" class="dislike-arrow" :aria-label="`Show next ${title.toLowerCase()} cards`" :aria-controls="`${id}-cards`" @click="showNextPage">›</button>
        </div>
        <div :id="`${id}-cards`" class="dislike-card-grid">
          <div v-for="(item, index) in visibleItems" :key="item.id" :class="['dislike-card-reveal', { 'dislike-card-reveal--selected': selectedItemId === item.id }]">
            <article
              :class="['dislike-card', 'glass-panel', { 'dislike-card--selected': selectedItemId === item.id }]"
              role="button"
              tabindex="0"
              :aria-label="`${item.title}: ${selectedItemId === item.id ? 'Restore' : 'Enlarge'} image`"
              :aria-pressed="selectedItemId === item.id ? 'true' : 'false'"
              @click="selectCard(item.id)"
              @keydown.enter.prevent="selectCard(item.id)"
              @keydown.space.prevent="selectCard(item.id)"
            >
              <div class="dislike-card-media">
                <img v-if="item.image && !imageErrors[item.id]" :src="item.image" :alt="item.imageAlt || item.title" class="dislike-card-image" @error="markImageUnavailable(item.id)" @load="clearImageError(item.id)">
                <div v-else class="image-placeholder dislike-card-placeholder" role="img" :aria-label="`${item.title} image placeholder`"><span aria-hidden="true">✿</span></div>
              </div>
              <div class="dislike-card-copy">
                <span class="content-index">{{ formatIndex(pageStart + index + 1) }}</span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </article>
          </div>
        </div>
      </template>
      <div v-else class="content-list">
        <RevealOnScroll v-for="(item, index) in items" :key="item.id" :class="['content-row', { 'content-row--reverse': index % 2 === 1 }]" :style="isLikes ? { '--reveal-delay': '0ms' } : null">
            <div class="content-media">
              <img v-if="item.image && !imageErrors[item.id]" :src="item.image" :alt="item.imageAlt || item.title" class="content-image" @error="markImageUnavailable(item.id)" @load="clearImageError(item.id)">
              <div v-else class="image-placeholder content-placeholder" role="img" :aria-label="`${item.title} image placeholder`"><span aria-hidden="true">✿</span><small>Add an image when ready</small></div>
            </div>
          <div class="content-copy"><span class="content-index">{{ formatIndex(index + 1) }}</span><h3>{{ item.title }}</h3><p>{{ item.description }}</p></div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>

<script>
import RevealOnScroll from './RevealOnScroll.vue'

export default {
  name: 'ContentListSection',
  components: { RevealOnScroll },
  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    eyebrow: { type: String, required: true },
    intro: { type: String, required: true },
    tone: { type: String, required: true },
    items: { type: Array, required: true }
  },
  data () { return { imageErrors: {}, selectedItemId: null, currentPage: 0, cardsPerPage: 2 } },
  computed: {
    isDislikes () { return this.id === 'dislikes' },
    isLikes () { return this.id === 'likes' },
    showDislikeControls () { return this.isDislikes && this.items.length > 3 },
    pageStart () { return this.currentPage * this.cardsPerPage },
    visibleItems () {
      return this.showDislikeControls
        ? this.items.slice(this.pageStart, this.pageStart + this.cardsPerPage)
        : this.items
    },
    visibleRange () {
      if (!this.items.length) return '0 of 0'
      return `${this.pageStart + 1}–${Math.min(this.pageStart + this.visibleItems.length, this.items.length)} of ${this.items.length}`
    }
  },
  mounted () {
    this.updateCardsPerPage()
    window.addEventListener('resize', this.updateCardsPerPage)
  },
  beforeDestroy () { window.removeEventListener('resize', this.updateCardsPerPage) },
  watch: {
    items: {
      deep: true,
      handler (items) {
        if (!items.some(item => item.id === this.selectedItemId)) this.selectedItemId = null
        const pageCount = Math.max(1, Math.ceil(items.length / this.cardsPerPage))
        if (this.currentPage >= pageCount) this.currentPage = pageCount - 1
      }
    }
  },
  methods: {
    formatIndex (index) { return String(index).padStart(2, '0') },
    updateCardsPerPage () {
      const nextCount = window.innerWidth <= 640 ? 1 : 2
      if (this.cardsPerPage !== nextCount) {
        this.cardsPerPage = nextCount
        this.currentPage = 0
      }
    },
    selectCard (id) { this.selectedItemId = this.selectedItemId === id ? null : id },
    showPreviousPage () {
      const pageCount = Math.ceil(this.items.length / this.cardsPerPage)
      this.currentPage = (this.currentPage - 1 + pageCount) % pageCount
    },
    showNextPage () {
      const pageCount = Math.ceil(this.items.length / this.cardsPerPage)
      this.currentPage = (this.currentPage + 1) % pageCount
    },
    markImageUnavailable (id) { this.$set(this.imageErrors, id, true) },
    clearImageError (id) { this.$delete(this.imageErrors, id) }
  }
}
</script>
