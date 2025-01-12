import { Address, Timestamp, BlockHash, BlockNumber, TransactionHash } from 'src/components/ui'
import { Clone, FormPreviousLink, FormNextLink } from 'grommet-icons'
import {
  Link
} from 'react-router-dom'

import React from 'react'
import { Block } from 'src/types'

export const blockPropertyDisplayNames: Record<string, string> = {
  'number': 'Height',
  'hash': 'Hash',
  'miner': 'Mined by',
  'extraData': 'Extra Data',
  'gasLimit': 'Gas Limit',
  'gasUsed': 'Gas Used',
  'timestamp': 'Timestamp',
  'difficulty': 'Difficulty',
  'logsBloom': 'Logs Bloom',
  'mixHash': 'Mix Hash',
  'nonce': 'Nonce',
  'parentHash': 'Parent Hash',
  'receiptsRoot': 'Receipts Root',
  'sha3Uncles': 'SHA3 Uncles',
  'size': 'Size',
  'stateRoot': 'State Root',
  'transactions': 'Transactions',
  'stakingTransactions': 'Staking Transactions',
  'transactionsRoot': 'Transactions Root',
  'uncles': 'Uncles',
  'epoch': 'Epoch',
  'viewID': 'View ID'
}

export const blockPropertyDescriptions: Record<string, string> = {
  'number': 'Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block.',
  'hash': 'The hash of the block header of the current block.',
  'miner': 'Miner who successfully include the block onto the blockchain.',
  'extraData': 'Any data that can be included by the miner in the block.',
  'gasLimit': 'Total gas limit provided by all transactions in the block.',
  'gasUsed': 'The total gas used in the block and its percentage of gas filled in the block.',
  'timestamp': 'The date and time at which a block is mined.',
  'difficulty': 'The amount of effort required to mine a new block. The difficulty algorithm may adjust according to time.',
  'logsBloom': 'Logs Bloom',
  'mixHash': 'Mix Hash',
  'nonce': 'Block nonce is a value used during mining to demonstrate proof of work for a block.',
  'parentHash': 'The hash of the block from which this block was generated, also known as its parent block.',
  'receiptsRoot': 'Receipts Root',
  'sha3Uncles': 'The mechanism which Ethereum Javascript RLP encodes an empty string.',
  'size': 'The block size is actually determined by the block\'s gas limit.',
  'stateRoot': 'The root of the state trie',
  'transactions': 'The number of transactions in the block. Internal transaction is transactions as a result of contract execution that involves ONE value.',
  'stakingTransactions': 'The number of staking transactions in the block.',
  'transactionsRoot': 'Transactions Root',
  'uncles': 'Uncles',
  'epoch': 'Epoch',
  'viewID': 'View ID'
}

export const blockPropertySort: Record<string, number> = {
  'number': 1000,
  'hash': 995,
  'miner': 960,
  'extraData': 500,
  'gasLimit': 900,
  'gasUsed': 890,
  'timestamp': 990,
  'difficulty': 500,
  'logsBloom': 500,
  'mixHash': 500,
  'nonce': 500,
  'parentHash': 500,
  'receiptsRoot': 500,
  'sha3Uncles': 500,
  'size': 700,
  'stateRoot': 500,
  'transactions': 980,
  'stakingTransactions': 970,
  'transactionsRoot': 500,
  'uncles': 500,
  'epoch': 500,
  'viewID': 500
}
const emptyLogBloom = '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
const emptyMixHash = '0x0000000000000000000000000000000000000000000000000000000000000000'

export const blockPropertyDisplayValues: any = {
  // @ts-ignore
  'number': (value: any) => <>
    <BlockNumber number={value} />
    &nbsp;
    {value > 0 && <Link to={`/block/${+value - 1}`}>
      <FormPreviousLink size="small" color="accent-2" />
    </Link>}
    <Link to={`/block/${+value + 1}`}>
      <FormNextLink size="small" color="accent-2" />
    </Link>
  </>,
  'transactions': (value: any[]) => value.length > 0 ?
    value.map(tx => <>
      <Clone size="small" color="brand" />&nbsp;
      <TransactionHash key={tx} hash={tx} /><br/></>) : null,
  'miner': (value: any) => <Address address={value} />,
  'hash': (value: any) => <BlockHash hash={value} />,
  'parentHash': (value: any) => <BlockHash hash={value} />,
  'timestamp': (value: any) => <Timestamp timestamp={value} />,
  'gasUsed': (value: any, block: Block) => <span>{value} ({+value / +block.gasLimit}%) </span>
}

export const blockDisplayValues = (block: Block, key: string, value: any) => {
  const f = blockPropertyDisplayValues[key]

  let displayValue = value

  if (f) {
    displayValue = f(value, block)
  } else {
    if (Array.isArray(value)) {
      displayValue = value.join(', ')
    }

    if (displayValue === emptyLogBloom || displayValue === emptyMixHash) {
      displayValue = null
    } else if (value && value.length && value.length > 66) {
        displayValue = value.slice(0, 63) + '...'
    }

    if (displayValue === '0x') {
      displayValue = null
    }
  }

  return <div>
    {
      !['transactions', 'stakingTransactions', 'uncles', 'nonce'].includes(key) &&
      !['0x', '0',0, null].includes(displayValue) &&
      <><Clone size="small" color="brand" />&nbsp;</>
    }
    {displayValue || '—'}
  </div>
}