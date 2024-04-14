import { useQuery } from '@tanstack/react-query';

const fetchLandApi =  async (params: any) => {
    const apiUrl = 'https://prod-be.1acre.in/lands/';
    try {
        const response = await fetch(apiUrl + '?ordering=-updated_at&page=1&page_size=10');
        console.log("response is", response);
        return response;
    }catch(error){
        return {
            error,
        }
    }
}

const useLandApi = (params: any) => {
    return useQuery({
        queryKey: ['LandApi'],
        queryFn: () => fetchLandApi(params),
    })
};

export { fetchLandApi, useLandApi};