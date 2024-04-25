import { Stack, Text } from '~uikit';
import { styled } from '~styled-system/jsx';
import ColorModeButton from '~components/common/ColorModeButton';
import LangMenuButton from '~components/common/LangMenuButton';
import { UnstyledLink } from './Link';

export default function Toolbar() {
  return (
    <Wrapper>
      <Stack direction="row" gap="$normal" align="center">
		<UnstyledLink
                to='/'
                data-test-id="navigate-to-home"
                preloadOn="hover"
              >
                <Text variant="title2" color='primary'>BogeyBuddies</Text>
        </UnstyledLink>
      </Stack>

      <Stack direction="row" gap="$normal" align="center">
        <ColorModeButton />
        <LangMenuButton />
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('header', {
  base: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '$normal',
    backgroundColor: '$surface',
    borderBottom: '1px solid',
    borderColor: '$border',
  },
});

const NavItemLink = styled(UnstyledLink, {
	base: {
	  position: 'relative',
	  display: 'flex',
	  alignItems: 'center',
	  color: 'green',
	  padding: '$normal',
	  $hoverHighlight: '',
	  $pressOpacity: '',
	},
  });