import { useState } from 'react';
import { orderBy, random, range } from 'lodash';
import { t, Trans } from '@lingui/macro';

import { Text, Stack, Icon, SortDescriptor, Table, IconName } from '~uikit';
import { useDocumentTitle } from '~utils/routing';
import { styled } from '~styled-system/jsx';
import FeatureGate from '~components/feature-flags/FeatureGate';

export default function Home() {
  useDocumentTitle(t`Home`);


  return (
    <Stack direction="column" gap="$xlarge">
      <Stack direction="column" gap="$normal">
        <Text variant="title1">
          <Trans>Home</Trans>
        </Text>
	  </Stack>
    </Stack>
  );
}

