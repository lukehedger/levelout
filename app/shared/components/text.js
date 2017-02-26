import Inferno from 'inferno';
import cxs from 'cxs';

import { colours, typography } from '../style';

const Text = ({ children, ...props }) => (
  <p
    className={cxs({
      ...typography.ff(),
      margin: '0 0 16px 0',
      color: (props.color && colours[props.color]) || Text.default.color,
      fontSize: props.fontSize || Text.default.fontSize,
      letterSpacing: props.letterSpacing || Text.default.letterSpacing,
    })}
  >
    {children}
  </p>
);

Text.default = {
  color: colours.dark,
  fontSize: '16px',
  letterSpacing: 'normal',
};

export default Text;
