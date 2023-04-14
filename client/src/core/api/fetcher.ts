export async function fetcher(...args: Parameters<typeof fetch>) {
  return fetch(...args).then((res) => res.json());
}

async function request<T = unknown>(
  url: string,
  method: string,
  values: Record<string, unknown>
): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function postRequest<T = unknown>(
  url: string,
  values: Record<string, unknown>
): Promise<T> {
  return request<T>(url, "POST", values);
}

export async function putRequest<T = unknown>(
  url: string,
  values: Record<string, unknown>
): Promise<T> {
  return request<T>(url, "PUT", values);
}

export async function deleteRequest<T = unknown>(
  url: string,
  values: Record<string, unknown>
): Promise<T> {
  return request<T>(url, "DELETE", values);
}
