<template>
  <main class="grade-page page-shell" aria-labelledby="grade-title">
    <RevealOnScroll from="up">
      <header class="grade-heading">
        <p class="eyebrow">LITTLE THINGS / GRADE CALCULATOR</p>
        <h1 id="grade-title">Grade Calculator</h1>
      </header>
    </RevealOnScroll>

    <section class="grade-panel glass-panel" aria-label="Grade calculator form">
      <form class="grade-form" novalidate @submit.prevent="calculateGrade">
        <label for="score-input">คะแนนที่ได้รับ</label>
        <input
          id="score-input"
          v-model="scoreInput"
          :aria-invalid="Boolean(errorMessage)"
          :aria-describedby="errorMessage ? 'score-error' : 'score-hint'"
          type="text"
          inputmode="decimal"
          autocomplete="off"
          placeholder="เช่น 85.5"
        >
        <p v-if="errorMessage" id="score-error" class="field-error" role="alert">{{ errorMessage }}</p>
        <p v-else id="score-hint" class="field-hint">กรอกคะแนนตั้งแต่ 0 ถึง 100</p>

        <div class="grade-actions">
          <button class="calculate-button" type="submit">Calculate Grade</button>
          <button class="reset-button" type="button" @click="resetForm">Reset</button>
        </div>
      </form>

      <div class="grade-result" :class="{ 'grade-result--ready': grade }" role="status" aria-live="polite" aria-atomic="true">
        <span class="result-label">เกรดที่ได้</span>
        <strong>{{ grade || '—' }}</strong>
        <span v-if="grade" class="result-score">คะแนน {{ formattedScore }}</span>
      </div>
    </section>

    <RevealOnScroll from="up">
      <section class="criteria-section" aria-labelledby="criteria-title">
        <div class="criteria-heading">

          <div>
            <h2 id="criteria-title" class="text-center">เกณฑ์การตัดเกรด</h2>
          </div>
        </div>
        <table class="criteria-table">
          <thead><tr><th scope="col">เกรด</th><th scope="col">คะแนน</th></tr></thead>
          <tbody>
            <tr v-for="criterion in criteria" :key="criterion.grade">
              <th scope="row"><span class="grade-label">{{ criterion.grade }}</span></th>
              <td>{{ criterion.range }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </RevealOnScroll>
  </main>
</template>

<script>
import RevealOnScroll from '../components/RevealOnScroll.vue'

export default {
  name: 'GradeCalculator',
  components: { RevealOnScroll },
  data () {
    return {
      scoreInput: '',
      grade: '',
      errorMessage: '',
      calculatedScore: null,
      criteria: [
        { grade: 'A', range: '80 – 100' },
        { grade: 'B', range: '70 –< 80' },
        { grade: 'C', range: '60 –< 70' },
        { grade: 'D', range: '50 –< 60' },
        { grade: 'F', range: '0 –< 50' }
      ]
    }
  },
  computed: {
    formattedScore () { return this.calculatedScore === null ? '' : String(this.calculatedScore) }
  },
  watch: {
    scoreInput () {
      this.grade = ''
      this.calculatedScore = null
      this.errorMessage = ''
    }
  },
  methods: {
    calculateGrade () {
      this.grade = ''
      this.calculatedScore = null
      this.errorMessage = ''

      const trimmedScore = this.scoreInput.trim()
      if (!trimmedScore) {
        this.errorMessage = 'กรุณากรอกคะแนนก่อนคำนวณ'
        return
      }

      if (!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(trimmedScore)) {
        this.errorMessage = 'กรุณากรอกตัวเลขที่ถูกต้อง'
        return
      }

      const score = Number(trimmedScore)
      if (!Number.isFinite(score)) {
        this.errorMessage = 'กรุณากรอกตัวเลขที่ถูกต้อง'
        return
      }
      if (score < 0 || score > 100) {
        this.errorMessage = 'คะแนนต้องอยู่ระหว่าง 0–100'
        return
      }

      this.calculatedScore = score
      if (score >= 80) this.grade = 'A'
      else if (score >= 70) this.grade = 'B'
      else if (score >= 60) this.grade = 'C'
      else if (score >= 50) this.grade = 'D'
      else this.grade = 'F'
    },
    resetForm () {
      this.scoreInput = ''
      this.grade = ''
      this.errorMessage = ''
      this.calculatedScore = null
    }
  }
}
</script>
