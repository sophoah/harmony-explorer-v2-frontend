import { TransactionDetails } from "src/components/transaction/TransactionDetails";
import { InternalTransactionList } from "src/components/transaction/InternalTransactionList";
import { RPCStakingTransactionHarmony } from "src/types";
import { BasePage } from "src/components/ui";

import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Text } from "grommet";
import { getTransactionByField } from "src/api/client";

export const TransactionPage = () => {
  // hash or number
  // @ts-ignore
  const { id } = useParams();
  const [tx, setTx] = useState<RPCStakingTransactionHarmony | null>(null);

  useEffect(() => {
    const exec = async () => {
      let tx;
      if (id.length === 66) {
        tx = await getTransactionByField([0, "hash", id]);
      }
      setTx(tx as RPCStakingTransactionHarmony);
    };
    exec();
  }, [id]);

  if (!tx) {
    return null;
  }

  return (
    <BasePage>
      <Tabs alignControls="start">
        <Tab title={<Text size="small">Transaction Details</Text>}>
          <TransactionDetails transaction={tx} />
        </Tab>
        <Tab title={<Text size="small">Internal Transactions</Text>}>
          <InternalTransactionList hash={tx.hash} />
        </Tab>
        <Tab title={<Text size="small">Logs</Text>}>WIP</Tab>
      </Tabs>
    </BasePage>
  );
};