// Min-max normalize an array of numbers to 0..1
export function normalize(arr) {
  const min = Math.min(...arr), max = Math.max(...arr);
  if (max === min) return arr.map(() => 0.5);
  return arr.map(v => (v - min) / (max - min));
}

// Compute a composite score with weights
export function scoreItems(items) {
  const reads7 = normalize(items.map(i => i.reads_7d));
  const reads30 = normalize(items.map(i => i.reads_30d));
  const rating = normalize(items.map(i => i.rating));       // already ~1..5 but normalized
  const completion = normalize(items.map(i => i.completion)); // 0..1

  // weights: 7d 0.45 / 30d 0.25 / rating 0.2 / completion 0.1
  return items.map((i, idx) => ({
    ...i,
    score: +(reads7[idx]*0.45 + reads30[idx]*0.25 + rating[idx]*0.20 + completion[idx]*0.10).toFixed(4)
  }))
  .sort((a,b) => b.score - a.score)
  .slice(0, 10);
}
