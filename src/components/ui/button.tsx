import Link from "next/link";

import classes from "./button.module.css";
import { ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
  link?: any;
  onClick?: any;
};

function Button(props: Props) {
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
