interface Props {
  comments: string[];
  month: string;
  date: string
}

export async function createComment({comments, month, date}: Props) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calendar/${month}`, {method: 'POST', body: JSON.stringify({comments, date}), headers: {"Content-Type": "application/json"}, })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error)
  }
}
