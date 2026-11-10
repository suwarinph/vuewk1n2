<template>
  <div class="music-corner glass-panel">
    <RevealOnScroll from="up"><div class="music-corner-heading"><span class="music-note" aria-hidden="true">♫</span><div><h3>Music Corner</h3><p>A few songs for the moment.</p></div></div></RevealOnScroll>
    <div class="music-grid">
      <RevealOnScroll v-for="(track, index) in tracks" :key="track.id" from="up" class="music-reveal" :style="{ '--reveal-delay': `${index * 110}ms` }">
        <MusicCard :track="track" :active-track-id="activeTrackId" @play-request="playTrack" />
      </RevealOnScroll>
    </div>
  </div>
</template>

<script>
import RevealOnScroll from './RevealOnScroll.vue'
import MusicCard from './MusicCard.vue'

export default {
  name: 'MusicCorner',
  components: { RevealOnScroll, MusicCard },
  props: { tracks: { type: Array, required: true } },
  data () { return { activeTrackId: '' } },
  methods: { playTrack (id) { this.activeTrackId = id } }
}
</script>
