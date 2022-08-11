import React from 'react'
import { useTranslation } from 'react-i18next';


function Profile() {

    const { t, i18next } = useTranslation();

  function handleClick(lang) {
    i18next.changeLanguage(lang)
  }

    return (
        <div className='container'>
            <div class="card" style={{ width: "460px", height: "450px" }}>
                <img style={{ height: "200px" }} src="https://source.unsplash.com/400x400/?people" className="card-img-top" alt="..." />
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Email</li>
                    <li class="list-group-item">Name</li>
                </ul>
                <div class="card-body">
                    <h5 class="card-title">Bio</h5>
                    <p class="card-text"> {t('welcome_message')} {t("dummy_data")}</p>
                </div>
            </div>
            <div className='d-flex justify-content-center py-5'>
            <button onClick={()=>handleClick("fr")} type="submit" className="btn btn-primary">Translate French</button>
            </div>
        </div>
    )
}

export default Profile