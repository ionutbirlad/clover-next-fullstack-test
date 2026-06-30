import Api from '../helpers/core/Api';

const extractErrorMessage = error => error.response?.data?.message || error.message;
const normalizeSuccess = response => {
  const body = response.data;

  if (body?.success === false) {
    return {
      ok: false,
      status: response.status,
      kind: 'application',
      errorMessage: body.message,
      data: body.data
    };
  }

  return {
    ok: true,
    status: response.status,
    data: body?.data ?? body
  };
};

const apiClient = async request => {
  try {
    const response = await request();

    return normalizeSuccess(response);
  } catch (error) {
    return {
      ok: false,
      status: error.response?.status || 0,
      kind: error.response ? 'http' : 'network',
      errorMessage: extractErrorMessage(error),
      data: error.response?.data
    };
  }
};

export const apiGet = (url, config) => apiClient(() => Api.get(url, config));
export const apiPost = (url, data, config) => apiClient(() => Api.post(url, data, config));
export const apiPatch = (url, data, config) => apiClient(() => Api.patch(url, data, config));
export const apiDelete = (url, config) => apiClient(() => Api.delete(url, config));
