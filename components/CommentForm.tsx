import {Button, Textarea} from "@material-tailwind/react"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {createComment} from "Shared/lib/utils/createComment"
import {Dispatch, FormEvent, SetStateAction, useState} from "react"

interface Props {
  updateComments: Dispatch<SetStateAction<string[]>>;
  comments: string[];
  month: string;
  date: string;
}

export default function CommentForm({updateComments, comments, month, date}: Props)  {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      updateComments((oldComments:string[]) => [...oldComments, message])
      setMessage('');
      queryClient.invalidateQueries({queryKey: ['month', month]})
    }
  })

  const onCreateComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({comments: [...comments, message], month, date})
  }
  return (
    <form onSubmit={onCreateComment} className="mb-2 w-80 max-w-screen-lg sm:w-96">
      <div className="flex flex-col gap-6">
        <Textarea
          name="comment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 h-24 p-4"
          placeholder="Message"
          autoFocus={false}
        />
      </div>
      <Button type="submit" color="black" size="lg" className="bg-gray-900 text-white font-medium w-32 mt-6 h-12">
        Add comment
      </Button>
      {mutation.isError ? (
        <div>An error occurred: {mutation.error.message}</div>
      ) : null}
    </form>
  )
}
