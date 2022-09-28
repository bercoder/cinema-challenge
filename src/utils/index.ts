export function scroll() {
  setTimeout(() => {
    const el: HTMLElement | null = document.querySelector("#discover");

    if (el) {
      window.scroll({
        top: el.offsetTop,
        behavior: 'smooth'
      });
    }
  },1000)
}