import { ReactNode } from "react";
import classes from "./error-alert.module.css";

type Props = {
  children: ReactNode;
};

function ErrorAlert(props: Props) {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
