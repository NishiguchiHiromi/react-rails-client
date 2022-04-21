export const jsonDeepCopy = (obj) => JSON.parse(JSON.stringify(obj));

export const getBase64 = (file) => new Promise((resolve, reject) => {
  const fr = new FileReader();
  fr.onload = (e) => resolve(e.target.result);
  fr.onerror = reject;
  fr.readAsDataURL(file);
});
