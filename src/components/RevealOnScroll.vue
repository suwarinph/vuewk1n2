<template>
  <div :class="['reveal', { 'has-entered': hasEntered }]">
    <div class="reveal-content"><slot /></div>
  </div>
</template>

<script>
export default {
  name: 'RevealOnScroll',
  props: {
    from: { type: String, default: 'up' }
  },
  data () {
    return { hasEntered: false, observer: null }
  },
  mounted () {
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!('IntersectionObserver' in window) || reducedMotion) return

    // Visibility never depends on the observer. Only add a one-time animation
    // when entering; offscreen content also stays readable in full-page captures.
    try {
      this.observer = new IntersectionObserver((entries) => {
        if (!entries.some(entry => entry.isIntersecting)) return
        this.hasEntered = true
        this.observer.disconnect()
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })
      this.observer.observe(this.$el)
    } catch (error) {
      if (this.observer) this.observer.disconnect()
    }
  },
  beforeDestroy () {
    if (this.observer) this.observer.disconnect()
  }
}
</script>
