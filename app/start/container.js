import Inferno from 'inferno';
import Component from 'inferno-component';

import Anchor from '~/shared/components/anchor';
import Hr from '~/shared/components/hr';
import Image from '~/shared/components/image';
import Section from '~/shared/components/section';
import Text from '~/shared/components/text';

class Start extends Component {
  render() {
    return (
      <Section>

        <Image src="/img/bench.svg" width={60} />

        <Text fontSize={22}>Level Out</Text>

        <Text><Anchor href="https://github.com/lukehedger">Code</Anchor></Text>

        <Text>
          <Anchor href="https://medium.com/@level_out/">Writing</Anchor>
        </Text>

        <Hr width={100} />

        <Text>Projects:</Text>

      </Section>
    );
  }
}

export default Start;
