// import { onAuthStateChanged } from "firebase/auth";
// import { collection, getDocs, where } from "firebase/firestore";
// import { auth, db } from "./config-firebase";
// import { login } from "./redux/stateSlice/userSlice";

// export let loginlogic = (currentUser) => {
//     if (currentUser !== null && currentUser !== undefined) {
//         getDocs(collection(db, "user"), where("uid", "==", currentUser.uid))
//         .then(querySnapshot => {
//           querySnapshot.forEach((doc) => {
//             const data = doc.data();
//             const preference = data.preference;
//             const birthday = data.birthday.toString();
//             const user = {
//               id: doc.id,
//               email: currentUser.email,
//               username: data.username,
//               imageUrl: data.imageUrl,
//               sex: data.sex,
//               birthday: birthday,
//               preference: preference
//             };
//             return user;
//           });
//         })
//         .catch(error => console.log(error));
//     }
    
// };