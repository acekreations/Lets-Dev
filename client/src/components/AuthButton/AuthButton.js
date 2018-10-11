import React from "react";

const AuthButton = ({className, children, onClick }) => (
  <button
    onClick={onClick}
    className={className}
  >
    {children}
  </button>
);

export default AuthButton;





