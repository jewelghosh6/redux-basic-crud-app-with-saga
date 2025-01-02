import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, PasswordInput, Button, Box, Text, Center, Title, Stack, em } from '@mantine/core';
import { loginRequest, verify2FA } from '../store/reducers/AuthSlice';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [otp, setOtp] = useState('');
  const navigate =useNavigate();
  const dispatch = useDispatch();

  // Select authentication state from Redux
  const { is2FAFormVisible, loginError, verifyError, isAuthenticated } = useSelector((state:RootState) => state.auth);

  useEffect(() => {
    // Redirect to home page on successful 2FA verification
    if (isAuthenticated) {
        navigate('/feed'); // Redirect to feed page
    }
    }, [isAuthenticated]);

  const handleLogin = () => {
      if (credentials.email && credentials.password) {
        console.log(credentials);
      dispatch(loginRequest({...credentials, trigger_email_login:false }));
    }
  };

  const handleVerifyOTP = () => {
    if (otp) {
      dispatch(verify2FA({otp, email:credentials.email}));
    }
  };

  return (
    <Center style={{ height: '100vh', backgroundColor: '#f9fafb' }}>
      <Box
        style={{ width: '100%', maxWidth: 400, padding: 16, borderRadius: 4, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}
      >
        <Stack>
          <Title order={2} style={{ textAlign: 'center' }}>
            {is2FAFormVisible ? 'Verify OTP' : 'Sign In'}
          </Title>

          {!is2FAFormVisible ? (
            <>
              <TextInput
                label="Username"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                />
                {loginError && <Text color="red" size="sm">{loginError}</Text>}
              <Button fullWidth mt="md" onClick={handleLogin}>
                Login
              </Button>
            </>
          ) : (
            <>
              <TextInput
                label="OTP"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                />
                {verifyError && <Text color="red" size="sm">{verifyError}</Text>}
              <Button fullWidth mt="md" onClick={handleVerifyOTP}>
                Verify
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Center>
  );
};

export default SignIn;
