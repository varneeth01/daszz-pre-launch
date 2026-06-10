export function scrollToEarlyAccess() {
  const section = document.getElementById("early-access");
  if (!section) return;

  section.scrollIntoView({ behavior: "smooth", block: "center" });

  section.classList.remove("early-access-highlight");
  void section.offsetWidth;
  section.classList.add("early-access-highlight");

  setTimeout(() => {
    const emailInput = section.querySelector<HTMLInputElement>("input[type='email']");
    if (emailInput) emailInput.focus({ preventScroll: true });
    section.classList.remove("early-access-highlight");
  }, 700);
}
