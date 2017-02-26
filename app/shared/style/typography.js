/**
  * @desc Typographic utilities
*/

const stacks = {
  primary: "'Space Mono', helvetica, sans-serif",
};

const getFontFamily = (stack = 'primary') => ({ 'font-family': stacks[stack] });

export default {
  ff: getFontFamily,
};
