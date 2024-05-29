import "./style.css"
import { useAppSelector } from "../../app/hooks"


export default function ProfilePage() {
  const userData = useAppSelector((state) => state.userSlice)

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
        </div>
      </div>
    </main>
  )
}