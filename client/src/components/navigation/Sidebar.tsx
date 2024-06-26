import { t, Trans } from '@lingui/macro';
import { UnstyledLink } from './Link';
import { Text, OutlineButton } from '~uikit';
import { styled } from '~styled-system/jsx';
import { useAuth } from '~services/auth';
import { stack } from '~styled-system/patterns';
import { useLingui } from '@lingui/react'

export default function Sidebar() {
  const { i18n } = useLingui();
  const auth = useAuth();

  const items: Array<{
    label: string;
    to: string;
    testId: string;
  }> = [
    {
      label: t`Home`,
      to: '/',
      testId: 'navigate-to-home',
    },
    {
      label: t`Rivalries`,
      to: '/rivalries',
      testId: 'navigate-to-rivalries',
    },
    {
      label: t`Rounds`,
      to: '/rounds',
      testId: 'navigate-to-rounds',
    },
  ];

  return (
    <Wrapper>
      <Nav>
        <NavList>
          {items.map(({ label, to, testId }) => (
            <li key={label}>
              <NavItemLink
                to={to}
                data-test-id={testId}
                preloadOn="hover"
                className={stack({ direction: 'row', gap: '$small' })}
              >
                <Text variant="body">{label}</Text>
              </NavItemLink>
            </li>
          ))}

          <div style={{ flex: 1 }} />

          <Logout>
            <OutlineButton
              variant="primary"
              icon="logout"
              loading={auth.status === 'logging-out'}
              onClick={auth.logout}
            >
              {auth.status === 'logging-out' ? (
                <Trans>Logging out</Trans>
              ) : (
                <Trans>Logout</Trans>
              )}
            </OutlineButton>
          </Logout>
        </NavList>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled('aside', {
  base: {
    minWidth: '300px',
    backgroundColor: '$surface',
    borderRight: '1px solid $border',
  },
});

const Nav = styled('nav', {
  base: {
    height: '100%',
  },
});

const NavList = styled('ul', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
});

const NavItemLink = styled(UnstyledLink, {
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    color: '$text',
    padding: '$normal',
    $hoverHighlight: '',
    $pressOpacity: '',
  },
});

const Logout = styled('li', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    padding: '$normal',
  },
});
