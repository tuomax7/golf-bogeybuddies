import { t, Trans } from '@lingui/macro';
import { useParams } from 'react-router';
import { styled } from '~styled-system/jsx';
import { Stack, Text } from '~uikit';
import { useDocumentTitle } from '~utils/routing';

export default function RoundPage() {
  useDocumentTitle(t`Round`);


  const { roundId } = useParams();

  return (
    <Wrapper>
      <Stack direction="column" gap="$large">
        <Text variant="title1">
          <Trans>Round: {roundId}</Trans>
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
