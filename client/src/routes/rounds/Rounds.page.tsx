import { t, Trans } from '@lingui/macro';

import { styled } from '~styled-system/jsx';
import { Stack, Text } from '~uikit';
import { useDocumentTitle } from '~utils/routing';

export default function RoundsPage() {
  useDocumentTitle(t`Rounds`);

  return (
    <Wrapper>
        <Text variant="title1">
          <Trans>Rounds page</Trans>
        </Text>
    </Wrapper>
  );
}

const Wrapper = styled('div', {
  base: {
    flex: 1,
  },
});
