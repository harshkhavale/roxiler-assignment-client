const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Something went wrong");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

const get = (endpoint, headers = {}) =>
  fetchApi(endpoint, {
    method: "GET",
    headers,
  });

const post = (endpoint, body, headers = {}) =>
  fetchApi(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });

const put = (endpoint, body, headers = {}) =>
  fetchApi(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
    headers,
  });

const del = (endpoint, headers = {}) =>
  fetchApi(endpoint, {
    method: "DELETE",
    headers,
  });

export { get, post, put, del };

export const ROLES = {
  ADMIN: "admin",
  OWNER: "owner",
  USER: "user",
};

export const hasRole = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};
