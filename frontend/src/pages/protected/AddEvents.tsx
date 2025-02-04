import AddEvent from "../../components/AddEvent"
import Navbar from "../../components/Navbar"

const AddEvents = () => {
  return (
    <div>
        <Navbar />
        <div className="bg-gray-50">
          <AddEvent />
        </div>
    </div>
  )
}

export default AddEvents