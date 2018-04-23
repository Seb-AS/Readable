export function randomID() {
  function random() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return random();
}

export function formatTime(timestamp) {
  const d = new Date(timestamp);
  return d.toLocaleString();
}
