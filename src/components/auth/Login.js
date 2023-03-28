import { Box, Button, Container, FormControl, FormHelperText, Input, Link, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useLogin } from 'hooks/auth';
import { useForm } from 'react-hook-form';
import { emailValidate, passwordValidate } from 'utils/form-validate';
import { DASHBOARD, REGISTER } from 'lib/routes';
import { useCurrentUser } from 'context/CurentUserContext'; 


export default function Login() {
  const { setCurrentUser } = useCurrentUser();
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    const user = await login(data.email, data.password, data.username, data.avatar, DASHBOARD);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
    }
  }
  
  return (
    <Container maxWidth="sm">
      <Box mt={10} p={5} boxShadow={5} borderRadius="borderRadius">
        <Typography component="h1" variant="h5" align="center">
          Log In
        </Typography>
        {errors.submit && (
          <Alert severity="error" sx={{ mt: 2, mb: 1 }}>
            {errors.submit.message}
          </Alert>
        )}
        <form onSubmit={handleSubmit(handleLogin)}>
          <FormControl fullWidth margin="normal" error={Boolean(errors.email)}>
            <Input
              type="email"
              placeholder="Email"
              {...register('email', emailValidate)}
              autoComplete="email"
            />
            {errors.email && (
              <FormHelperText>{errors.email.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal" error={Boolean(errors.password)}>
            <Input
              type="password"
              placeholder="Password"
              {...register('password', passwordValidate)}
                autoComplete="current-password"
            />
            {errors.password && (
              <FormHelperText>{errors.password.message}</FormHelperText>
            )}
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </Button>
        </form>
        <Typography variant="body1" align="center">
          Don't have an account?{' '}
          <Link component={RouterLink} to={REGISTER} underline="always">
            Register
          </Link>
        </Typography>
      </Box>
    </Container>

  )}
