import React from 'react'
import { Text } from 'grommet'
import { Button } from 'src/components/ui'
import { useHistory } from "react-router-dom";

import {BaseContainer, BasePage } from 'src/components/ui';
import { LatestBlocksTable } from './LatestBlocksTable';

export function MainPage() {
  const history = useHistory();
  return (
    <BaseContainer direction="row" gap="medium" pad="0">
      <BasePage style={{ flex: '1 1 50%' }}>
        <Text size="large" weight="bold" margin={{ left: 'small', bottom: 'small' }}>Latest Blocks</Text>
        <LatestBlocksTable />
        <Button margin={{ top: 'medium' }} onClick={() => (history.push('/blocks'))}>VIEW ALL BLOCKS</Button>
      </BasePage>
      <BasePage style={{ flex: '1 1 50%' }}>
        <Text size="large" weight="bold">Latest Transactions</Text>
        <LatestTransactionsTable />
      </BasePage>
    </BaseContainer>
  )
}

function LatestTransactionsTable() {
  return (
    <div>
      tx
    </div>
  )
}