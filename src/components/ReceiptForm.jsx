import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ReceiptForm() {
  const [expenditureType, setExpenditureType] = useState("");
  const [amount, setAmount] = useState("");
  const [attachments, setAttachments] = useState([]);
  // const [currentDate, setCurrentDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(getDefaultDate());
  const [selectedGST, setSelectedGST] = useState("null");
  const [otherExpenditure, setOtherExpenditure] = useState("");
  const [legalName,setLegalName]=useState("");
  const MAX_ATTACHMENT_SIZE_MB = 10;
  // const [attachmentWarning, setAttachmentWarning] = useState(false);

  // useEffect(() => {
  //   const today = new Date();
  //   const options = { day: "numeric", month: "short", year: "numeric" };
  //   const formattedDate = today.toLocaleDateString("en-US", options);
  //   setCurrentDate(formattedDate);
  // }, []);

  useEffect(()=>{
    const profileData=JSON.parse(localStorage.getItem("profileData"));
    // console.log(profileData.defaultWorkspace.legalName);
    setLegalName(profileData.defaultWorkspace.legalName)
  },[])

  function getDefaultDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, "0");
    let day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleExpenditureTypeChange = (e) => {
    setExpenditureType(e.target.value);
    if (e.target.value !== "Others") {
      setOtherExpenditure("");
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    const files = e.target.files;
    setAttachments([...attachments, ...files]);
  };

  const handleGSTChange = (e) => {
    setSelectedGST(e.target.value);
  };

  const handleAttachmentClick = (file) => {
    // Check if the file is a PDF
    if (file.type === "application/pdf") {
      // Open PDF file in a new tab
      window.open(URL.createObjectURL(file));
    } else {
      // For other file types, you can implement different behavior
      // For example, you can download the file or open it in a new tab
      // depending on the file type.
      // Here, we'll open non-PDF files in a new tab as well.
      window.open(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (expenditureType === "Others" && !otherExpenditure.trim()) {
        // Show a warning
        toast.error("Please describe the expenditure type.");
        return; // Prevent form submission
      }

      // Checking if attachment is not selected
      if (attachments.length === 0) {
        const confirmSubmission = window.confirm(
          "You have not selected any attachment. Are you sure you want to submit the form?"
        );
        if (confirmSubmission) {
          submitForm();
        }
      } else {
        // Check total attachment size
        const totalSizeInBytes = attachments.reduce(
          (total, file) => total + file.size,
          0
        );
        const totalSizeInMB = totalSizeInBytes / (1024 * 1024); // Convert bytes to MB
        if (totalSizeInMB > MAX_ATTACHMENT_SIZE_MB) {
          toast.error(
            `Total attachment size exceeds ${MAX_ATTACHMENT_SIZE_MB} MB limit.`
          );
          return; // Prevent form submission
        }
        submitForm();
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const submitForm = async () => {
    try {
      const formData = new FormData();
      formData.append("expenditureType", expenditureType);
      formData.append("amount", amount);
      formData.append("selectedDate", selectedDate); // Append selected date
      formData.append("selectedGST", selectedGST); // Append selected GST
      attachments.forEach((file) => formData.append("attachment", file));
      // const res = await axios.post("https://receipt.setside.app/request", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // console.log("response of mail", res);
      setExpenditureType("");
      setAmount("");
      setAttachments([]);
      setOtherExpenditure("");
      setSelectedGST("non-GST");
      toast.success(" Expense form submitted");
      document.getElementById("attachment").value = "";
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleRemoveAttachment = (indexToRemove) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, index) => index !== indexToRemove)
    );
  };

  // const submitForm = async () => {
  //   const formData = new FormData();
  //   formData.append("expenditureType", expenditureType);
  //   formData.append("amount", amount);
  //   attachments.forEach((file) => formData.append("attachments", file));
  //   setExpenditureType("");
  //   setAmount("");
  //   setAttachments([]);
  //   setOtherExpenditure("");
  //   setSelectedGST("non-GST");
  //   toast.success("form submitted");
  //   document.getElementById("attachment").value = "";
  //   // Submit the form
  //   // const res = await axios.post("http://localhost:3000/request", formData, {
  //   //   headers: {
  //   //     "Content-Type": "multipart/form-data",
  //   //   },
  //   // });
  //   // console.log("response of mail", res);
  // };

  return (
    <div className=" sm:min-h-screen sm:flex sm:justify-center sm:items-center bg-gray-100 px-4 py-8 sm:px-0 sm:flex-col ">
    <h1 className="text-center text-[#2067b3] text-3xl font-semibold p-2 sm:mb-2">Welcome {legalName?legalName:"" }</h1>
      <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
      {/* <h1 className="text-center text-[#2067b3] text-3xl font-semibold p-2">Welcome {legalName?legalName:"" }</h1> */}
        <h2 className="text-xl font-bold text-center mb-4">Expense Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="selectedDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Expense Date <span className="text-red-500 text-lg font-bold"> * </span>:
            </label>
            <input
              type="date"
              id="selectedDate"
              value={selectedDate}
              max={getDefaultDate()}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Amount<span className="text-red-500 text-lg font-bold"> * </span>:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="expenditureType"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Expenditure Type
              <span className="text-red-500 text-lg font-bold"> * </span>:
            </label>
            <select
              id="expenditureType"
              value={expenditureType}
              onChange={handleExpenditureTypeChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Expenditure Type</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Fuel">Fuel</option>
              <option value="Hotel">Hotel</option>
              <option value="Freight">Freight</option>
              <option value="Printing">Printing</option>
              <option value="Stationary">Stationary</option>
              <option value="Item Purchase">Item Purchase</option>
              <option value="Others">Others</option>
            </select>

            {expenditureType === "Others" && (
              <input
                type="text"
                value={otherExpenditure}
                onChange={(e) => setOtherExpenditure(e.target.value)}
                placeholder="Describe Expenditure Type"
                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              GST:
            </label>
            <div className="flex">
              <label htmlFor="gst" className="mr-4 flex items-center">
                <input
                  type="radio"
                  id="gst"
                  name="gst"
                  value="GST"
                  checked={selectedGST === "GST"}
                  onChange={handleGSTChange}
                  className="mr-1"
                />
                <span className="text-sm">GST</span>
              </label>
              <label htmlFor="non-gst" className="flex items-center">
                <input
                  type="radio"
                  id="non-gst"
                  name="gst"
                  value="non-GST"
                  checked={selectedGST === "non-GST"}
                  onChange={handleGSTChange}
                  className="mr-1"
                />
                <span className="text-sm">Non-GST</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="attachment"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Attachments:
            </label>
            <input
              type="file"
              id="attachment"
              accept="image/*,.pdf"
              onChange={handleAttachmentChange}
              multiple
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {attachments.map((file, index) => (
        <li key={index} className="flex  items-center">
          <button
            onClick={() => handleAttachmentClick(file)}
            className="text-blue-500 hover:underline focus:outline-none m-1"
          >
            {file.name}
          </button>
          <button
            onClick={() => handleRemoveAttachment(index)}
            className="text-red-500 hover:text-red-700 focus:outline-none ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReceiptForm;
// bg-gray-100 px-4 py-8
