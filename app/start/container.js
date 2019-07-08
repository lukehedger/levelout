import Inferno from 'inferno';
import Component from 'inferno-component';

import { work } from '~/shared/data';

import Anchor from '~/shared/components/anchor';
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

        <Text fontWeight="bold" marginTop={44}>Projects:</Text>

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

        <Text fontWeight="bold" marginTop={44}>Open Source:</Text>

        <div>
          <Text marginTop={16} marginBottom={4}>
            <Anchor
              href="https://github.com/lukehedger/eth-graphql/"
              borderBottom="none"
            >
              eth-graphql
            </Anchor>
          </Text>

          <Text fontSize={12} marginBottom={32}>
            The original Ethereum GraphQL API - a wrapper around Ethereum's JSON-RPC API exposing account, block and transaction data in a predictable GraphQL API.
          </Text>
        </div>

        <div>
          <Text marginTop={16} marginBottom={4}>
            <Anchor
              href="https://github.com/lukehedger/sulk/"
              borderBottom="none"
            >
              sulk
            </Anchor>
          </Text>

          <Text fontSize={12} marginBottom={32}>
            A tool to simplify the cumbersome task of compiling Solidity smart contracts using the concept of configuration-as-code.
          </Text>
        </div>

        <div>
          <Text marginTop={16} marginBottom={4}>
            <Anchor
              href="https://github.com/jaakmusic/primitives/"
              borderBottom="none"
            >
              primitives
            </Anchor>
          </Text>

          <Text fontSize={12} marginBottom={32}>
            A set of UI primitives with predictable, unopinionated defaults and HTML-inspired semantics for building scalable component-based applications.
          </Text>
        </div>

        <Text fontWeight="bold" marginTop={44}>Articles:</Text>

        <Text fontSize={12} marginBottom={32}>
          I have written articles that have been read by 1000s of people around the world about things like application architecture and getting started with Ethereum.
        </Text>

        <div>
          <Text marginTop={16} marginBottom={4}>
            <Anchor
              href="https://medium.com/@level_out/everything-is-a-component-cf9f469ad981"
              borderBottom="none"
            >
              Everything is a Component ~ 2018
            </Anchor>
          </Text>

          <Text fontSize={12} marginBottom={32}>
            Directory structure is the new semicolon. Can we solve our application architecture debates by decentralising dependencies and using a single unit of construction: the component?
            {' '}
            <Anchor
              href="https://ponyfoo.com/weekly/131/load-performance-code-splitting-hashwick-serverless-vue-components-and-integration-testing"
              borderBottom="none"
            >
              As featured in PonyFoo Weekly, issue 131
            </Anchor>.
          </Text>
        </div>

        <div>
          <Text marginTop={16} marginBottom={4}>
            <Anchor
              href="https://blog.jaak.io/crossing-over-to-web3-an-introduction-to-decentralised-development-53de470da331"
              borderBottom="none"
            >
              Crossing over to Web3 ~ 2017
            </Anchor>
          </Text>

          <Text fontSize={12} marginBottom={32}>
            Series of posts for the JAAK company blog to introduce web developers to the decentralised web and the Ethereum blockchain.
            {' '}
            <Anchor
              href="https://hackernoon.com/crossing-over-to-web3-an-introduction-to-decentralised-development-5eb09e95edb0"
              borderBottom="none"
            >
              Also featured on HackerNoon
            </Anchor>.
          </Text>
        </div>

        <Text fontWeight="bold" marginTop={44}>Talks:</Text>

        <Text fontSize={12} marginBottom={32}>
          I have delivered talks to 100s of people internationally on topics including the decentralised web and identity in an open network.
        </Text>

        <div>
          <Text marginTop={16} marginBottom={4}>
            <Anchor
              href="https://github.com/lukehedger/talks/blob/master/0518-web3-webdeldn.pdf"
              borderBottom="none"
            >
              Web3: Ethereum and the next evolution of the Web / WebdeLDN meetup, London ~ 2018
            </Anchor>
          </Text>
        </div>

        <div>
          <Text marginTop={16} marginBottom={64}>
            <Anchor
              href="https://youtu.be/-G9hLnq6ZCs?t=2670"
              borderBottom="none"
            >
              Modelling identity in the KORD Network / EthCC, Paris ~ 2018
            </Anchor>
          </Text>
        </div>

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
