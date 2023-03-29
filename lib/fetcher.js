import UseSWR from 'swr';

const baseURL = "http://localhost:3000/";

const response = (...args) => fetch(...args).then(res => res.json())

export default function fetcher(endpoint) {
    const { data, error } = UseSWR(`${baseURL}${endpoint}`, response)
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}