import './style.css'

export default function Footer() {
  const date = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>Paulo JR &copy;{date}</p>
    </footer>
  )
}