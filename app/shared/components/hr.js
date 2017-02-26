import Inferno from 'inferno';
import cxs from 'cxs';

import { colours } from '../style';

const Hr = ({ children, src, ...props }) => (
  <img
    className={cxs({
      width: props.width || Hr.default.width,
      border: `1px dashed ${colours.dark}`,
    })}
    src={src}
  />
);

Hr.default = {
  width: '100%',
};

export default Hr;
