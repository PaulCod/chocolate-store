import "./style.css"
import Cookies from "universal-cookie"
import { useAppDispatch } from "../../app/hooks"
import { clearUser } from "../../app/features/userSlice"
import { useAppSelector } from "../../app/hooks"


export default function ProfilePage() {
  const userData = useAppSelector((state) => state.userSlice)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    const cookie = new Cookies()
    cookie.remove("token")

    dispatch(clearUser())

    window.location.reload()
  }

  return (
    <main className="main">
      <div className="profile-container">
        <div className="profile-data">
          <h2>Seus dados</h2>

          <div className="profile-data-item">
            <label htmlFor="">
              <span>Nome</span>
              <input type="text" value={userData.name} disabled/>
            </label>

            <label htmlFor="">
              <span>Email</span>
              <input type="text" value={userData.email} disabled />
            </label>
          </div>

          <button className="btn-logout" onClick={handleLogout}>logout</button>
        </div>
      </div>
    </main>
  )
}