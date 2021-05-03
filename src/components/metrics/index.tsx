import React, {useEffect, useState} from "react";
import { Box, Text, DataChart } from "grommet";
import {BasePage, reintervate} from "src/components/ui";
import { formatNumber } from "src/components/ui/utils";
import { LatencyIcon } from "src/components/ui/icons";
import { Transaction, LineChart, Cubes } from "grommet-icons";
import styled from "styled-components";
import { theme } from "../../theme";
import { useONEExchangeRate } from "../../hooks/useONEExchangeRate";
import {transport} from "../../api/explorer/ws";

export function Metrics() {
  const { LightGrey } = theme?.global?.palette;

  return (
    <BasePage direction="row" justify="between" margin={{ bottom: "medium" }}>
      <Box
        justify="between"
        pad={{ right: "medium" }}
        style={{
          height: "140px",
          flex: "1 1",
          borderRight: `1px solid ${LightGrey}`,
        }}
      >
        <ONEPrice />
        <Line horizontal />
        <TransactionsCount />
      </Box>
      <Box
        justify="between"
        pad={{ horizontal: "medium" }}
        style={{
          height: "140px",
          flex: "1 1",
          borderRight: `1px solid ${LightGrey}`,
        }}
      >
        <ShardCount />
        <Line horizontal />
        <BlockLatency />
      </Box>
      <Box
        justify="between"
        pad={{ left: "medium" }}
        style={{ height: "140px", flex: "1 1" }}
      >
        <BlockTransactionsHistory />
      </Box>
    </BasePage>
  );
}

function ONEPrice() {
  const { lastPrice, priceChangePercent } = useONEExchangeRate();

  if (!lastPrice && !priceChangePercent) {
    return <div />;
  }

  return (
    <Box direction="row" align="stretch">
      <Box
        pad={{ left: "xsmall", right: "small" }}
        justify="center"
        align="center"
      >
        <LineChart size="32px" color="brand" />
      </Box>
      <Box align="start">
        <Text size="small" color="minorText">
          {"ONE PRICE"}
        </Text>
        <Box direction="row" gap="xsmall" align="baseline">
          <Text size="small" weight="bold">
            $ {formatNumber(lastPrice)}
          </Text>
          <Text
            size="11px"
            weight="bold"
            color={priceChangePercent > 0 ? "#2cb32c" : "#d23540"}
          >
            ({priceChangePercent > 0 ? "+" : ""}
            {formatNumber(priceChangePercent)}%)
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

function TransactionsCount() {
  const [count, setCount] = useState<string>('');

  useEffect(() => {
    const getCount = async () => {
      try {
        let res = (await transport("getCount", [0, "transactions"])) || ({} as any);
        setCount(res.count as string);
      } catch (err) {
        console.log(err);
      }
    };
    reintervate(getCount, 30000);

  }, []);

  return (
    <Box direction="row" align="stretch">
      <Box
        pad={{ left: "xsmall", right: "small" }}
        justify="center"
        align="center"
      >
        <Transaction size="32px" color="brand" />
      </Box>
      <Box align="start">
        <Text size="small" color="minorText">
          {"TRANSACTIONS COUNT"}
        </Text>
        <Text size="small" weight="bold">
          {formatNumber(+count)}
        </Text>
      </Box>
    </Box>
  );
}

function ShardCount() {
  const count = 4;

  return (
    <Box direction="row" align="stretch">
      <Box
        pad={{ left: "xsmall", right: "small" }}
        justify="center"
        align="center"
      >
        <Cubes size="32px" color="brand" />
      </Box>
      <Box align="start">
        <Text size="small" color="minorText">
          {"SHARD COUNT"}
        </Text>
        <Text size="small" weight="bold">
          {formatNumber(count)}
        </Text>
      </Box>
    </Box>
  );
}

function BlockLatency() {
  const latency = 2.02;

  return (
    <Box direction="row" align="stretch">
      <Box
        pad={{ left: "xsmall", right: "small" }}
        justify="center"
        align="center"
      >
        <LatencyIcon size="30px" color="brand" />
      </Box>
      <Box align="start">
        <Text size="small" color="minorText">
          {"BLOCK LATENCY"}
        </Text>
        <Text size="small" weight="bold">
          {formatNumber(latency)}s
        </Text>
      </Box>
    </Box>
  );
}

function BlockTransactionsHistory() {
  const data = [
    { date: "08-20", amount: 0 },
    { date: "08-21", amount: 18 },
    { date: "08-22", amount: 21 },
    { date: "08-23", amount: 14 },
    { date: "08-24", amount: 52 },
    { date: "08-25", amount: 43 },
  ];

  return (
    <Box>
      <Text size="small" color="minorText" style={{ flex: "1 0 auto" }}>
        {"TRANSACTION HISTORY"}
      </Text>
      <Box style={{ flex: "1 1 100%" }}>
        <DataChart
          data={data}
          axis={{
            x: {
                granularity: 'fine',
                property: "date",
              },
            y:
              {
                granularity: 'medium',
                property: "amount",
              },
          }}
          series={[
            {
              property: "date",
              label: "Date",
              render: (value) => (
                <Text size="xsmall" color="minorText">
                  {value}
                </Text>
              ),
            },
            {
              property: "amount",
              label: "Transactions",
              render: (value) => (
                <Text size="xsmall" color="minorText">
                  {formatNumber(value)}
                </Text>
              ),
            },
          ]}
          // detail
          size="fill"
          chart={[
            {
              property: "amount",
              type: "line",
              color: "brand",
              opacity: "medium",
              thickness: "2px",
            },
          ]}
        />
      </Box>
    </Box>
  );
}

const Line = styled.div<{ horizontal?: boolean; vertical?: boolean }>`
  display: flex;
  width: ${(props) => (props.horizontal ? "100%" : "1px")};
  height: ${(props) => (props.vertical && !props.horizontal ? "100%" : "1px")};
  background-color: ${(props) => props.theme.global.colors.border};
`;