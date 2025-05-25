import { useEffect, useState } from 'react';
const useFetch = <T>(apiFunction: () => Promise<T>, autoCall = true) => {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const callApi = async () => {
        setLoading(true);
        try {
            const result = await apiFunction();
            setData(result);
        } catch (error) {
            //@ts-ignore
            setError(error instanceof Error ? error : new Error('Unknown error'));
        } finally {
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    }

    useEffect(() => {
        if (autoCall) {
            callApi()
        }
    }, []);

    return {
        data,
        loading,
        error,
        callApi,
        reset,
    }

}

export default useFetch;