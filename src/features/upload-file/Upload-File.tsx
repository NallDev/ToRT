import { useRef } from "react"

const UploadFile: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type === "text/csv") {
        alert(`File uploaded: ${file.name}`)
      } else {
        alert("Hanya file CSV yang diperbolehkan!")
        e.target.value = ""
      }
    }
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg w-4/5 mx-auto text-center p-12 mt-10">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        onClick={handleButtonClick}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
      >
        Upload
      </button>

      <p className="mt-3 text-gray-500 text-sm">Upload File CSV</p>
    </div>
  )
}

export default UploadFile
