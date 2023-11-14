import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header.js";

export default function ArticleView() {
  const [data,setData] = useState()
  const { name = "" } = useParams();
  
  useEffect(()=>
  {
    fetch(`http://localhost:3002/api/articles/?name=${name}`)
      .then((res) => res.json()
      .then(data => setData(data)))
      .catch((error) =>{
        console.error("error fetching data");
      })

  },[name])

  console.log("ID: ",name);
  //console.log(data);
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="position-absolute w-100 pb-2" style={{ top: 100 }}>
        <h3>
          This is a page for Article View:{" "}
          <span className="fst-italic">{name.length != 0 ? name : ""}</span>
        </h3>
      </div>
    </>
  );
}
