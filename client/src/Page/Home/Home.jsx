import React, { useEffect, useState } from "react";
import axios from "axios";
import ImgShow from "../../Components/Image/ImgShow";
import ImgInput from "../../Components/Image/ImgInput";
import Loader from "../../Components/Loader";
import Input from "../../Components/Input/Input";

export default function Home() {
  const [isLoadding, setIsLoadding] = useState(false);
  const [multipleData, setMultipleData] = useState([]);

  let [formData, setFormData] = useState({
    username: "",
    repo: "",
    server_link: "",
    client_link: "",
    live_link: "",
    image: "",
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
    repo_name,
    repo_description,
    repo_language,
  } = formData;

  async function getRepoData() {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${username}/${repo}`
      );
      setFormData((prevState) => ({
        ...prevState,
        repo_name: response.data.name,
        repo_description: response.data.description,
        repo_language: response.data.language,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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

  const onSubmit = (e) => {
    e.preventDefault();
    getRepoData();
    // Append the current formData to the existing multipleData array
    setMultipleData((prevMultipleData) => [...prevMultipleData, formData]);
  };

  console.log(multipleData);

  const inputFields = [
    { name: "repo", label: "Repo" },
    { name: "server_link", label: "Server link (optional)" },
    { name: "client_link", label: "Client link (optional)" },
    { name: "live_link", label: "Live link (optional)" },
  ];

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
                className="block w-[30rem] bg-zinc-800 focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3  appearance-none leading-normal focus:border-blue-400"
                value={username}
                onChange={onChange}
              />
              <label className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out bg-zinc-800 px-2 text-grey-darker">
                Github userName
              </label>
            </div>
            <div className="flex gap-8">
              <div className="bg-zinc-800 w-[15rem] h-[17rem] rounded-md flex items-center justify-center border border-gray-300 p-3">
                <div id={"image"} className="bg-zinc-700 w-full h-full rounded-lg">
                  {image ? (
                    <ImgShow id={"image"} imgURL={image} deletImage={deletImage} />
                  ) : (
                    <ImgInput id={"image"} uploadImage={uploadImage} />
                  )}
                  <div className="flex items-center justify-center mt-12 text-5xl">
                    {isLoadding && <Loader />}
                  </div>
                </div>
              </div>

              <div className="-mt-3">
                {inputFields.map((field) => (
                  <Input key={field.name} name={field.name} onChange={onChange} value={field.label} />
                ))}
              </div>
            </div>

            <div className="mt-3">
              <div className="w-20 h-24 bg-zinc-800 border rounded-md flex items-center justify-center text-6xl">
                <p className="-mt-3 text-gray-400 hover:scale-150 duration-200 transition ease-linear">+</p>
              </div>
            </div>
            <div className="w-full mt-3">
              <button type="submit" className="py-2 px-14 bg-gray-300 text-2xl rounded-xl text-gray-700 hover:text-gray-800 hover:bg-gray-500 transition duration-200 ease-in-out">Generate</button>
            </div>
            <ul>
      {multipleData.map((data, index) => (
        <li key={index}>
          <strong>User:</strong> {data.username}, <strong>Repo:</strong> {data.repo}
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
