import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, PasswordInput, Button, Box, Text, Center, Title, Stack, Divider } from '@mantine/core';
import { IconAt, IconLock, IconKey, IconArrowRight } from '@tabler/icons-react';
import { loginRequest, verify2FA } from '../store/reducers/AuthSlice';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { is2FAFormVisible, loginError, verifyError, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/feed'); // Redirect to feed page
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (credentials.email && credentials.password) {
      dispatch(loginRequest({ ...credentials, trigger_email_login: false }));
    }
  };

  const handleVerifyOTP = () => {
    if (otp) {
      dispatch(verify2FA({ otp, email: credentials.email }));
    }
  };

  return (
    <Center style={{ height: '100vh', backgroundColor: '#f3f4f6' }}>
      <Box
        style={{
          width: '100%',
          maxWidth: 400,
          padding: 24,
          borderRadius: 8,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        <Stack style={{ marginTop: 20 }} >
          <Title order={2}  style={{ color: '#1e293b', fontWeight: 700,textAlign: 'center' }}>
            {is2FAFormVisible ? 'Verify OTP' : 'Welcome Back'}
          </Title>
          <Text style={{ textAlign: 'center' }} size="sm" color="dimmed">
            {is2FAFormVisible ? 'Please enter the OTP sent to your email' : 'Sign in to your account'}
          </Text>
          <Divider size="xs" />

          {!is2FAFormVisible ? (
            <>
              <TextInput
                label="Email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                // icon={<IconAt size={18} />}
                required
              />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                // icon={<IconLock size={18} />}
                required
              />
              {loginError && (
                <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                  {loginError}
                </Text>
              )}
              <Button
                fullWidth
                mt="md"
                onClick={handleLogin}
                style={{ backgroundColor: '#4f46e5', color: '#ffffff' }}
                rightSection={<IconArrowRight size={18} />}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <TextInput
                label="OTP"
                placeholder="Enter the OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                // icon={<IconKey size={18} />}
                required
              />
              {verifyError && (
                <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                  {verifyError}
                </Text>
              )}
             <Button
                fullWidth
                mt="md"
                onClick={handleVerifyOTP}
                style={{ backgroundColor: '#4f46e5', color: '#ffffff' }}
                >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>Login</span>
                    <IconArrowRight size={18} />
                </div>
                </Button>
            </>
          )}
        </Stack>
      </Box>
    </Center>
  );
};

export default SignIn;
