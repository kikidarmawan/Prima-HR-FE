import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

export function useDarkMode() {
  const toggleDark = () => {
    isDark.value = !isDark.value
    updateDOM()
    localStorage.setItem('darkMode', isDark.value)
  }

  const updateDOM = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  onMounted(() => {
    isDark.value = localStorage.getItem('darkMode') === 'true'
    updateDOM()
  })

  watch(isDark, () => updateDOM())

  return { isDark, toggleDark }
}
