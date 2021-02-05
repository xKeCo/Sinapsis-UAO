// import React, {
//   useEffect,
//   // useState,
//   useContext,
// } from "react";
// import NavegationBar from "../components/NavegationBar";
// import { database } from "../firebase/client";
// import { AuthContext } from "../components/Auth";
// import Loader from "../components/LoaderBottom";

// function EtapaInfo() {
//   // const [emprendimientos, setEmprendimientos] = useState([]);
//   // const { userData } = useContext(AuthContext);
//   // const [Loading, setLoading] = useState(true);
//   // const [Errors, setErrors] = useState(null);

//   useEffect(() => {
//     document.title = "Sinapsis UAO - Info. Etapa";

//     // getDataEmprendimiento();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // const getDataEmprendimiento = async () => {
//   //   try {
//   //     const res = await database
//   //       .collection("emprendimientos")
//   //       .where("uID", "==", userData.uID)
//   //       .where("estado", "==", "activo")
//   //       .get();
//   //     const docs = [];
//   //     res.forEach((doc) => {
//   //       docs.push({ ...doc.data(), id: doc.id });
//   //     });

//   //     setEmprendimientos(docs[0]);
//   //   } catch (error) {}
//   // };

//   return (
//     <>
//       <NavegationBar />
//       {/* {Loading ? ( */}
//       <div>
//         <Loader />
//       </div>
//       ) : (
//       <>
//         {/* {Errors ? ( */}
//         <h3>Ocurri&oacute; un error.</h3>) : (
//         <>
//           {/* {novedades.map((novedad) => {
//                 return (
//                   <div className="Novedades_container" key={novedad.id}>
//                     <Link
//                       to={`/actividad/${novedad.id}`}
//                       className="text-decoration-none text-dark"
//                     >
//                       <Tooltip title="Ver" arrow TransitionComponent={Zoom} placement="right">
//                         <div className="Novedades-details_container">
//                           <div className="Novedades-details_containerr">
//                             <Avatar
//                               src={novedad.userAvatar}
//                               alt={"Avatar"}
//                               className="Novedades-Avatar_container"
//                             />
//                             <div className="Novedades-details">
//                               <span className="novedades-name">{novedad.userUsername}</span> ha
//                               entregado la actividad:{" "}
//                               <span className="novedades-otherTex">"{novedad.nomActividad}"</span>
//                             </div>
//                           </div>
//                         </div>
//                       </Tooltip>
//                     </Link>
//                   </div>
//                 );
//               })} */}
//         </>
//         )}
//       </>
//       )}
//     </>
//   );
// }

// export default EtapaInfo;
