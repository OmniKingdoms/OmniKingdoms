import logo from './logo.svg';
import {
  Link,
  BrowserRouter,
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import React, { useState, useEffect } from 'react';

import Action from './game/action';
import Mint from './game/mint';
import StickyFooter from './components/StickyFooter';

import { ethers } from "ethers";
import { Spinner, Navbar, Nav, Button, Container } from 'react-bootstrap';

import './App.css'

function App() {

  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);

  const web3Handler = async () => {
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])

    // Setup event listeners for metamask
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    })
    window.ethereum.on('accountsChanged', async () => {
      setLoading(true)
      web3Handler()
    })
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Get signer
    // const signer = provider.getSigner()
    // loadContract(signer)
  };

  useEffect(() => {
    web3Handler();
  }, []);



  return (
    <HashRouter>
      <div className="App">
        <>
          <Navbar expand="lg" bg="secondary" variant="dark">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Brand href="/">Scroll Kingdoms</Navbar.Brand>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/mint">Mint</Nav.Link>
                </Nav>
                <Nav>
                  {account ? (
                    <Nav.Link
                      href={`https://etherscan.io/address/${account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button nav-button btn-sm mx-4">
                      <Button variant="outline-light">
                        {account.slice(0, 5) + '...' + account.slice(38, 42)}
                      </Button>

                    </Nav.Link>
                  ) : (
                    <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (         
            <Routes>
              <Route path="/" element={
                <Action />
              } />
              <Route path="/mint" element={
                <Mint />
              } />
            </Routes>
          )}
        </div>
        <div>
          <StickyFooter />
        </div>
      </div>
    </HashRouter>

  );
}

export default App;
