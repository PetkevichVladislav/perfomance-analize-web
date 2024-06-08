'use client';
import React, { ChangeEventHandler, useState } from 'react';
import './MainPage.scss';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface IAdvice {
  url: string;
  email: string;
  type: string;
}

const MainPage: React.FC = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [advice, setAdvice] = useState<IAdvice>({
    url: '',
    email: '',
    type: 'mobile',
  });

  const fieldChangeHandler = (fieldName: string) => (event: any) => {
    setAdvice((prevAdvice) => ({
      ...prevAdvice,
      [fieldName]: event.target.value,
    }));
  };

  const validateAndSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
    } else {
      sendRequest(advice);
    }
  };

  const sendRequest = async (advice: IAdvice): Promise<void> => {
    setIsProcessing(true);
    try {
      const response = await fetch('/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(advice),
      });
      const data = await response.json();
      console.log('Success:', data);
      router.push('/report/123');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="content-container">
        {!isProcessing && (
          <Card sx={{ minWidth: 300, maxWidth: '90%', width: '80%' }}>
            <CardContent>
              <Box className="epam-logo" />
              <h3 className="form-header-title">Performance Adviser</h3>
              <form
                id="myForm"
                className="form needs-validation"
                noValidate
                onSubmit={validateAndSubmit}
              >
                <TextField
                  id="input-url"
                  label="Site url"
                  variant="outlined"
                  onChange={fieldChangeHandler('url')}
                  sx={{ marginBottom: '20px' }}
                  size="small"
                />
                <TextField
                  id="input-email"
                  label="E-mail"
                  variant="outlined"
                  size="small"
                  onChange={fieldChangeHandler('email')}
                  sx={{ marginBottom: '20px' }}
                />
                <InputLabel id="demo-simple-select-label">
                  Device Type
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  size="small"
                  value={advice.type}
                  onChange={fieldChangeHandler('type')}
                  sx={{ marginBottom: '20px' }}
                >
                  <MenuItem value="mobile">Mobile</MenuItem>
                  <MenuItem value="descktop">Desktop</MenuItem>
                </Select>
                <Button
                  variant="contained"
                  type="submit"
                  endIcon={<SendIcon />}
                  sx={{ backgroundColor: '#053052' }}
                >
                  Get report
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
        {isProcessing && (
          <>
            <div className="loader"></div>
            <p className="loader-text">Cloud computing... please wait</p>
          </>
        )}
      </div>
      <div className="container-image"></div>
    </div>
  );
};

export default MainPage;
