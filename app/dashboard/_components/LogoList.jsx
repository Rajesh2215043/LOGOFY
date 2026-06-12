// "use client";

// import React, { useEffect } from "react";
// import { UserDetailsContext } from "@/app/_context/UserDetailsContext";
// import { useContext } from "react";
// import { db } from "@/configs/FirebaseConfig";
// import { collection, getDocs } from "firebase/firestore";
// import Image from "next/image";
// import { useState } from "react";
// import Link from "next/link";

// function LogoList() {
//   const { userDetails } = useContext(UserDetailsContext);
//   const [logoList, setLogoList] = useState([]);

//   useEffect(() => {
//     userDetails && GetUserLogos();
//   }, [userDetails]);

//   const GetUserLogos = async () => {
//     const querySnapshot = await getDocs(
//       collection(db, "users", userDetails?.email, "logos")
//     );
//     setLogoList([]);
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data());
//       setLogoList((prev) => [...prev, doc.data()]);
//     });
//   };
//   return (
//     <div>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
//         {logoList.length > 0
//           ? logoList.map((logo, index) => (
//               <div
//                 key={index}
//                 className="hover:scale-105 transition-all duration-300 cursor-pointer"
//               >
//                 <Image
//                   src={logo.image}
//                   alt="logo"
//                   width={400}
//                   height={200}
//                   className="rounded-xl"
//                 ></Image>
//                 <h2 className="text-2xl text-center mt-10 mb-5">
//                   {logo.title}
//                 </h2>
//                 <div className="flex justify-center mb-5">
//                   <button
//                     onClick={() => {
//                       const link = document.createElement("a");
//                       link.href = logo.image;
//                       link.download = `${logo.title || "logo"}.png`;
//                       document.body.appendChild(link);
//                       link.click();
//                       document.body.removeChild(link);
//                     }}
//                     className="bg-primary hover:bg-black text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
//                   >
//                     Download Logo
//                   </button>
//                 </div>
//               </div>
//             ))
//           : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-slate-100 animate-pulse rounded-xl w-full h-[200px]"
//               ></div>
//             ))}
//       </div>
//     </div>
//   );
// }

// export default LogoList;
"use client";

import React, { useEffect } from "react";
import { UserDetailsContext } from "@/app/_context/UserDetailsContext";
import { useContext } from "react";
import { db } from "@/configs/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

function LogoList() {
  const { userDetails } = useContext(UserDetailsContext);
  const [logoList, setLogoList] = useState([]);

  useEffect(() => {
    userDetails && GetUserLogos();
  }, [userDetails]);

  const GetUserLogos = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", userDetails?.email, "logos")
      );

      // Fetch all documents and store them in an array
      const logos = [];
      querySnapshot.forEach((doc) => {
        logos.push(doc.data());
      });

      // Reverse the array to display logos in last-to-first order
      setLogoList(logos.reverse());
    } catch (error) {
      console.error("Error fetching logos:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
        {logoList.length > 0
          ? logoList.map((logo, index) => (
              <div
                key={index}
                className="hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={logo.image}
                  alt="logo"
                  width={400}
                  height={200}
                  className="rounded-xl"
                ></Image>
                <h2 className="text-2xl text-center mt-10 mb-5">
                  {logo.title}
                </h2>
                <div className="flex justify-center mb-5">
                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = logo.image;
                      link.download = `${logo.title || "logo"}.png`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="bg-primary hover:bg-black text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    Download Logo
                  </button>
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <div
                key={index}
                className="bg-slate-100 animate-pulse rounded-xl w-full h-[200px]"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default LogoList;
