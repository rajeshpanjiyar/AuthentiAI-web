// import { auth, db } from "./firebase";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";

// const usersCollectionReference = collection(db, "users");

// //get users as an array from firebase
// export const getUsers = async () => {
//   const data = await getDocs(usersCollectionReference);
//   const getUserArray = data.docs.map((doc) => {
//     const obj = { ...doc.data(), docId: doc.id };
//     const { userId, userName, clicksAllowed, clicksCount, docId } = obj;
//     return obj;
//   });

//   return getUserArray;
// };

// export const checkIfUserExistsOrNot = async (userId) => {
//   const data = await getDocs(usersCollectionReference);
//   let requiredData = undefined;
//   data.forEach((doc) => {
//     if (doc.data().userId === userId) {
//       requiredData = { ...doc.data(), docId: doc.id };
//     }
//   });

//   if (!requiredData) {
//     return false;
//   } else {
//     return requiredData;
//   }
// };

// export const createUser = async (userId, userName) => {
//   const data = {
//     clicksCount: 0,
//     clicksAllowed: 10,
//     userId: userId,
//     userName: userName,
//     lastRefresh: new Date().toDateString(),
//   };

//   addDoc(usersCollectionReference, data)
//     .then((succ) => {
//       console.log("User Created Successfully", succ);
//       // setUsersData([...usersData, data])
//       return true;
//     })
//     .catch((err) => {
//       console.log("Error in creating user firebase ", err);
//       return false;
//     });
// };

// export const deleteUserData = async (docId) => {
//   const userDoc = doc(db, "users", docId);
//   await deleteDoc(userDoc);
// };

// export const getSpecificUserandIncreaseCount = async (requiredData) => {
//   const userDoc = doc(db, "users", requiredData.docId);
//   await updateDoc(userDoc, { clicksCount: requiredData.clicksCount + 1 });
//   return { status: true, msg: "Increased Count..!!" };
// };

// export const isUserAllowedToClick = async (userId) => {
//   const data = await getDocs(usersCollectionReference);
//   let requiredData = undefined;
//   data.forEach((doc) => {
//     if (doc.data().userId === userId) {
//       requiredData = { ...doc.data(), docId: doc.id };
//     }
//   });

//   if (!requiredData) {
//     return { status: false, msg: "User Not Found", requiredData: requiredData };
//   }

//   if (requiredData.clicksCount >= requiredData.clicksAllowed) {
//     return { status: false, msg: "Limit Reached", requiredData: requiredData };
//   }

//   return {
//     status: true,
//     msg: "User Allowed To Click",
//     requiredData: requiredData,
//   };
// };

// /*
//           checkSignInLimitHandler()

// 1. This function will check if user exists or not then will create user-record if user doesn't exists in firebase.
// 2. Then will check if user limit exhausted or not
// 3. Then will increase the count if limit is not reached

// */
// export const checkClickLimitHandler = async (user) => {
//   //after sign in this function will run
//   getSpecificUserandIncreaseCount(user.uid)
//     .then((data) => {
//       console.log(data);
//       if (data.msg === "Limit Reached") {
//         alert("Limit Reached...!! TRY AFTER 24 hrs");
//         return false;
//       } else if (data.msg === "User not found") {
//         alert("Will gave to create new user record");
//         //create new user
//         const { uid, displayName } = user;
//         createUser(uid, displayName)
//           .then(() => {
//             // alert("Created new user");
//             //increase count
//             getSpecificUserandIncreaseCount(user.uid)
//               .then((data) => {
//                 if (data.status) {
//                   // alert("Count Increased");
//                   return true;
//                 }
//               })
//               .catch((err) => {
//                 console.log(err);
//                 return false;
//               });
//           })
//           .catch((err) => {
//             console.log(err);
//             return false;
//           });
//       } else {
//         // alert("Count updated");
//         return true;
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       return false;
//     });
// };

// export const increaseCountFrequency = async (user) => {
//   const userId = user.uid;
//   console.log(
//     "Request to increase limit for user : ",
//     user.displayName,
//     " ",
//     userId
//   );

//   const allowed = await isUserAllowedToClick(userId);
//   console.log("Allowed to click :: ", allowed);
//   const { status, msg, requiredData } = response;
//   if (status) {
//     const response = await getSpecificUserandIncreaseCount(requiredData);
//     console.log(response);
//     alert("Increased Freq");
//     return true;
//   } else {
//     alert("Limit Reached...!! TRY AFTER 24 hrs");
//     return false;
//   }
// };

// // refresh limit for the user
// export const refreshSignInLimitHandler = async (user) => {
//   const { uid, displayName } = user;
//   const userData = await checkIfUserExistsOrNot(uid);
//   if (userData) console.log("User Already there");
//   if (userData) {
//     console.log(userData);
//     const { userId, userName, clicksAllowed, clicksCount, lastRefresh, docId } =
//       userData;
//     const diff = Math.floor(
//       (new Date() - new Date(lastRefresh)) / (1000 * 60 * 60 * 24)
//     );

//     // if date is not same as last refreshed will have to reset the clicksCount to 0
//     // Refresh after 24 hrs.
//     if (diff > 0) {
//       const userDoc = doc(db, "users", docId);
//       try {
//         await updateDoc(userDoc, {
//           clicksCount: 0,
//           lastRefresh: new Date().toDateString(),
//         });
//       } catch (err) {
//         console.log(err);
//       }

//       // alert("Refreshed Limit..!!");
//     }
//   } else {
//     // alert("No User have to create one");
//     const userCreationStatus = await createUser(uid, displayName);
//     console.log("USer Creation Status : ", userCreationStatus);
//     // if (userCreationStatus) {
//     //   // alert("Created an user");
//     // } else {
//     //   alert("User Creation Failed");
//     // }
//   }
// };

// export const noOfClicksLeft = async (userId) => {
//   const data = await getDocs(usersCollectionReference);
//   let requiredData = undefined;
//   data.forEach((doc) => {
//     if (doc.data().userId === userId) {
//       requiredData = { ...doc.data(), docId: doc.id };
//     }
//   });

//   const clicksLeft = requiredData.clicksAllowed - requiredData.clicksCount;
//   console.log("Clicks Lefft : " ,  clicksLeft);
//   return clicksLeft;
// };
