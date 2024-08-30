import axios from 'axios';

export const setTokens = (accessToken, refreshToken, username, role) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', username);
    localStorage.setItem('role', role);
};

export const getTokens = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken) {
        console.warn('Access token을 찾을 수 없습니다');
        return null;
    }

    return { accessToken, refreshToken };
};

export const removeToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
};

export const refreshAccessToken = async () => {
    const { refreshToken } = getTokens();
    try {
        const response = await axios.post('/refresh', {
            headers: { authorization: `Bearer ${refreshToken}` },
        });
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        setTokens(accessToken, newRefreshToken);
        return accessToken;
    } catch (err) {
        console.error('토큰 갱신 실패', err);
        removeToken();
        window.location.href = '/login';
    }
};

export const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
        (config) => {
            try {
                const tokens = getTokens();
                if (tokens && tokens.accessToken) {
                    config.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
                } else {
                    console.warn('Access token을 찾을 수 없습니다.');
                }
            } catch (error) {
                console.error('Error while setting up request interceptor:', error);
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            // 응답이 없는 경우(네트워크 오류 등) 처리
            if (!error.response) {
                console.error('Network error or no response from server');
                return Promise.reject(error);
            }

            // 401 에러 및 재시도하지 않은 요청에 대해서만 처리
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const newAccessToken = await refreshAccessToken();
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    console.error('Failed to refresh token:', refreshError);
                    // 토큰 갱신 실패 시 로그아웃 등의 처리
                    // 예: logout();
                    return Promise.reject(refreshError);
                }
            }

            // 다른 종류의 에러 처리
            if (error.response.status === 404) {
                console.error('Resource not found');
            } else if (error.response.status >= 500) {
                console.error('Server error');
            }
            return Promise.reject(error);
        }
    );
};
