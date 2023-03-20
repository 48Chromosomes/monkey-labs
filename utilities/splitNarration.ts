export const splitParagraph = ({ paragraph }: { paragraph: string | undefined }) => {
  if (paragraph) {
    const punctuations = /[,.!?]/;
    const quotes = /"/;
    let result = [];
    let currentString = '';

    for (let i = 0; i < paragraph.length; i++) {
      const currentChar = paragraph[i];
      currentString += currentChar;

      if (currentChar.match(punctuations)) {
        if (currentChar.match(/[?!]/)) {
          if (paragraph[i + 1] === ' ') {
            result.push(currentString.trim());
            currentString = '';
          }
        } else {
          result.push(currentString.trim());
          currentString = '';
        }
      }

      if (currentChar.match(quotes)) {
        for (let j = i + 1; j < paragraph.length; j++) {
          currentString += paragraph[j];
          if (paragraph[j].match(quotes)) {
            i = j;
            break;
          }
        }
      }
    }

    result.push(currentString.trim());

    return result;
  }
};
