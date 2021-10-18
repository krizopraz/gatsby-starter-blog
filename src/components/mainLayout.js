import { Link } from "gatsby"
import React from "react"
import client from '../db/supabase'

function Kullanici(){
  let user = client.auth.user()
  client.auth.onAuthStateChange(()=>{},)
  if(client.auth.session() === null ){
    return(
      <div>
            <Link to="girisyap">Giriş Yap</Link>
            <Link to="kayitol">Kayıt Ol</Link>
      </div>
    )
  }
  else{
    return(
      <span>{user.id}</span>
    )
  }
}

function mainLayout({ children }) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Anasayfa</Link>
            </li>
            <li>
              <Link to="/etkinlikler">Etkinliklerimiz</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/komiteler">Komitelerimiz</Link>
            </li>
            <li>
              <Link to="/iletisim">İletişim / Biz Kimiz</Link>
            </li>
          </ul>
            <Kullanici />
        </nav>
      </header>
      <main>{children}</main>
      <footer>This is now my footer</footer>
      <button onClick={()=>{client.auth.signOut()}} >Sign Out</button>
    </>
  )
}

export default mainLayout
