import React, { useState } from "react"
import client from "../db/supabase"
const Kayitol = () => {
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState({
    ad: "",
    soyad: "",
    email: "",
    sifre: "",
    ikincisifre: "",
  })
  function handleinput(event){
      let newfields = Object.create(fields)
      newfields[event.target.id] = event.target.value
      setFields(newfields)
      newfields = null
  }
  function kayit() {
    if (fields.sifre !== fields.ikincisifre) {
      throw new Error("Birinci ve ikinci şifre bir değil")
    }
    console.log("Sent")
    client.auth
      .signUp(
        {
          email: fields.email,
          password: fields.sifre,
        },
        {
          data: {
            ad: fields.ad,
            soyad: fields.soyad,
          },
        }
      )
      .then(response => console.log(response))
      .catch(err => console.error(err))
    console.log("done")
    return true
  }
  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault()
          kayit()
        }}
      >
        <label htmlFor="ad">Ad</label>
        <input
          onSubmitCapture={event => {
            let newfields = Object.create(fields)
            newfields[event.target.id] = event.target.value
            setFields(newfields)
            newfields = null
          }}
          type="text"
          name="ad"
          id="ad"
        />
        <label htmlFor="soyisim">Soyad</label>
        <input
          onSubmitCapture={event => handleinput(event)}
          type="text"
          name="soyad"
          id="soyad"
        />
        <label htmlFor="email">Email</label>
        <input
          onSubmitCapture={event => {
            handleinput(event)}}
          type="email"
          name="email"
          id="email"
        />
        <label htmlFor="sifre">Şifre</label>
        <input
          onSubmitCapture={event => {
            handleinput(event)}}
          type="password"
          name="sifre"
          id="sifre"
        />
        <label htmlFor="ikinicisifre">Tekrar Şifrenizi giriniz</label>
        <input
          onSubmitCapture={event => {
            handleinput(event)}}
          type="password"
          name="ikinicisifre"
          id="ikincisifre"
        />
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  )
}

export default Kayitol
