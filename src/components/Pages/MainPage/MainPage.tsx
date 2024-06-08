'use client';
import React, { useState } from 'react';
import './MainPage.scss';
import { useRouter } from 'next/navigation';

interface RequestBody {
  url: string;
  email: string;
}

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

  const fieldChangeHandler =
    (fieldName: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        body: JSON.stringify(advice as RequestBody),
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
          <div id="form-container" className="form-container container">
            <h3 className="text">Performance Adviser</h3>
            <form
              id="myForm"
              className="form needs-validation"
              noValidate
              onSubmit={validateAndSubmit}
            >
              <div className="input-data form-row">
                <input
                  type="text"
                  name="url"
                  value={advice.url}
                  onChange={fieldChangeHandler('url')}
                  required
                />
                <div className="underline"></div>
                <label htmlFor="siteUrl">Site URL</label>
              </div>
              <div className="input-data form-row">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={advice.email}
                  onChange={fieldChangeHandler('email')}
                  required
                />
                <div className="underline"></div>
                <label htmlFor="email">E-mail</label>
              </div>
              <div className="input-data select form-row">
                <select
                  id="selectType"
                  name="type"
                  value={advice.type}
                  onChange={fieldChangeHandler('type')}
                  required
                >
                  <option value="mobile">Mobile</option>
                  <option value="desktop">Desktop</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">
                Send
              </button>
            </form>
          </div>
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
