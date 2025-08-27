import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"   // ← extendTheme は消す

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>   {/* ← theme を渡さなくてもOK（デフォルト適用） */}
      <HashRouter>
        <App />
      </HashRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
