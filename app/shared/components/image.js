import Inferno from 'inferno';
import cxs from 'cxs';

const Image = ({ children, src, ...props }) => (
  <img
    className={cxs({
      width: props.width || Image.default.width,
      height: props.height || Image.default.height,
    })}
    src={src}
  />
);

Image.default = {
  width: 'auto',
  height: 'auto',
};

export default Image;
