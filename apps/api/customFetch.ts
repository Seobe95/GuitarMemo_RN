export async function request<T, E>(url: string, options: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // 응답이 성공적이지 않은 경우 오류로 처리
      throw new Error(`http error: ${response.status}`);
    }
    // 응답이 성공적인 경우, JSON 형식의 데이터를 반환
    const data: T = await response.json();
    return data;
  } catch (error) {
    // 네트워크 오류 또는 다른 예외 처리
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
}
