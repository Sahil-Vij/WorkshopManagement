import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";



function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  
  return (
    <div style={{marginTop:"150px",textAlign:'center'}}>
    <div className="sweet-loading text-center">
      <HashLoader
        color="#000"
        loading={loading}
        css=''
        size={120}
       
      />
    </div>
    </div>
  );
}

export default Loader;