import { Link } from 'gatsby'
import React from 'react'

function mainLayout({children}) {
    return (
        <>
        <header>
            <nav>
            <ul>
                <li>
                    <Link to='/'>Anasayfa</Link>
                </li>
                <li>
                    <Link to='/etkinlikler'>Etkinliklerimiz</Link>
                </li>
                <li>
                    <Link to='/blog'>Blog</Link>
                </li>
                <li>
                    <Link to='/komiteler'>Komitelerimiz</Link>
                </li>
                <li>
                    <Link to='/iletisim'>İletişim / Biz Kimiz</Link>
                </li>
            </ul>
            <div>
                <Link to="girisyap">Giriş Yap</Link>
                <Link to="kayitol">Kayıt Ol</Link>
            </div>
            </nav>
        </header>
        <main>
            {children}
        </main>
        <footer>
            This is now my footer 
        </footer>
        </>
    )
}

export default mainLayout
