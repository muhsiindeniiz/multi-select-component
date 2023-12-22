import { useNavigate } from "react-router-dom";
import { ErrorElementProps } from "./error-element.type";

const ErrorElement = ({
  title,
  description,
  showNavigateBack = false,
}: ErrorElementProps) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column-reverse",
        maxWidth: "container.lg",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <h1 style={{ fontSize: "2.5rem" }}>{title}</h1>
        <p
          style={{
            fontSize: "1.25rem",
            textAlign: "center",
            fontWeight: "medium",
            lineHeight: "shorter",
          }}
        >
          {description}
        </p>
        <p
          style={{
            textAlign: "center",
            color: "grey",
          }}
        >
          If you think this is a bug, please report it to your administrator
        </p>
        {showNavigateBack && (
          <button style={{ colorScheme: "black" }} onClick={() => navigate(-1)}>
            /--
            Navigate back
          </button>
        )}
      </div>

      <img
        src="/path/to/your/error-image.jpg"
        alt="Error"
        style={{ maxWidth: "320px" }}
      />
    </div>
  );
};

export default ErrorElement;
