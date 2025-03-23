if (document.querySelector(".form-redirect")) {
  // Telephone Regex
  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, ""); // Remove all non-digits
  });

  // Textarea max character count (feel free to drop the .form-redirect class if there's only one form/textarea)
  const textarea = document.querySelector(".form-redirect .input--textarea");
  const nestedLabel = document.querySelector(".form-redirect .nested-label");
  const checkbox = document.querySelector(".form-redirect .checkbox");
  const captchaContainer = document.querySelector(".recaptcha");
  const maxLength = textarea?.maxLength;

  const updateCharCount = () => {
    const remaining = maxLength - textarea.value.length;

    if (nestedLabel) {
      nestedLabel.textContent =
        remaining === maxLength
          ? `Max — ${maxLength} characters`
          : `${remaining} character${remaining === 1 ? "" : "s"} remaining`;

      // nestedLabel.classList.toggle("text-error", remaining === 0);
    }
  };

  if (maxLength) {
    updateCharCount();
    textarea.addEventListener("input", updateCharCount);
  }

  if (checkbox && captchaContainer) {
    let captchaShown = false;
    captchaContainer.style.display = "none";

    checkbox.addEventListener("change", () => {
      if (!captchaShown && checkbox.checked) {
        captchaContainer.style.display = "block";
        captchaShown = true;
      }
    });
  }

  // // reCAPTCHA theme
  // const recaptcha = document.querySelector(".g-recaptcha");
  // recaptcha?.setAttribute("data-theme", "dark");
}
