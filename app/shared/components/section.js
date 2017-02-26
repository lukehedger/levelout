import Inferno from 'inferno';
import cxs from 'cxs';

const Section = ({ children, ...props }) => (
  <section
    className={cxs({
      padding: 32,
    })}
  >
    {children}
  </section>
);

export default Section;
