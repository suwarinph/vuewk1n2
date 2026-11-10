<template>
  <header class="site-header" @keydown.esc="dismissMenu">
    <nav class="navbar page-shell" aria-label="Main navigation">
      <router-link class="brand" :to="{ name: 'home', hash: '#about' }" @click.native="navigateToSection('about')">
        <span class="brand-mark" aria-hidden="true">𝓶</span>
        <span>Introduce me Meg</span>
      </router-link>
      <button ref="menuButton" class="menu-toggle" type="button" :aria-expanded="menuOpen ? 'true' : 'false'" aria-controls="nav-links" @click="menuOpen = !menuOpen">
        <span class="sr-only">{{ menuOpen ? 'Close' : 'Open' }} navigation</span>
        <span></span><span></span>
      </button>
      <div id="nav-links" :class="['nav-links', { 'nav-links--open': menuOpen }]">
        <router-link
          v-for="link in links"
          :key="link.id"
          :to="link.to"
          :class="{ 'is-active': activeSection === link.id }"
          :aria-current="activeSection === link.id ? (link.id === 'grade-calculator' ? 'page' : 'location') : null"
          @click.native="navigateToSection(link.id)"
        >{{ link.label }}</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'SiteNavbar',
  data () {
    return {
      menuOpen: false,
      activeSection: 'about',
      scrollFrame: null,
      links: [
        { id: 'about', label: 'About Me', to: { name: 'home', hash: '#about' } },
        { id: 'hobbies', label: 'Hobbies', to: { name: 'home', hash: '#hobbies' } },
        { id: 'likes', label: 'Things I Like', to: { name: 'home', hash: '#likes' } },
        { id: 'dislikes', label: 'Things I Dislike', to: { name: 'home', hash: '#dislikes' } },
        { id: 'grade-calculator', label: 'Grade Calculator', to: { name: 'grade-calculator' } }
      ]
    }
  },
  watch: {
    '$route' (route) {
      this.menuOpen = false
      if (route.name === 'grade-calculator') {
        this.activeSection = 'grade-calculator'
        window.removeEventListener('scroll', this.scheduleActiveSectionUpdate)
        if (this.scrollFrame !== null) cancelAnimationFrame(this.scrollFrame)
        this.scrollFrame = null
        return
      }
      this.activeSection = route.hash ? route.hash.slice(1) : 'about'
      this.$nextTick(this.observeHomeSections)
    }
  },
  mounted () {
    this.activeSection = this.$route.name === 'grade-calculator' ? 'grade-calculator' : (this.$route.hash.slice(1) || 'about')
    this.observeHomeSections()
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scheduleActiveSectionUpdate)
    if (this.scrollFrame !== null) cancelAnimationFrame(this.scrollFrame)
  },
  methods: {
    closeMenu () { this.menuOpen = false },
    dismissMenu () {
      if (!this.menuOpen) return
      this.closeMenu()
      this.$refs.menuButton.focus()
    },
    navigateToSection (id) {
      this.closeMenu()
      if (this.$route.name !== 'home') return
      this.$nextTick(() => {
        const section = document.getElementById(id)
        const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (section) section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
      })
    },
    observeHomeSections () {
      window.removeEventListener('scroll', this.scheduleActiveSectionUpdate)
      if (this.$route.name !== 'home') return
      window.addEventListener('scroll', this.scheduleActiveSectionUpdate, { passive: true })
      this.updateActiveSection()
    },
    scheduleActiveSectionUpdate () {
      if (this.scrollFrame !== null) return
      this.scrollFrame = requestAnimationFrame(() => {
        this.scrollFrame = null
        this.updateActiveSection()
      })
    },
    updateActiveSection () {
      const marker = Math.min(180, window.innerHeight * 0.28)
      const sections = this.links
        .filter(link => link.id !== 'grade-calculator')
        .map(link => document.getElementById(link.id))
        .filter(Boolean)
      const current = sections
        .filter(section => section.getBoundingClientRect().top <= marker)
        .pop()
      if (current) this.activeSection = current.id
      else if (sections.length) this.activeSection = sections[0].id
    }
  }
}
</script>
