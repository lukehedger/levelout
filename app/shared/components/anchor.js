import Inferno from 'inferno';
import cxs from 'cxs';

import { colours } from '../style';

const Anchor = ({ children, href, ...props }) => (
  <a
    className={cxs({
      borderBottom: props.borderBottom || Anchor.default.borderBottom,
      paddingBottom: 4,
      display: 'inline-block',
      textDecoration: 'none',
      color: 'currentColor',
    })}
    href={href}
  >
    {children}
  </a>
);

Anchor.default = {
  borderBottom: `2px solid ${colours.dark}`,
};

export default Anchor;
