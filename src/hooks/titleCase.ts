export default function useTitleCase() {
  const titleCase = (str: string) => {
    return str.replace(/\w*/g, (txt: string) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }
  return {
    titleCase,
  }
}
