<template>
  <div id="top">
    <main>
      <AboutMe :content="content.about" />
      <Hobbies :tracks="content.tracks" :food-photos="content.foodPhotos" :music-intro="content.musicIntro" />
      <ContentListSection id="likes" title="Things I Like" eyebrow="03 / THINGS I LIKE" intro="A few things that make ordinary days feel a little brighter." tone="paper" :items="content.likes" />
      <ContentListSection id="dislikes" title="Things I Dislike" eyebrow="04 / THINGS I DISLIKE" intro="Small things I can happily leave out of my day." tone="botanical" :items="content.dislikes" />
    </main>
    <FooterSection :content="content.footer" />
  </div>
</template>

<script>
import AboutMe from '../components/AboutMe.vue'
import Hobbies from '../components/Hobbies.vue'
import ContentListSection from '../components/ContentListSection.vue'
import FooterSection from '../components/FooterSection.vue'
import personalContent from '../data/personalContent'

export default {
  name: 'HomeView',
  components: { AboutMe, Hobbies, ContentListSection, FooterSection },
  data () { return { content: personalContent } }
}
</script>
