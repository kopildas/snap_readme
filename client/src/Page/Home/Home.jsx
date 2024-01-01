import React, { useEffect, useState } from "react";
import axios from "axios";
import ImgShow from "../../Components/Image/ImgShow";
import ImgInput from "../../Components/Image/ImgInput";
import Loader from "../../Components/Loader";
import Input from "../../Components/Input/Input";
export default function Home() {
  async function getdata() {
    const respons = await axios.get(
      "https://api.github.com/repos/kopildas/furniture"
    );
    console.log(respons.data.name);
    console.log(respons.data.description);
    console.log(respons.data.language);
    console.log("f");
  }
  console.log("f");

  useEffect(() => {
    getdata();
  }, []);

  const [isLoadding, setIsLoadding] = useState(false);

  let [formData, setFormData] = useState({
    username: "",
    sale: 0,
    price: 0,
    category: "",
    quantity: 1,
    cartORadd: "cart",
    SKU: "",
    short_descrip: "",
    full_descrip: "",
  });
  const {
    username,
    sale,
    price,
    category,
    images,
    quantity,
    SKU,
    short_descrip,
    full_descrip,
    gal_1_imgURL,
    gal_2_imgURL,
    gal_3_imgURL,
    image,
  } = formData;

  function onChange(e) {
    if (!e.target.files) {
      console.log("yooh");
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  }
  console.log(formData);

  const onSubmit = () => {};

  return (
    <div className="h-screen flex items-center justify-center  bg-zinc-800">
      <form onSubmit={onSubmit}>
        <div className="flex">
          <div className="flex flex-col items-start justify-start">
            {/* <label className="text font-semibold items-start justify-start border-b border-gray-400">
              Github userName
              <input
                type="text"
                className="p-2 w-full border-b border-gray-400 rounded md-5"
                placeholder="user name"
                id="item_name"
                // value={item_name}
                // onChange={onChange}
                required
              />
            </label> */}
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
                <div
                  id={"image"}
                  className="bg-zinc-700 w-full h-full rounded-lg "
                >
                  {image ? (
                    <ImgShow
                      id={"image"}
                      imgURL={image}
                      // deletImage={deletImage}
                    />
                  ) : (
                    <ImgInput id={"image"} />
                  )}
                  <div className="flex items-center justify-center mt-12 text-5xl">
                    {isLoadding && <Loader />}
                  </div>
                </div>
              </div>

              <div className="-mt-3">
                <Input name={username} onChange={onChange} value={"repo"}/>
                
                <Input name={username} onChange={onChange} value={"Server link (optional)"}/>

                <Input name={username} onChange={onChange} value={"Client link (optional)"}/>

                <Input name={username} onChange={onChange} value={"live link (optional)"}/>
              </div>
            </div>

            <div className="mt-3">
                <div className="w-20 h-24 bg-zinc-800 border rounded-md flex items-center justify-center text-6xl"><p className="-mt-3 text-gray-400">+</p></div>
            </div>
            <div className="w-full mt-3">
                    <button type="submit" className="py-2 px-14 bg-gray-300 text-2xl rounded-xl text-gray-700 hover:text-gray-800 hover:bg-gray-500 transition duration-200 ease-in-out">Generate</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
