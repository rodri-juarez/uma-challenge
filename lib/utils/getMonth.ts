
interface QueryProps {
  month: string;
  startDate: string;
  endDate: string;
}

export async function getMonthQuery({month, startDate, endDate}: QueryProps) {
  const response = await fetch(`http://localhost:3001/calendar/${month}?startDate=${startDate}&endDate=${endDate}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json();
}
