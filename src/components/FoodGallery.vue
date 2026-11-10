<template>
  <section class="food-gallery" aria-labelledby="food-gallery-title" @touchstart.passive="startSwipe" @touchend="finishSwipe">
    <div class="food-gallery-heading">
      <div>
        <p class="eyebrow">Let the camera eat first</p>
        <h3 id="food-gallery-title">A LITTLE FOOD JOURNAL</h3>
      </div>
      <div class="food-gallery-controls" aria-label="เลื่อนดูรูปอาหาร">
        <button type="button" aria-label="ดูรูปก่อนหน้า" @click="showPrevious">‹</button>
        <button type="button" aria-label="ดูรูปถัดไป" @click="showNext">›</button>
      </div>
    </div>

    <div v-if="photos.length" class="food-gallery-track" aria-live="polite">
      <figure
        v-for="slot in visiblePhotos"
        :key="slot.position"
        :class="['food-gallery-item', { 'food-gallery-item--edge': slot.position === 0 || slot.position === 3 }]"
        role="button"
        tabindex="0"
        :aria-label="`View full-size photo: ${slot.photo.imageAlt || 'food photo'}`"
        @click="openPhoto(slot.photo)"
        @keydown.enter.prevent="openPhoto(slot.photo)"
        @keydown.space.prevent="openPhoto(slot.photo)"
      >
        <img :key="slot.photo.id" :src="slot.photo.image" :alt="slot.photo.imageAlt || 'ถ่ายรูปอาหารที่กิน'" draggable="false">
      </figure>
    </div>

    <div v-if="lightboxIndex !== null" class="food-lightbox" role="dialog" aria-modal="true" :aria-label="lightboxPhoto.imageAlt || 'Full-size food photo'" @click.self="closePhoto">
      <button ref="lightboxClose" class="food-lightbox-close" type="button" aria-label="Close photo" @click="closePhoto">×</button>
      <button v-if="photos.length > 1" class="food-lightbox-arrow food-lightbox-arrow--previous" type="button" aria-label="Previous photo" @click="showLightboxPrevious">‹</button>
      <img class="food-lightbox-image" :src="lightboxPhoto.image" :alt="lightboxPhoto.imageAlt || 'Food photo'">
      <button v-if="photos.length > 1" class="food-lightbox-arrow food-lightbox-arrow--next" type="button" aria-label="Next photo" @click="showLightboxNext">›</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FoodGallery',
  props: {
    photos: { type: Array, required: true }
  },
  data () {
    return { activeIndex: 0, touchStartX: null, lightboxIndex: null, lastFocusedElement: null }
  },
  computed: {
    activeNumber () { return this.photos.length ? this.activeIndex + 1 : 0 },
    lightboxPhoto () { return this.lightboxIndex === null ? {} : this.photos[this.lightboxIndex] },
    visiblePhotos () {
      const length = this.photos.length
      if (!length) return []
      return [-1, 0, 1, 2].map((offset, position) => ({
        photo: this.photos[(this.activeIndex + offset + length) % length],
        position
      }))
    }
  },
  watch: {
    photos () {
      if (this.activeIndex >= this.photos.length) this.activeIndex = 0
      if (this.lightboxIndex !== null && this.lightboxIndex >= this.photos.length) this.closePhoto()
    }
  },
  beforeDestroy () { document.removeEventListener('keydown', this.onLightboxKeydown) },
  methods: {
    showPrevious () { this.activeIndex = (this.activeIndex - 1 + this.photos.length) % this.photos.length },
    showNext () { this.activeIndex = (this.activeIndex + 1) % this.photos.length },
    openPhoto (photo) {
      this.lastFocusedElement = document.activeElement
      this.lightboxIndex = this.photos.findIndex(item => item.id === photo.id)
      this.$emit('lightbox-change', true)
      document.addEventListener('keydown', this.onLightboxKeydown)
      this.$nextTick(() => this.$refs.lightboxClose && this.$refs.lightboxClose.focus())
    },
    closePhoto () {
      this.lightboxIndex = null
      this.$emit('lightbox-change', false)
      document.removeEventListener('keydown', this.onLightboxKeydown)
      this.$nextTick(() => this.lastFocusedElement && this.lastFocusedElement.focus())
    },
    onLightboxKeydown (event) {
      if (event.key === 'Escape') this.closePhoto()
      else if (event.key === 'ArrowLeft') this.showLightboxPrevious()
      else if (event.key === 'ArrowRight') this.showLightboxNext()
    },
    showLightboxPrevious () { this.lightboxIndex = (this.lightboxIndex - 1 + this.photos.length) % this.photos.length },
    showLightboxNext () { this.lightboxIndex = (this.lightboxIndex + 1) % this.photos.length },
    startSwipe (event) { this.touchStartX = event.changedTouches[0].clientX },
    finishSwipe (event) {
      if (this.touchStartX === null) return
      const distance = event.changedTouches[0].clientX - this.touchStartX
      if (Math.abs(distance) > 40) distance > 0 ? this.showPrevious() : this.showNext()
      this.touchStartX = null
    }
  }
}
</script>
