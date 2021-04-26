import React from 'react'
import './index.css'
import { Box, Button, Heading, Grommet } from 'grommet'
import { Configure } from 'grommet-icons'
import { BlockPage } from 'src/pages/BlockPage'
import { FiatPrice } from 'src/components/ui'
import { TransactionPage } from 'src/pages/TransactionPage'
import { SearchInput } from './components/ui/Search'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

const AppBar = (props: any) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    style={{ zIndex: '1' }}
    {...props}

  />
)

const theme = {
  global: {
    focus: {
      border: {
        color: 'transparent'
      }
    },
    colors: {
      // brand: '#00aee9',
      border: '#e7ecf7'
    },
    font: {
      family: 'Nunito',
      size: '14px',
      height: '20px'
    }
  },
  anchor: {
    textDecoration: 'none',
    hover: {
      textDecoration: 'none'
    }
  }
}

function App() {
  return (
    <Router>
      <Grommet theme={theme} full>
        <Box fill>
          <AppBar>
            <Heading level="5" margin="none">
              Harmony Block Explorer<br />
              <FiatPrice />
            </Heading>
            <Button icon={<Configure size="medium" />} onClick={() => {
            }} />
          </AppBar>
          <SearchInput />
          <Box direction="column" flex overflow={{ horizontal: 'scroll' }} pad="medium">

            <Switch>
              <Route exact path="/">
                <div>Main Page</div>
              </Route>

              <Route path="/block/:id">
                <BlockPage />
              </Route>
              <Route path="/tx/:id">
                <TransactionPage />
              </Route>

            </Switch>

          </Box>
        </Box>
      </Grommet>
    </Router>
  )
}

export default App
