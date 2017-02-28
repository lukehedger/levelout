import Inferno from 'inferno';
import Component from 'inferno-component';

import { work } from '~/shared/data';

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

        <Text fontWeight="bold" fontStyle="italic">Projects:</Text>

        {work.map(w => (
          <div>
            <Text marginTop={16} marginBottom={4}>
              <Anchor href={w.link} borderBottom="none">
                {w.title} / {w.co} ~ {w.year}
              </Anchor>
            </Text>
            <Text fontSize={12} marginBottom={32}>{w.detail}</Text>
          </div>
        ))}

        <Image src="/img/lo.svg" width={32} />

        <Text fontSize={12} marginBottom={4} color="grey">
          Level Out is the guise of Luke Hedger.
        </Text>

        <Text fontSize={12} color="grey">It's his equivalent of a cape.</Text>

      </Section>
    );
  }
}

export default Start;
