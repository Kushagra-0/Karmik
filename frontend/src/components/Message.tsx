import { format, parseISO } from 'date-fns'

const Message = ({message, own} : any) => {
    console.log(message)
  return (
    <>
        <div
            className={`p-4 rounded-xl w-max max-w-xs break-words ${own ? "ml-auto bg-orange-100 text-black" : "bg-gray-100"}`}
        >
            {message.text}
            <div className="text-xs text-gray-500 mt-6 flex justify-end">
                {format(parseISO(message.createdAt), "hh:mm a")}
            </div>
        </div>
    </>
  )
}

export default Message