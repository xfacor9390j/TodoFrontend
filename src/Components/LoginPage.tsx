
import { Button, Grid, Box } from '@mui/material'


export default function LoginPage() {

    const handleLogin = () => {
        window.location.href = "https://todo-backend-nine-phi.vercel.app/api/auth/github";
      };
  return (
      <>
          <Grid container height='100vh' display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
              <Box><h3>Log in securely using GitHub OAuth 2.0</h3></Box>
              <Grid margin={2} item>
                  <Button variant="contained" onClick={handleLogin}>Login with GitHub</Button>
              </Grid>
      </Grid>
      </>
  )
}
