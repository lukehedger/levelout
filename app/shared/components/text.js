import Inferno from 'inferno';
import cxs from 'cxs';

import { colours, typography } from '../style';

const Text = ({ children, ...props }) => (
  <p
    className={cxs({
      ...typography.ff(),
      marginTop: props.marginTop || Text.default.marginTop,
      marginBottom: props.marginBottom || Text.default.marginBottom,
      color: (props.color && colours[props.color]) || Text.default.color,
      fontSize: props.fontSize || Text.default.fontSize,
      fontStyle: props.fontStyle || Text.default.fontStyle,
      fontWeight: props.fontWeight || Text.default.fontWeight,
      letterSpacing: props.letterSpacing || Text.default.letterSpacing,
    })}
  >
    {children}
  </p>
);

Text.default = {
  marginTop: 0,
  marginBottom: 16,
  color: colours.dark,
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 'normal',
  letterSpacing: 'normal',
};

export default Text;
