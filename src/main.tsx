import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'
import { ThemeProvider } from "./hooks/useTheme";

render(<ThemeProvider><App /></ThemeProvider>, document.getElementById('app')!)
