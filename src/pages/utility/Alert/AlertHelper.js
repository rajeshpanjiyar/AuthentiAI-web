

export const setAlertUtility = (displayAlert, setDisplayAlert) => {
 
   displayAlert(true)
   setTimeout(()=>{
     setDisplayAlert(false)
   },1500)


}