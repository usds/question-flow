type alphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K'
  | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
const alphaSeq: alphabet[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
  'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const makeLabelGenerator = () => {
  const used: { [key: string]: boolean } = {};
  let iteration                          = 0;
  let lastIssued                         = 0;

  function generate(idx = lastIssued): { label: string, next: number } {
    let next = idx;
    if (next >= alphaSeq.length) {
      next       = 0;
      iteration += 1;
    }
    let label = alphaSeq[next];
    if (iteration > 0) {
      label += `${iteration}`;
    }
    if (used[label] === true) {
      return generate(next + 1);
    }
    return ({
      label,
      next,
    });
  }

  return (): string => {
    const nis       = generate(lastIssued);
    used[nis.label] = true;
    lastIssued      = nis.next;
    return nis.label;
  };
};

export const getNextLabel = makeLabelGenerator();
