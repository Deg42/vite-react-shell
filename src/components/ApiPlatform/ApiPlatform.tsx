import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { localStorageService } from '../../services/localStorageService';

import './ApiPlatform.css';

interface ApiResponse {
    completeUrl: string;
    data: unknown;
    expanded: boolean;
}

const ApiPlatform: React.FC = () => {
    const [url, setUrl] = useState<string>('localhost:8080');
    const [apiAddress, setApiAddress] = useState<string>('');
    const [responses, setResponses] = useState<ApiResponse[]>([]);
    const [testResponse, setTestResponse] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getLocalStorageUrls();
    }, []);

    const getLocalStorageUrls = () => {
        const storedResponses: string | null = localStorageService.getItem('apiPlatformCollection');
        if (storedResponses) {
            const parsedResponses: ApiResponse[] = JSON.parse(storedResponses).map((response: ApiResponse) => ({
                ...response,
                expanded: false
            }));
            setResponses(parsedResponses);
        }
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    const handleApiAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApiAddress(event.target.value);
    };

    const handleTestUrl = async () => {
        setError(null);

        try {
            const completeUrl = url + apiAddress;
            const response = await axios.get("http://" + completeUrl);
            setTestResponse({ completeUrl, data: response.data, expanded: false });  // El resultado se guarda contraído por defecto
        } catch (error) {
            setError('La URL no es válida o no se pudo alcanzar. ' + error);
            setTestResponse(null);
        }
    };

    const handleSaveUrl = () => {
        if (!testResponse) return;

        const updatedResponses = responses.map((response) =>
            response.completeUrl === testResponse.completeUrl ? testResponse : response
        );

        if (!responses.some(response => response.completeUrl === testResponse.completeUrl)) {
            updatedResponses.push(testResponse);
        }

        setResponses(updatedResponses);
        localStorageService.setItem('apiPlatformCollection', JSON.stringify(updatedResponses));
        setTestResponse(null);
    };

    const toggleDetails = (index: number) => {
        setResponses(prevResponses =>
            prevResponses.map((response, i) =>
                i === index ? { ...response, expanded: !response.expanded } : response
            )
        );
    };

    const handleDelete = (index: number) => {
        const updatedResponses = responses.filter((_, i) => i !== index);
        setResponses(updatedResponses);
        localStorageService.setItem('apiPlatformCollection', JSON.stringify(updatedResponses));
    };

    const handleClearAll = () => {
        setResponses([]);
        localStorageService.removeItem('apiPlatformCollection');
    };

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Introduce una URL"
                    className="text-neutral-950"
                    value={url}
                    onChange={handleUrlChange}
                />
                <input
                    type="text"
                    placeholder="API"
                    className="text-neutral-950"
                    value={apiAddress}
                    onChange={handleApiAddressChange}
                />
                <Button type="button" onClick={handleTestUrl}>Probar URL</Button>
                {testResponse && (
                    <Button type="button" onClick={handleSaveUrl}>Guardar URL</Button>
                )}
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {testResponse && (
                <div>
                    <h3>Resultado de la prueba</h3>
                    <p><strong>URL:</strong> {testResponse.completeUrl}</p>
                    <pre>{JSON.stringify(testResponse.data, null, 2).slice(0, 100) + '...'}</pre>
                </div>
            )}

            <h2>Lista de URLs Guardadas</h2>
            <ul>
                {responses.map((response, index) => (
                    <li key={index}>
                        <p><strong>URL:</strong> {response.completeUrl}</p>
                        <button onClick={() => toggleDetails(index)}>
                            {response.expanded ? 'Mostrar menos' : 'Mostrar más'}
                        </button>
                        <pre>
                            {response.expanded
                                ? JSON.stringify(response.data, null, 2)
                                : JSON.stringify(response.data, null, 2).slice(0, 100) + '...'}
                        </pre>

                        <Button onClick={() => handleDelete(index)}>Eliminar</Button>
                    </li>
                ))}
            </ul>
            {responses.length > 0 && (
                <button onClick={handleClearAll}>Eliminar todas las URLs</button>
            )}
        </div>
    );
};

export default ApiPlatform;
