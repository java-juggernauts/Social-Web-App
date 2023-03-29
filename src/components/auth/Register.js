
import { Box, Button, Container, FormControl, FormHelperText, Input, Link, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useRegister } from 'hooks/auth';
import { useForm } from 'react-hook-form';
import { emailValidate, passwordValidate, usernameValidate } from 'utils/form-validate';
import { DASHBOARD, LOGIN } from 'lib/routes';
import { useCurrentUser } from 'context/CurentUserContext';

export default function Register() {
  const { setCurrentUser } = useCurrentUser();
  const { register : signup, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleRegister(data) {
    const newUser = await signup({
      username: data.username,
      email: data.email,
      password: data.password,
      redirectTo: DASHBOARD,
    });
  
    if (newUser) {
      setCurrentUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    }
  
    console.log(data);
  }
  
  return (
    <Container maxWidth="sm">
      <Box mt={10} p={5} boxShadow={5} borderRadius="borderRadius">
        <Typography component="h1" variant="h5" align="center">
          Register
        </Typography>
        {errors.submit && (
          <Alert severity="error" sx={{ mt: 2, mb: 1 }}>
            {errors.submit.message}
          </Alert>
        )}
        <form onSubmit={handleSubmit(handleRegister)}>
        <FormControl fullWidth margin="normal" error={Boolean(errors.email)}>
            <Input
              type="username"
              placeholder="Username"
              {...register('username', usernameValidate)}
              autoComplete="username"
            />
            {errors.email && (
              <FormHelperText>{errors.username.message}</FormHelperText>
            )}
          </FormControl>

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
           {isLoading ? 'Creating Account...' : 'Register'}
          </Button>

        </form>
        <Typography variant="body1" align="center">
          Already have an account?{' '}
          <Link component={RouterLink} to={LOGIN} underline="always">
            Log in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
