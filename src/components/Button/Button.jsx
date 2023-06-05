import Proptypes from "prop-types";
import styles from "./Button.module.scss";

export const Button = ({
  className,
  style,
  id,
  name,
  type,
  onClick,
  sameDimensionSize,
  children,
  showBorder,
  testId,
}) => {
  return (
    <button
      id={id}
      name={name}
      type={type}
      className={`${styles.button} ${className}`}
      data-testid={testId}
      style={{
        ...style,
        "--btnSize": sameDimensionSize,
        borderWidth: showBorder ? "1px" : "0",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: Proptypes.string,
  style: Proptypes.object,
  id: Proptypes.string,
  name: Proptypes.string,
  type: Proptypes.oneOf(["submit", "button", "reset"]).isRequired,
  onClick: Proptypes.func,
  sameDimensionSize: Proptypes.string,
  children: Proptypes.node.isRequired,
  showBorder: Proptypes.bool,
  testId: Proptypes.string,
};
