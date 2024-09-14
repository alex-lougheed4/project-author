import { useAuth0 } from '@auth0/auth0-react';
import { Button, Typography } from '@mui/material';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button>
      {/*floating action button? */}
      {/** Use a divider to have both on one modal? */}
      <Typography
        variant="h6"
        color="white"
        noWrap
        component="div"
        sx={{ display: { xs: 'none', sm: 'block' } }}
        onClick={() => loginWithRedirect()}
      >
        Login
      </Typography>
    </Button>
  );
};

export default LoginButton;
