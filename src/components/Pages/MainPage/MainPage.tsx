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
                <div id="form-container" className="form-container">
                    <h3>Performance Adviser</h3>
                    <h6>Fill form and wait for results.</h6>
                    <form id="myForm" className="form needs-validation" noValidate onSubmit={validateAndSubmit}>
                        <div className="form-group">
                            <label htmlFor="siteUrl">Site URL</label>
                            <input
                                type="url"
                                className="form-control"
                                id="siteUrl"
                                name="url"
                                value={advice.url}
                                onChange={fieldChangeHandler('url')}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={advice.email}
                                onChange={fieldChangeHandler('email')}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="selectType">Select Type</label>
                            <select
                                className="form-control"
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
                        <button type="submit" className="btn btn-info btn-lg btn-block">
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
