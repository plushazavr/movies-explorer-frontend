export function durationConverter(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return (hours === 0 ? '' : `${hours}ч `) + `${minutes}м`;
}