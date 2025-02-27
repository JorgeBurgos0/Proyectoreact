
import './Logo.css'

function Logo({ href, src, className="logo", alt="logo" }) {
    return(
       /* <div>
            <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        </div> */
        <a href={href} target='_blank'>
            <img src={src} className={className} alt={alt}></img>
        </a>
    )
}

export default Logo;