import {
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {handler} from "@material-tailwind/react/types/components/dialog";
import Image from "next/image";
import {useState} from "react";
import CommentForm from "./CommentForm";

interface ModalProps {
  open: boolean;
  closeModal: handler;
  mediaType: string;
  imgUrl: string;
  title: string;
  description: string;
  comments: string[];
  month: string;
  date: string;
}

export default function DayModal({open, closeModal, mediaType, imgUrl, title, description, comments, month, date}: ModalProps) {
  const [messages, setMessages] = useState<string[]>(comments);

  return (
    <Dialog
      size="lg"
      animate={{
        mount: {scale: 1, y: 0},
        unmount: {scale: 0.9, y: -100},
      }}
      open={open}
      handler={closeModal}
      className="bg-white flex flex-col h-[70vh] 2xl:max-w-[30vw] 2xl:ml-[35vw] md:h-[60%] w-full md:w-[60%] md:ml-[20%] mt-[15vh] md:mt-[15vh] overflow-auto justify-center items-center"
    >
      <DialogBody className="w-full h-full p-0">
        {
          mediaType === 'image' ?

            <Image
              width={100}
              height={100}
              style={{
                width: '100%',
                height: 'auto',
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
              objectFit="cover"
              className="md:max-h-[35vw]"
              alt={title}
              src={imgUrl}
              priority
            />

            :
            <iframe
              className="w-full h-auto object-cover aspect-video"
              src={imgUrl}
              title={title}
            >
            </iframe>

        }
      </DialogBody>

      <DialogFooter className="flex flex-col justify-center items-center w-full h-auto">
        {
          <div className="m-6 space-y-4">
            <p className="font-bold tracking-wide text-lg">{title}</p>
            <p className="hidden md:flex">{description}</p>
          </div>
        }

        {
          messages.length > 0 ?
            <div className="flex flex-col items-center justify-center p-8 gap-4 text-lg">
              {
                messages.map((comment: string) => <q key={comment}>{comment}</q>)
              }
            </div>
            : null}

        <CommentForm comments={messages} date={date} month={month} updateComments={setMessages} />

      </DialogFooter>
    </Dialog >
  );
}
