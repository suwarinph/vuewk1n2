<template>
  <article class="music-card">
    <div class="album-cover">
      <img v-if="track.cover" :src="track.cover" :alt="`${track.title} album cover`" @error="coverUnavailable = true">
      <div v-if="!track.cover || coverUnavailable" class="cover-placeholder" aria-hidden="true"><span>♫</span></div>
    </div>
    <div class="music-card-body">
      <span class="genre-tag">{{ track.genre }}</span>
      <h3>{{ track.title }}</h3>
      <p class="music-artist">{{ track.artist }}</p>
      <p v-if="unavailable" class="audio-status" role="status">Audio not available</p>
      <div class="audio-progress-row">
        <span class="time-label">{{ formatTime(currentTime) }}</span>
        <input class="progress-input" type="range" min="0" :max="duration || 0" step="0.1" :value="currentTime" :disabled="!canSeek" :aria-label="`Seek ${track.title}`" @input="seek">
        <span class="time-label">{{ formatTime(duration) }}</span>
      </div>
      <audio ref="audio" :src="sourceReady ? track.audio : null" preload="none" @loadedmetadata="onMetadata" @timeupdate="onTimeUpdate" @ended="onEnded" @error="onError"></audio>
    </div>
    <button class="play-button" type="button" :disabled="unavailable" :aria-label="buttonLabel" @click="togglePlayback">
      <svg v-if="isPlaying" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3v14H8zM15 5h3v14h-3z" /></svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z" /></svg>
    </button>
  </article>
</template>

<script>
export default {
  name: 'MusicCard',
  props: { track: { type: Object, required: true }, activeTrackId: { type: String, default: '' } },
  data () {
    return { isPlaying: false, currentTime: 0, duration: 0, unavailable: false, coverUnavailable: false, sourceReady: false }
  },
  computed: {
    canSeek () { return !this.unavailable && this.sourceReady && Number.isFinite(this.duration) && this.duration > 0 },
    buttonLabel () { return this.unavailable ? `Audio unavailable for ${this.track.title}` : `${this.isPlaying ? 'Pause' : 'Play'} ${this.track.title}` }
  },
  watch: {
    'track.volume' () { this.applyVolume() },
    activeTrackId (newId) {
      if (newId !== this.track.id && this.$refs.audio && !this.$refs.audio.paused) {
        this.$refs.audio.pause()
        this.isPlaying = false
      }
    }
  },
  mounted () {
    this.applyVolume()
    if (!this.track.audio) this.unavailable = true
  },
  beforeDestroy () {
    const audio = this.$refs.audio
    if (!audio) return
    audio.pause()
    audio.removeAttribute('src')
    audio.load()
  },
  methods: {
    applyVolume () {
      const audio = this.$refs.audio
      if (!audio) return
      const configuredVolume = Number(this.track.volume)
      audio.volume = Number.isFinite(configuredVolume)
        ? Math.min(1, Math.max(0, configuredVolume))
        : 1
    },
    async togglePlayback () {
      const audio = this.$refs.audio
      if (!audio || this.unavailable) return
      if (this.isPlaying) { audio.pause(); this.isPlaying = false; return }
      if (!this.track.audio) { this.unavailable = true; return }
      this.applyVolume()
      this.$emit('play-request', this.track.id)
      try {
        if (!this.sourceReady) {
          const response = await window.fetch(this.track.audio, { method: 'HEAD' })
          if (!response.ok) throw new Error('Audio file is unavailable')
          this.sourceReady = true
          await this.$nextTick()
        }
        await audio.play()
        this.isPlaying = true
      } catch (error) {
        this.unavailable = true
        this.isPlaying = false
      }
    },
    onMetadata () {
      const audio = this.$refs.audio
      if (audio && Number.isFinite(audio.duration)) { this.duration = audio.duration; this.unavailable = false }
    },
    onTimeUpdate () { if (this.$refs.audio) this.currentTime = this.$refs.audio.currentTime || 0 },
    onEnded () { this.isPlaying = false; this.currentTime = 0 },
    onError () { this.unavailable = true; this.isPlaying = false; this.currentTime = 0; this.duration = 0 },
    seek (event) { if (this.canSeek && this.$refs.audio) { this.$refs.audio.currentTime = Number(event.target.value) } },
    formatTime (seconds) {
      if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'
      const minutes = Math.floor(seconds / 60)
      const remainder = Math.floor(seconds % 60).toString().padStart(2, '0')
      return `${minutes}:${remainder}`
    }
  }
}
</script>
