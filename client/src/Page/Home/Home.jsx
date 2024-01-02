import React, { useEffect, useState } from "react";
import axios from "axios";
import ImgShow from "../../Components/Image/ImgShow";
import ImgInput from "../../Components/Image/ImgInput";
import Loader from "../../Components/Loader";
import Input from "../../Components/Input/Input";
import { toast } from 'react-toastify';

export default function Home() {
  const [isLoadding, setIsLoadding] = useState(false);
  const [multipleData, setMultipleData] = useState([]);

  let [formData, setFormData] = useState({
    username: "",
    repo: "",
    server_link: "",
    client_link: "",
    live_link: "",
    image: null,
    repo_owner: "",
    repo_name: "",
    repo_description: "",
    repo_language: "",
  });
  const {
    username,
    repo,
    server_link,
    client_link,
    live_link,
    image,
    repo_owner,
    repo_name,
    repo_description,
    repo_language,
  } = formData;

  const addMultipledata = ()=> {
    setMultipleData((prevMultipleData) => [...prevMultipleData, formData]);
  }

  async function getRepoData() {
    console.log("fs")
    try {
      let response = await fetch(
        `https://api.github.com/repos/${username}/${repo}`
      );
      response = await response.json()
      console.log(username)
      let owner = await fetch(
        `https://api.github.com/users/${username}`
      );
      owner = await owner.json();
      
      if(owner.message === "Not Found")
      {
        toast.error("User is not found.")
      }
      else if(response.message === "Not Found")
      {
        toast.error("Repository is not found.")
      }
      else
      {
        setFormData((prevState) => ({
          ...prevState,
          repo_owner: response.owner.login,
          repo_name: response.name,
          repo_description: response.description,
          repo_language: response.language,
        }));

      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

 
  

  console.log(formData)
  console.log(multipleData);
  function onChange(e) {
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState, 
        [e.target.id]: e.target.value,
      }));
    }
  }

  async function uploadImage(e) {
    setIsLoadding(true);
    const image = e.target.files[0];

    try {
      const Data = new FormData();
      Data.append("image", image);
      const response = await axios.post(import.meta.env.VITE_IMG, Data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const displayUrl = response.data.data.display_url;

      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: displayUrl,
      }));
    } catch (error) {
      console.log(error);
    }

    setIsLoadding(false);
  }

  function deletImage() {
    setFormData((prevState) => ({
      ...prevState,
      image: null,
    }));
  }
  function deleteFromMultipleData(del_value) {
    console.log(del_value)
    setMultipleData(multipleData.filter((data) => data.image!==del_value))
    
  }
console.log(multipleData)

  const addMoreContent = () => {
    getRepoData();
    // if(username === repo_owner)
    // {
    //   console.log("user is founded..")
    // }
    // else
   
  };

  useEffect(() => {
    // Watch for changes in formData and update multipleData
    if(repo_owner.length > 0 && image) {
      console.log("f")
    addMultipledata();
    setFormData((prevState) => ({
      ...prevState, 
      repo: "",
    server_link: "",
    client_link: "",
    live_link: "",
    image: null,
    repo_owner: "",
    repo_name: "",
    repo_description: "",
    repo_language: "",
    }));
    }
  }, [formData]);

  const onSubmit = (e) => {
    e.preventDefault();
    getRepoData();
    // Append the current formData to the existing multipleData array
  };

  



  return (
    <div className="h-screen flex items-center justify-center  bg-zinc-800">
      <form onSubmit={onSubmit}>
        <div className="flex">
          <div className="flex flex-col items-start justify-start">
            <div className="relative float-label-input">
              <input
                required
                type="text"
                id="username"
                placeholder=" "
                className="block w-[30rem] bg-zinc-800 focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3  appearance-none leading-normal focus:border-blue-400 text-gray-100"
                value={username}
                onChange={onChange}
              />
              <label className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out bg-zinc-800 px-2 text-grey-darker">
                Github userName
              </label>
            </div>
            <div className="flex gap-8">
              <div className="bg-zinc-800 w-[15rem] h-[17rem] rounded-md flex items-center justify-center border border-gray-300 p-3">
                <div
                  id={"image"}
                  className="bg-zinc-700 w-full h-full rounded-lg"
                >
                  {image ? (
                    <ImgShow
                      id={"image"}
                      imgURL={image}
                      deletImage={deletImage}
                    />
                  ) : (
                    <ImgInput id={"image"} uploadImage={uploadImage} />
                  )}
                  <div className="flex items-center justify-center mt-12 text-5xl">
                    {isLoadding && <Loader />}
                  </div>
                </div>
              </div>

              <div className="-mt-3">
              <Input
                    name="repo"
                    onChange={onChange}
                    value={repo}
                    label="repo"
                  />
              <Input
                    name="server_link"
                    onChange={onChange}
                    value={server_link}
                    label="server_link (optional)"
                  />
              <Input
                    name="client_link"
                    onChange={onChange}
                    value={client_link}
                    label="client_link (optional)"
                  />
              <Input
                    name="live_link"
                    onChange={onChange}
                    value={live_link}
                    label="live_link (optional)"
                  />
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              {multipleData.map((data, index) => (
                <div
                  key={index}
                  className="w-20 h-24 bg-zinc-800 border rounded-md flex items-center justify-center text-6xl"
                >
                  <ImgShow
                      id={data.image}
                      imgURL={data.image}
                      deletImage={()=>deleteFromMultipleData(data.image)}
                    />
                </div>
              ))}
              <div className="w-20 h-24 bg-zinc-800 border rounded-md flex items-center justify-center text-6xl" onClick={addMoreContent}>
                <p className="-mt-3 text-gray-400 hover:scale-150 duration-200 transition ease-linear">
                  +
                </p>
              </div>
            </div>
            <div className="w-full mt-3">
              <button
                type="submit"
                className="py-2 px-14 bg-gray-300 text-2xl rounded-xl text-gray-700 hover:text-gray-800 hover:bg-gray-500 transition duration-200 ease-in-out"
              >
                Generate
              </button>
            </div>
            <ul>
              {multipleData.map((data, index) => (
                <li key={index}>
                  <strong>User:</strong> {data.username}, <strong>Repo:</strong>{" "}
                  {data.repo}
                  {/* Add more fields as needed */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}
