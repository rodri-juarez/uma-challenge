
interface QueryProps {
  month: string;
  startDate: string;
  endDate: string;
}

export async function getMonthQuery({month, startDate, endDate}: QueryProps) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calendar/${month}?startDate=${startDate}&endDate=${endDate}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json();
}
