import React, { useState } from "react";

import styled from "styled-components";

import { IUserERC721Assets } from "src/api/client.interface";
import { Box, Spinner, Text } from "grommet";
import { Address } from "src/components/ui";
import { Alert } from "grommet-icons";

export interface IInventoryItemProps {
  item: IUserERC721Assets;
}

const InventItem = styled.div`
  width: 215px;
  position: relative;
  margin: 10px;
`;

const Loader = styled.div`
  position: absolute;
  width: 215px;
  height: 270px;
  background: #fff;
`;

const InventImg = styled.img`
  width: 215px;
  height: 270px;
`;

const ErrorPreview = styled(Box)`
  width: 215px;
  height: 270px;

  background: #f9f6f6;
  border-radius: 8px;
`;

export function InventoryItem(props: IInventoryItemProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorLoading, setIsErrorLoading] = useState(false);

  const url = props.item?.meta?.image || "";
  const description = props.item?.meta?.description || "";
  const { tokenID, ownerAddress } = props.item;

  return (
    <InventItem>
      {isLoading ? (
        <Loader>
          <Box align={"center"} justify={"center"} flex height={"100%"}>
            <Spinner />
          </Box>
        </Loader>
      ) : null}
      {isErrorLoading ? (
        <ErrorPreview direction={"column"} justify={"center"} align={"center"}>
          <Alert size={"large"} style={{ marginBottom: "10px" }} />
          <Text>Error loading image</Text>
        </ErrorPreview>
      ) : (
        <InventImg
          title={description}
          src={url}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setIsErrorLoading(true);
          }}
        />
      )}
      <Box direction={"column"} flex align={"center"}>
        <Text title={tokenID}>
          #
          {tokenID.length > 8
            ? `${tokenID.slice(0, 5)}...${tokenID.slice(-5)}`
            : tokenID}
        </Text>
        <Text>
          Owner <Address address={ownerAddress} isShort={true} />
        </Text>
      </Box>
    </InventItem>
  );
}
