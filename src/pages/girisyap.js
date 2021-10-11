import React from 'react'

const girisyap = () => {
    return (
        <div>
            <form onSubmitCapture={(event)=>{event.preventDefault();}} >
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
