import { Link } from "react-router-dom";

function breadcrumbBar(breadcrumbData) {
    return (
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            {breadcrumbData.map((crumb, index) => (
              <li key={index} className="breadcrumb-item">
                <Link to={crumb.url}>
                  {crumb.name}
                </Link>
                {index < breadcrumbData.length - 1 && " > "}
              </li>
            ))}
          </ul>
        </nav>
      );
}


export default breadcrumbBar;