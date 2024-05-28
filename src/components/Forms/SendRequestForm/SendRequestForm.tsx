import React, { useState } from 'react'

interface SendRequestFormProps {

}


interface RequestBody {
    url: string;
    email: string;
}

const SendRequestForm : React.FC<SendRequestFormProps> = (props) => {
    const [url, setUrl] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [type, setType] = useState<string>('mobile');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const validateAndSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            setIsProcessing(true);
            sendRequest(url, email, type);
        }
    };

    const sendRequest = (url: string, email: string, type: string): void => {
        const functionUrl = "";

        const requestBody: RequestBody = {
            url: url,
            email: email,
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
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="selectType">Select Type</label>
                    <select
                        className="form-control"
                        id="selectType"
                        name="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
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
        </div>);
}

export default SendRequestForm;