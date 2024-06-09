'use client';
import React, { useState } from 'react';
import './MainPage.scss';
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
import RocketIcon from '@mui/icons-material/Rocket';
import { Loader } from '@/components/Loader/Loader';

interface IReport {
  url: string;
  visitors: number;
  views: number;
  ads: number;
  type: string;
}

const MainPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [advice, setAdvice] = useState<IReport>({
    url: '',
    visitors: 20000,
    views: 5,
    ads: 3,
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

  const sendRequest = async (advice: IReport): Promise<void> => {
    setIsProcessing(true);
    try {
      const response = await fetch('/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(advice),
      });
      const data = await response.json();
      console.log('Success:', data);
      window.location.href = '/report/3f8a74f6-6b86-4fa9-8075-cc03e5b05ccc';
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
              <h3 className="form-header-title">Revenue Rocket 🚀</h3>
              <form
                id="myForm"
                className="form needs-validation"
                noValidate
                onSubmit={validateAndSubmit}
              >
                <TextField
                  id="input-url"
                  label="Site URL"
                  variant="outlined"
                  onChange={fieldChangeHandler('url')}
                  sx={{ marginBottom: '20px' }}
                  size="small"
                  value={advice.url}
                />
                <TextField
                  id="input-visitors"
                  label="Visitors per month"
                  variant="outlined"
                  onChange={fieldChangeHandler('visitors')}
                  sx={{ marginBottom: '20px' }}
                  size="small"
                  type="number"
                  value={advice.visitors}
                />
                <TextField
                  id="input-views"
                  label="Page views per visit"
                  variant="outlined"
                  onChange={fieldChangeHandler('views')}
                  sx={{ marginBottom: '20px' }}
                  size="small"
                  type="number"
                  value={advice.views}
                />
                <TextField
                  id="input-ads"
                  label="Ads per page"
                  variant="outlined"
                  size="small"
                  onChange={fieldChangeHandler('ads')}
                  sx={{ marginBottom: '20px' }}
                  type="number"
                  value={advice.ads}
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
                  endIcon={<RocketIcon />}
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
            <Loader />
          </>
        )}
      </div>
      <div className="container-image"></div>
    </div>
  );
};

export default MainPage;
