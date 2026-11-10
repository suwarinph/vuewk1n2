<template>
  <div class="section-cards" aria-label="Explore the page">
    <RevealOnScroll v-for="(card, index) in cards" :key="card.id" from="up" class="section-card-reveal" :style="{ '--reveal-delay': `${index * 100}ms` }">
      <router-link :to="{ name: 'home', hash: `#${card.id}` }" class="section-card glass-panel">
        <span class="section-card-number">{{ String(index + 2).padStart(2, '0') }}</span>
        <svg class="section-card-icon" viewBox="0 0 24 24" aria-hidden="true"><path :d="card.path" /></svg>
        <span class="section-card-label">{{ card.label }}</span>
        <svg class="card-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" /></svg>
      </router-link>
    </RevealOnScroll>
  </div>
</template>

<script>
import RevealOnScroll from './RevealOnScroll.vue'

export default {
  name: 'SectionNavigation',
  components: { RevealOnScroll },
  data () {
    return { cards: [
      { id: 'hobbies', label: 'Hobbies', path: 'M9 18V5l11-2v13M9 9l11-2M9 18c0 2-2 3-4 3s-3-1-3-2 2-3 4-3 3 1 3 2ZM20 16c0 2-2 3-4 3s-3-1-3-2 2-3 4-3 3 1 3 2Z' },
      { id: 'likes', label: 'Things I Like', path: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z' },
      { id: 'dislikes', label: 'Things I Dislike', path: 'M9 15h3v5c0 1 2 1 3-1l3-6V3H6L3 12c0 2 1 3 3 3h3ZM18 3h4v10h-4' }
    ] }
  }
}
</script>
