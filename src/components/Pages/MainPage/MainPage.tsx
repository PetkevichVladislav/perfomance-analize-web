"use client";
import React, { useState } from 'react';
import './MainPage.scss';

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
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [advice, setAdvice] = useState<IAdvice>({
        url: '',
        email: '',
        type: 'mobile'
    });

    const fieldChangeHandler = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setAdvice((advice) =>
            ({...advice, [`${fieldName}`]: event.target.value})
        )
    }

    const validateAndSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            setIsProcessing(true);
            sendRequest(advice);
        }
    };

    const sendRequest = (advice: IAdvice): void => {
        const functionUrl = "";

        const requestBody: RequestBody = {
            url: advice.url,
            email: advice.email,
        };

        fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setIsProcessing(false);
        })
        .catch((error) => {
            console.error('Error:', error);
            setIsProcessing(false);
        });
    };

    return (
        <div className="main-container">
            <div className="content-container">
                <div id="form-container" className="form-container container">
                    <h3 className="text">Performance Adviser</h3>
                    <form id="myForm" className="form needs-validation" noValidate onSubmit={validateAndSubmit}>
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
                        <div className="input-data form-row">
                            <select
                                className="form-control input-data"
                                id="selectType"
                                name="type"
                                value={advice.type}
                                onChange={fieldChangeHandler('type')}
                                required
                            >
                                <option value="mobile">Mobile</option>
                                <option value="desktop">Desktop</option>
                            </select>
                            <div className="underline"></div>
                            <label htmlFor="selectType">Select Type</label>
                        </div>
                        <button type="submit" className="submit-btn">
                            Send
                        </button>
                    </form>
                </div>
                {isProcessing && (
                    <div id="processingMessage">
                        <p className="lead">Start to processing and sending report...</p>
                    </div>
                )}
            </div>
            <div className="container-image"></div>
        </div>
    );
};

export default MainPage;
