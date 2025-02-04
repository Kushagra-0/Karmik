import ChatComponent from "../../components/ChatComponent"
import Navbar from "../../components/Navbar"

const Chat = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex justify-center">
        <ChatComponent />
      </div>
    </>
  )
}

export default Chat