import React from "react"
import client from '../db/supabase.js'

const Girisyap = () => {
  const [fields, setFields] = React.useState({})
  console.log(fields)
  function handleinput(event){
    let newfields = Object.create(fields)
    newfields[event.target.name]=event.target.value
    setFields(newfields)
    newfields = null
  }
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const giris = async () =>{
            const {user,error} = await client.auth.signIn({
              email:fields.email,
              password:fields.password,
            },{redirectTo:'localhost:8000'})
          if(error)console.error(error)
          console.log(user)
          }
          giris()
        }}
      >
        <label htmlFor="email">Email</label>
        <input onSubmitCapture={(event)=> handleinput(event)} type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input onSubmitCapture={(event)=> handleinput(event)} type="password" name="password" id="password" />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  )
}

export default Girisyap
