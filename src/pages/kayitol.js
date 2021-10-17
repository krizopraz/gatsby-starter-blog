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
        onSubmitCapture={event => {
          event.preventDefault()
          kayit()
        }}
      >
        <label htmlFor="ad">Ad</label>
        <input
          onChange={event => {
            let newfields = Object.create(fields)
            newfields[event.target.id] = event.target.value
            setFields(newfields)
            newfields = null
          }}
          value={fields.ad}
          type="text"
          name="ad"
          id="ad"
        />
        <label htmlFor="soyisim">Soyad</label>
        <input
          onChange={event => {
            let newfields = Object.create(fields)
            newfields[event.target.id] = event.target.value
            setFields(newfields)
            newfields = null
          }}
          value={fields.soyad}
          type="text"
          name="soyad"
          id="soyad"
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={event => {
            let newfields = Object.create(fields)
            newfields[event.target.id] = event.target.value
            setFields(newfields)
            newfields = null
          }}
          value={fields.email}
          type="email"
          name="email"
          id="email"
        />
        <label htmlFor="sifre">Şifre</label>
        <input
          onChange={event => {
            let newfields = Object.create(fields)
            newfields[event.target.id] = event.target.value
            setFields(newfields)
            newfields = null
          }}
          value={fields.sifre}
          type="password"
          name="sifre"
          id="sifre"
        />
        <label htmlFor="ikinicisifre">Tekrar Şifrenizi giriniz</label>
        <input
          onChange={event => {
            let newfields = Object.create(fields)
            newfields[event.target.id] = event.target.value
            setFields(newfields)
            newfields = null
          }}
          value={fields.ikincisifre}
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
