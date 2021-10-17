import React from "react"
import client from '../db/supabase.js'

const girisyap = () => {
  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault()
          const {user,error} = client.auth.signIn({
            email:document.forms[0].email,
            password:document.forms[0].password || undefined
          })
          console.log(error)
          console.log(user)
          console.log('working')
        }}
      >
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  )
}

export default girisyap
