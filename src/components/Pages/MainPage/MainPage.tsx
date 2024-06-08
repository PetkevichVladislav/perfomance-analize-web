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
import RocketIcon from '@mui/icons-material/Rocket';

interface IReport {
  url: string;
  visitors: string;
  views: string;
  ads: string;
  type: string;
}

const MainPage: React.FC = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [advice, setAdvice] = useState<IReport>({
    url: '',
    visitors: '',
    views: '',
    ads: '',
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
                />
                <TextField
                  id="input-visitors"
                  label="Visitors per month"
                  variant="outlined"
                  onChange={fieldChangeHandler('visitors')}
                  sx={{ marginBottom: '20px' }}
                  size="small"
                  type="number"
                />
                <TextField
                  id="input-views"
                  label="Page views per visit"
                  variant="outlined"
                  onChange={fieldChangeHandler('views')}
                  sx={{ marginBottom: '20px' }}
                  size="small"
                  type="number"
                />
                <TextField
                  id="input-ads"
                  label="Ads per page"
                  variant="outlined"
                  size="small"
                  onChange={fieldChangeHandler('ads')}
                  sx={{ marginBottom: '20px' }}
                  type="number"
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
