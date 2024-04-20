  // import { FaBell } from "react-icons/fa";
  // import { useAuth } from "../context/auth";
  import { Outlet, useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  import { getProfile, postCurrentWorkspace } from "../services/api";
  // import { CgProfile } from "react-icons/cg";
  // import Swal from "sweetalert2";
  import { IoHomeOutline } from "react-icons/io5";

  // profileData

  export default function Navbar() {
    //   const { setIsLogin } = useAuth();
    const [workspaces, setWorkspaces] = useState([]);
    const navigate = useNavigate();
    //   const {setRole}=useAuth()
    const [selectedWorkspace, setSelectedWorkspace] = useState("");

    useEffect(() => {
      // Retrieve workspaces from local storage
      const storedWorkspaces = JSON.parse(localStorage.getItem("profileData"));
      if (storedWorkspaces && storedWorkspaces.workspaces) {
        // If data exists, set the workspaces state
        setWorkspaces([...storedWorkspaces.workspaces]);
        const selectedWorkspaceId = localStorage.getItem("selectedWorkspaceId");
        setSelectedWorkspace(selectedWorkspaceId);
      } else {
        // If data doesn't exist, initialize workspaces with an empty array
        setWorkspaces([]);
      }

      // Fetch profile data asynchronously
      const fetchData = async () => {
        try {
          const data = await getProfile();

          console.log("dataaaa", data);
          const { defaultWorkspace, employeeId, employeeRef, workspaces } =
            data.data.attributeSet;
          const profileData = {
            defaultWorkspace,
            employeeId,
            employeeRef,
            workspaces,
          };
          // setRole(data.data.attributeSet.role)
          // Update local storage with the new profile data
          localStorage.setItem("profileData", JSON.stringify(profileData));
          const storedWorkspaces = JSON.parse(
            localStorage.getItem("profileData")
          );
          setSelectedWorkspace(storedWorkspaces.defaultWorkspace._id);
          // Update the workspaces state with the fetched data
          setWorkspaces([...workspaces]);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };

      fetchData(); // Call the fetchData function
    }, []);

    const handleWorkspaceChange = async (e) => {
      const selectedWorkspaceId = e.target.value;

      // const res=await postCurrentWorkspace(selectedWorkspaceId);
      try {
        // Set the default workspace
        const defaultWorkspaceId = await postCurrentWorkspace(
          selectedWorkspaceId
        );
        // Get the updated profile data with the default workspace ID
        // const profileData = await getProfile();
        // Update the local storage with the new profile data
        // localStorage.setItem("profileData", JSON.stringify(profileData));
        localStorage.setItem("current", defaultWorkspaceId);
        localStorage.setItem("selectedWorkspaceId", selectedWorkspaceId); // Store selected workspace ID
        setSelectedWorkspace(selectedWorkspaceId);
        // Reload the page to reflect the changes
        window.location.reload();
      } catch (error) {
        console.error("Error setting default workspace:", error);
      }

      // console.log("Selected Workspace ID:", selectedWorkspaceId);
    };
    return (
      <>
        <div className="bg-white border-b shadow-sm p-3">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <IoHomeOutline
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/nav/receipt-home-page")}
            />
            <div className="flex items-center gap-4">
              <select
                className="rounded-md focus:outline-none text-blue-500 bg-white"
                onChange={handleWorkspaceChange}
                value={selectedWorkspace}
              >
                {workspaces.length &&
                  workspaces.map((workspace) => (
                    <option key={workspace._id} value={workspace._id}>
                      {workspace.name}
                    </option>
                  ))}
              </select>
              {/* You can add more icons/buttons here */}
            </div>
          </div>
        </div>
        <Outlet/>
      </>
    );
  }
