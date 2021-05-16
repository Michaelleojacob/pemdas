const copyThis = document.getElementById('copyemail');
copyThis.addEventListener('click', () => {
  copyThis.select();
  copyThis.setSelectionRange(0, 99999);
  document.execCommand('copy');
})