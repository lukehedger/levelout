import Inferno from 'inferno';
import cxs from 'cxs';

import { colours } from '../style';

const Anchor = ({ children, href, ...props }) => (
  <a
    className={cxs({
      borderBottom: `2px solid ${colours.dark}`,
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

Anchor.default = {};

export default Anchor;
