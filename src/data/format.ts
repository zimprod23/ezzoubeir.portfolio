const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escapes text and turns `*words*` into an accent <em>. */
export const emph = (s: string) => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>');

type Part = { text: string; accent: boolean };

/** Splits "a *b c*, d" into words, keeping punctuation glued to the word before it. */
function words(s: string): Part[][] {
  const out: Part[][] = [];
  s.split('*').forEach((chunk, k) => {
    const accent = k % 2 === 1;
    chunk.split(' ').forEach((tok, j) => {
      if (!tok) return;
      const glued = j === 0 && out.length > 0 && !chunk.startsWith(' ') && !accent;
      if (glued) out[out.length - 1].push({ text: tok, accent });
      else out.push([{ text: tok, accent }]);
    });
  });
  return out;
}

/**
 * Heading markup for the per-letter reveal. Words never break mid-word;
 * accent letters get a position (--p) so the gradient runs across the phrase.
 */
export const splitHeading = (s: string, baseDelay = 0, step = 18) => {
  const ws = words(s);
  const accentTotal = ws.flat().filter((p) => p.accent).reduce((n, p) => n + [...p.text].length, 0) || 1;
  let i = 0, a = 0;
  return ws
    .map((parts) => {
      const inner = parts
        .map((p) =>
          [...p.text]
            .map((c) => {
              const d = baseDelay + i++ * step;
              if (!p.accent) return `<span class="ch" style="--d:${d}">${esc(c)}</span>`;
              const pct = Math.round((a++ / Math.max(1, accentTotal - 1)) * 100);
              return `<span class="ch acc" style="--d:${d};--p:${pct}%">${esc(c)}</span>`;
            })
            .join(''),
        )
        .join('');
      return `<span class="w">${inner}</span>`;
    })
    .join(' ');
};

/** Word spans for the scroll-lit statement. */
export const litWords = (s: string) =>
  words(s)
    .map((parts) => {
      const accent = parts.some((p) => p.accent);
      return `<span class="lw${accent ? ' acc' : ''}">${parts.map((p) => esc(p.text)).join('')}</span>`;
    })
    .join(' ');
