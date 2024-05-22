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

export default function CommentForm({updateComments, comments, month, date}: Props) {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      updateComments((oldComments: string[]) => [...oldComments, message])
      setMessage('');
      queryClient.invalidateQueries({queryKey: ['month', month]})
    }
  })

  const onCreateComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({comments: [...comments, message], month, date})
  }
  return (
    <form onSubmit={onCreateComment} className="flex flex-col gap-4 w-80 max-w-screen-lg sm:w-96">
      <Textarea
        data-test="comment-input"
        name="comment"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border-2 h-24 p-4"
        placeholder="Message"
        minLength={4}
        autoFocus={false}
      />
      <Button data-test="submit-button" type="submit" color="black" size="lg" className="bg-gray-900 text-white font-medium w-32 mt-6 h-12">
        Add comment
      </Button>
      <p data-test="success-message">{mutation.isSuccess ? (
        "The comment was successfully added."
      ) : null}</p>
      <p data-test="success-message">{mutation.isError ? (
        `An error occurred: ${mutation.error.message}`
      ) : null}</p>
    </form>
  )
}



