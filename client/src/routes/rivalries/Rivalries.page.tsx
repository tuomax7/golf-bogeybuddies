import { t, Trans } from '@lingui/macro';

import { styled } from '~styled-system/jsx';
import { Stack, Text } from '~uikit';
import { useDocumentTitle } from '~utils/routing';

export default function RivalriesPage() {
  useDocumentTitle(t`Rivalries`);

  return (
    <Wrapper>
      <Stack direction="column" gap="$large">
        <Text variant="title1">
          <Trans>Rivalries page</Trans>
        </Text>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('div', {
  base: {
    flex: 1,
  },
});
