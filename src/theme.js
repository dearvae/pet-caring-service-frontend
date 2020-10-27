import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import typography from './typography'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#009933',
    },
    secondary: {
      main: '#1a90ff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      main: '#F5F5F5',
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: typography,
})

export default theme
